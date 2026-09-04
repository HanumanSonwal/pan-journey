import {
  getHotelDetailsService,
} from "./hotelDetails.service.js";


// ============================================================
// HOTEL DETAILS CONTROLLER
// ============================================================

export const getHotelDetailsController =
  async (req, res) => {

    try {

      const {
        hotelId,
      } = req.body;


      // ------------------------------------------------------
      // VALIDATION
      // ------------------------------------------------------

      if (!hotelId) {
        return res.status(400).json({
          success: false,
          message: "Hotel ID is required",
        });
      }


      // ------------------------------------------------------
      // SERVICE
      // ------------------------------------------------------

      const data =
        await getHotelDetailsService({
          hotelId,
        });


      // ------------------------------------------------------
      // RESPONSE
      // ------------------------------------------------------

      return res.status(200).json({
        success: true,
        message:
          "Hotel details fetched successfully",
        data,
      });

    } catch (error) {

      console.error(
        "Hotel Details Controller Error:",
        error
      );


      return res.status(500).json({
        success: false,
        message:
          error?.message ||
          "Failed to fetch hotel details",
      });
    }
  };