import axios from "axios";
import { getAuthHeader } from "../../config/supplierApi.js";

export const addPaymentService = async ({
  refNo,
  transactionType = 0,
  productId = "26",
  clientRefNo = "",
}) => {
  try {
    const payload = {
      AuthHeader: getAuthHeader(),
      ClientRefNo: clientRefNo,
      RefNo: refNo,
      TransactionType: transactionType,
      ProductId: productId,
    };

    console.log("\n=========== ADD PAYMENT REQUEST ===========");
    console.log(JSON.stringify(payload, null, 2));

    const response = await axios.post(
      "http://uat.flyshop.in/TradeHost/TradeAPIService.svc/JSONService/AddPayment",
      payload,
    );
    console.log("\n=========== ADD PAYMENT RESPONSE ===========");
    console.log(JSON.stringify(response.data, null, 2));
    console.log("===========================================\n");

    return response.data;
  } catch (error) {
    console.error("\n=========== ADD PAYMENT ERROR ===========");

    if (error?.response) {
      console.error("Status:", error.response.status);
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error);
    }

    console.error("=========================================\n");

    throw new Error(
      error?.response?.data?.Message ||
        error?.response?.data?.ErrorMessage ||
        "Failed to add payment",
    );
  }
};
