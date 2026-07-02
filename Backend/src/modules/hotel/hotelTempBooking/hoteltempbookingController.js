
import { hotelTempBookingService ,updateCouponService } from "../hotelTempBooking/hotelCart.service.js";
import {
  sendSuccess,
  sendError,
} from "../../../utils/response/ApiResponse.js";

export const hotelTempBookingController =
  async (req, res) => {
    try {
      console.log("=================================");
      console.log("CONTROLLER START");

      // pricing अलग निकालो
      const pricingData =
        req.body.pricing;

      // supplier + db payload
      const payload = {
        CustomerName:
          req.body.CustomerName,

        CustomerMobile:
          req.body.CustomerMobile,

        CustomerAddress:
          req.body.CustomerAddress,

        CustomerPostalCode:
          req.body.CustomerPostalCode,

        HotelImage:
          req.body.HotelImage,

        HotelKey:
          req.body.HotelKey,

        OccupantDetails:
          req.body.OccupantDetails,

        OccupantEmail:
          req.body.OccupantEmail,

        OccupantMobile:
          req.body.OccupantMobile,

        PANNumber:
          req.body.PANNumber,

        RecommendationID:
          req.body.RecommendationID,

        Remarks:
          req.body.Remarks,

        SearchKey:
          req.body.SearchKey,

        // only for DB
        UserId: req.user._id,
      };

      console.log(
        "CONTROLLER PAYLOAD =>"
      );
      console.log(
        JSON.stringify(
          payload,
          null,
          2
        )
      );

      console.log(
        "PRICING DATA =>"
      );
      console.log(
        JSON.stringify(
          pricingData,
          null,
          2
        )
      );

      const data =
        await hotelTempBookingService(
          payload,
          pricingData
        );

      return sendSuccess(
        res,
        "Hotel temp booking successful",
        data
      );
    } catch (error) {
      console.log(
        "CONTROLLER ERROR =>",
        error.message
      );

      return sendError(
        res,
        error.message
      );
    }
  };

  
export const updateCouponController =
async (req, res) => {
  try {
    const data =
      await updateCouponService(req.body);

    return res.json({
      success: true,
      data
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};