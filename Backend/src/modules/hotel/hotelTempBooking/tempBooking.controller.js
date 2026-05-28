import { createTempBooking }
from "./tempBooking.service.js";

export const tempBooking =
  async (req, res) => {

    try {

      const supplierPayload =
        req.body;

      // INTERNAL PAYLOAD
      const payload = {

        searchKey:
          supplierPayload.SearchKey,

        hotelKey:
          supplierPayload.HotelKey,

        recommendationId:
          supplierPayload.RecommendationID,

        customer: {
          name:
            supplierPayload.CustomerName,

          mobile:
            supplierPayload.CustomerMobile,

          address:
            supplierPayload.CustomerAddress,

          postalCode:
            supplierPayload.CustomerPostalCode,

          email:
            supplierPayload.OccupantEmail,
        },

        occupants:
          supplierPayload.OccupantDetails,

        // ORIGINAL SUPPLIER PAYLOAD
        rawSupplierPayload:
          supplierPayload,
      };

      const booking =
        await createTempBooking(
          payload
        );

      return res.status(200).json({
        success: true,

        message:
          "Temp booking created",

        data: booking,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "Temp booking failed",
      });
    }
  };