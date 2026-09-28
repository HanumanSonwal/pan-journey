const applyValue = ({ amount, type, value }) => {
  const numericValue = Number(value || 0);

  if (!numericValue) return amount;

  if (type === "percentage") {
    return amount + (amount * numericValue) / 100;
  }

  if (type === "fixed") {
    return amount + numericValue;
  }

  return amount;
};

export const applyHotelPricing = ({
  hotel,
  markup,
}) => {
  if (!hotel) return hotel;

  const supplierPrice = Number(
    hotel?.pricing?.supplierPrice ??
    hotel?.pricing?.totalAmount ??
    0
  );

  let amount = supplierPrice;

  if (markup) {
    amount = applyValue({
      amount,
      type: markup.markupType,
      value: markup.markupValue,
    });

    if (markup.serviceChargeValue) {
      amount = applyValue({
        amount,
        type: markup.markupType,
        value: markup.serviceChargeValue,
      });
    }
  }

  return {
    ...hotel,
    pricing: {
      ...hotel.pricing,
      totalAmount: Number(amount.toFixed(2)),
    },
  };
};
