import { createTempBooking }
from "./tempBooking.service.js";

export const tempBooking =
  async (req, res) => {

    try {

      const booking =
        await createTempBooking(
          req.body
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