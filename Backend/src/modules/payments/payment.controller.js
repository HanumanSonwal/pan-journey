import { createOrderService ,verifyPaymentService} from "./payment.service.js";

export const createOrderController = async (req, res, next) => {
  try {
    const result = await createOrderService(req.body);

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};



export const verifyPaymentController =
async (req, res, next) => {

    try {

        const result =
        await verifyPaymentService(req.body);

        return res.status(200).json({

            success: true,

            message:
            "Payment verified successfully",

            data: result

        });

    }

    catch (error) {

        next(error);

    }

};