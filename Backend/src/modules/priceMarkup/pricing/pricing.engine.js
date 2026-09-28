const toNumber = (value, fallback = 0) => {
  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
};

const roundMoney = (value) => {
  return Math.round((toNumber(value) + Number.EPSILON) * 100) / 100;
};

/**
 * Calculate percentage amount.
 *
 * Example:
 * calculatePercentageAmount(1000, 10)
 * => 100
 */
export const calculatePercentageAmount = (amount, value) => {
  return roundMoney(
    (toNumber(amount) * toNumber(value)) / 100
  );
};

/**
 * Add percentage to amount.
 *
 * Example:
 * calculatePercentage(1000, 10)
 * => 1100
 */
export const calculatePercentage = (amount, value) => {
  const percentageAmount = calculatePercentageAmount(
    amount,
    value
  );

  return roundMoney(
    toNumber(amount) + percentageAmount
  );
};

/**
 * Calculate fixed amount.
 */
export const calculateFixedAmount = (value) => {
  return roundMoney(toNumber(value));
};

/**
 * Add fixed amount to amount.
 *
 * Example:
 * calculateFixed(1000, 100)
 * => 1100
 */
export const calculateFixed = (amount, value) => {
  return roundMoney(
    toNumber(amount) + calculateFixedAmount(value)
  );
};

/**
 * Calculate markup amount.
 *
 * Supported:
 *
 * markupType: "percentage"
 * markupType: "fixed"
 */
export const calculateMarkupAmount = (amount, config) => {
  if (!config) {
    return 0;
  }

  const value = toNumber(config.markupValue);

  if (value <= 0) {
    return 0;
  }

  if (config.markupType === "percentage") {
    return calculatePercentageAmount(amount, value);
  }

  if (config.markupType === "fixed") {
    return calculateFixedAmount(value);
  }

  return 0;
};

/**
 * Calculate service charge amount.
 *
 * Supported:
 *
 * serviceChargeType: "percentage"
 * serviceChargeType: "fixed"
 *
 * If your markup configuration currently uses another
 * field name for service charge, pass that configuration
 * accordingly from the caller.
 */
export const calculateServiceChargeAmount = (
  amount,
  config
) => {
  if (!config) {
    return 0;
  }

  const value = toNumber(
    config.serviceChargeValue ??
      config.serviceFeeValue ??
      config.feeValue
  );

  if (value <= 0) {
    return 0;
  }

  const type =
    config.serviceChargeType ??
    config.serviceFeeType ??
    config.feeType;

  if (type === "percentage") {
    return calculatePercentageAmount(amount, value);
  }

  if (type === "fixed") {
    return calculateFixedAmount(value);
  }

  return 0;
};

/**
 * Calculate tax amount without adding it to the base amount.
 *
 * Supports:
 *
 * percentage
 * fixed
 */
export const calculateTaxAmount = (amount, config) => {
  if (!config) {
    return 0;
  }

  const taxValue = toNumber(config.taxValue);

  if (taxValue <= 0) {
    return 0;
  }

  if (config.taxType === "percentage") {
    return calculatePercentageAmount(
      amount,
      taxValue
    );
  }

  if (config.taxType === "fixed") {
    return calculateFixedAmount(taxValue);
  }

  return 0;
};

/**
 * Existing helper.
 *
 * Applies tax on amount and returns:
 *
 * amount + tax
 */
export const applyTaxRule = (amount, config) => {
  const taxAmount = calculateTaxAmount(
    amount,
    config
  );

  return roundMoney(
    toNumber(amount) + taxAmount
  );
};

/**
 * Resolve slab according to amount.
 *
 * Example:
 *
 * [
 *   {
 *     minAmount: 0,
 *     maxAmount: 7499,
 *     taxType: "percentage",
 *     taxValue: 5
 *   },
 *   {
 *     minAmount: 7500,
 *     maxAmount: 999999,
 *     taxType: "percentage",
 *     taxValue: 10
 *   }
 * ]
 */
export const resolveSlabTax = (
  amount,
  slabs = []
) => {
  const numericAmount = toNumber(amount);

  let matched = null;

  for (const slab of slabs) {
    const minAmount = toNumber(
      slab.minAmount
    );

    const maxAmount =
      slab.maxAmount === undefined ||
      slab.maxAmount === null ||
      slab.maxAmount === ""
        ? Infinity
        : toNumber(slab.maxAmount);

    if (
      numericAmount >= minAmount &&
      numericAmount <= maxAmount
    ) {
      matched = slab;
      break;
    }
  }

  return matched;
};

