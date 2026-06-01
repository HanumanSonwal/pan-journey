export const convertHotelPrices = ({
  hotels,
  rate,
  currency,
}) => {

  return hotels.map((hotel) => {

    return {

      ...hotel,

      originalPrice: hotel.price,

      originalTax: hotel.tax,

      price: Number(
        (hotel.price * rate).toFixed(2)
      ),

      tax: Number(
        (hotel.tax * rate).toFixed(2)
      ),

      currency,
    };
  });
};