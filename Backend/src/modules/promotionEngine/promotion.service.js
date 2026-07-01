import Coupon from "./coupon.model.js";

/*
=========================================
CREATE COUPON (ADMIN)
=========================================
*/

export const createCouponService =
  async (payload) => {
    const coupon =
      await Coupon.create(payload);

    return coupon;
  };


/*
=========================================
AUTO FIND BEST COUPON
=========================================
*/

export const findBestCoupon =
  async ({
    module,
    bookingAmount,
    serviceTax,
  }) => {

    const coupons =
      await Coupon.find({
        applicableModules: {
          $in: [module],
        },
        isAutoApply: true,
        isActive: true,
      });

    let bestCoupon = null;
    let bestDiscount = 0;

    let availableCoupons = [];

    const maxAllowedDiscount =
      serviceTax * 0.7;

    for (const coupon of coupons) {

      // minimum amount validation
      if (
        bookingAmount <
        coupon.minAmount
      ) {
        continue;
      }

      // expiry check
      if (
        coupon.expiresAt &&
        coupon.expiresAt <
          new Date()
      ) {
        continue;
      }

      let discount = 0;

      // flat discount
      if (
        coupon.discountType ===
        "flat"
      ) {
        discount =
          coupon.discountValue;
      }

      // percentage discount
      if (
        coupon.discountType ===
        "percent"
      ) {
        discount =
          (bookingAmount *
            coupon.discountValue) /
          100;
      }

      // max cap = 70% of service tax
      if (
        discount >
        maxAllowedDiscount
      ) {
        discount =
          maxAllowedDiscount;
      }

      // push all available coupons
      availableCoupons.push({
        code: coupon.code,
        title: coupon.title,
        discount,
      });

      // choose best coupon
      if (
        discount >
        bestDiscount
      ) {
        bestDiscount =
          discount;

        bestCoupon = coupon;
      }
    }

    return {
      bestCoupon,
      bestDiscount,
      availableCoupons,
    };
  };


/*
=========================================
MANUAL APPLY COUPON
=========================================
*/

export const applyManualCoupon =
  async ({
    booking,
    couponCode,
    module,
  }) => {

    const coupon =
      await Coupon.findOne({
        code: couponCode,
        isActive: true,
      });

    if (!coupon) {
      throw new Error(
        "Invalid coupon"
      );
    }

    // module check
    if (
      !coupon.applicableModules.includes(
        module
      )
    ) {
      throw new Error(
        "Coupon not valid for this module"
      );
    }

    // expiry check
    if (
      coupon.expiresAt &&
      coupon.expiresAt <
        new Date()
    ) {
      throw new Error(
        "Coupon expired"
      );
    }

    let discount = 0;

    if (
      coupon.discountType ===
      "flat"
    ) {
      discount =
        coupon.discountValue;
    }

    if (
      coupon.discountType ===
      "percent"
    ) {
      discount =
        (booking.pricing
          .finalSellingPrice *
          coupon.discountValue) /
        100;
    }

    const maxAllowedDiscount =
      booking.pricing
        .serviceTaxAmount *
      0.7;

    if (
      discount >
      maxAllowedDiscount
    ) {
      discount =
        maxAllowedDiscount;
    }

    booking.offer = {
      couponCode:
        coupon.code,

      couponDiscount:
        discount,

      autoDiscount:
        discount,
    };

    booking.payableAmount =
      booking.pricing
        .finalSellingPrice -
      discount;

    await booking.save();

    return booking;
  };

  export const getAllCouponsService =
  async () => {
    const coupons =
      await Coupon.find()
        .sort({ createdAt: -1 });

    return coupons;
  };

/*
====================================
GET SINGLE COUPON
====================================
*/
export const getSingleCouponService =
  async (couponId) => {
    const coupon =
      await Coupon.findById(couponId);

    if (!coupon) {
      throw new Error(
        "Coupon not found"
      );
    }

    return coupon;
  };

/*
====================================
UPDATE COUPON
====================================
*/
export const updateCouponAdminService =
  async (couponId, payload) => {
    const coupon =
      await Coupon.findByIdAndUpdate(
        couponId,
        payload,
        { new: true }
      );

    if (!coupon) {
      throw new Error(
        "Coupon not found"
      );
    }

    return coupon;
  };