/**
 * Calculate country tax.
 *
 * Supports:
 *
 * 1. Flat percentage/fixed tax
 * 2. Slab based tax
 */
export const calculateCountryTax = ({
  amount,
  config,
  slabs = [],
}) => {
  const numericAmount = toNumber(amount);

  // -----------------------------------------------------
  // SLAB TAX
  // -----------------------------------------------------

  if (Array.isArray(slabs) && slabs.length > 0) {
    const slab = resolveSlabTax(
      numericAmount,
      slabs
    );

    if (slab) {
      return calculateTaxAmount(
        numericAmount,
        slab
      );
    }
  }

  // -----------------------------------------------------
  // FLAT TAX
  // -----------------------------------------------------

  return calculateTaxAmount(
    numericAmount,
    config
  );
};

/**
 * Apply complete hotel pricing.
 *
 * Pricing flow:
 *
 * Supplier Price
 *      ↓
 * Markup
 *      ↓
 * Service Charge
 *      ↓
 * 5% Currency + Payment Gateway
 *      ↓
 * Country Tax
 *      ↓
 * Final Customer Price
 *
 * IMPORTANT:
 *
 * This function always calculates from the protected
 * supplier values:
 *
 * supplierBasicAmount
 * supplierTax
 * supplierPrice
 *
 * It never uses an already modified basicAmount,
 * tax or totalAmount as the source for recalculation.
 */
export const applyHotelPricing = ({
  pricing = {},
  markup = null,
  countryTax = null,
  countryTaxSlabs = [],
  conversionAndGatewayPercent = 5,
}) => {
  // =====================================================
  // 1. SUPPLIER VALUES
  // =====================================================

  const supplierBasicAmount = roundMoney(
    pricing.supplierBasicAmount ??
      pricing.basicAmount
  );

  const supplierTax = roundMoney(
    pricing.supplierTax ??
      pricing.tax
  );

  const supplierPrice = roundMoney(
    pricing.supplierPrice ??
      supplierBasicAmount + supplierTax
  );

  // =====================================================
  // 2. PLATFORM MARKUP
  // =====================================================

  const markupAmount = calculateMarkupAmount(
    supplierPrice,
    markup
  );

  const amountAfterMarkup = roundMoney(
    supplierPrice + markupAmount
  );

  // =====================================================
  // 3. PLATFORM SERVICE CHARGE
  // =====================================================

  const serviceFeeAmount =
    calculateServiceChargeAmount(
      amountAfterMarkup,
      markup
    );

  const amountAfterServiceCharge = roundMoney(
    amountAfterMarkup + serviceFeeAmount
  );

  // =====================================================
  // 4. CURRENCY CONVERSION + PAYMENT GATEWAY
  // =====================================================

  const conversionAndGatewayAmount =
    calculatePercentageAmount(
      amountAfterServiceCharge,
      conversionAndGatewayPercent
    );

  const amountBeforeCountryTax = roundMoney(
    amountAfterServiceCharge +
      conversionAndGatewayAmount
  );

  // =====================================================
  // 5. COUNTRY TAX
  // =====================================================

  const countryTaxAmount =
    calculateCountryTax({
      amount: amountBeforeCountryTax,
      config: countryTax,
      slabs: countryTaxSlabs,
    });

  // =====================================================
  // 6. FINAL CUSTOMER PRICE
  // =====================================================

  const finalAmount = roundMoney(
    amountBeforeCountryTax +
      countryTaxAmount
  );

  // =====================================================
  // RETURN
  // =====================================================

  return {
    ...pricing,

    // ---------------------------------------------------
    // INTERNAL SUPPLIER VALUES
    // ---------------------------------------------------

    supplierBasicAmount,
    supplierTax,
    supplierPrice,

    // ---------------------------------------------------
    // CUSTOMER FACING VALUES
    // ---------------------------------------------------

    basicAmount: amountBeforeCountryTax,

    tax: roundMoney(countryTaxAmount),

    totalAmount: finalAmount,

    // ---------------------------------------------------
    // CALCULATED COMPONENTS
    // ---------------------------------------------------

    markup: roundMoney(markupAmount),

    serviceFee: roundMoney(
      serviceFeeAmount
    ),

    // Existing GST is preserved.
    gst: roundMoney(
      pricing.gst
    ),

    // ---------------------------------------------------
    // INTERNAL DEBUG / AUDIT VALUE
    // ---------------------------------------------------

    markupLevel:
      markup?.level || null,
  };
};