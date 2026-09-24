// import axios from "axios";
// import { getAuthHeader } from "../../config/supplierApi.js";

// export const addPaymentService = async ({
//   BookingRefNo,
//   transactionType = 0,
//   productId = "26",
//   clientRefNo = "Testing Praba",
//   //IMEI_Number="2232323232323",
// }) => {
//   try {
//     const payload = {
//       Auth_Header: getAuthHeader(),
//       ClientRefNo: clientRefNo,
//       RefNo: BookingRefNo,
//       TransactionType: transactionType,
//       ProductId: productId,
//     };

//     console.log("\n=========== ADD PAYMENT REQUEST ===========");
//     console.log(JSON.stringify(payload, null, 2));

//     const response = await axios.post(
//       "http://uat.flyshop.in/TradeHost/TradeAPIService.svc/JSONService/AddPayment",
//       payload,
//     );
//     console.log("\n=========== ADD PAYMENT RESPONSE ===========");
//     console.log(JSON.stringify(response.data, null, 2));
//     console.log("===========================================\n");

//     return response.data;
//   } catch (error) {
//     console.error("\n=========== ADD PAYMENT ERROR ===========");

//     if (error?.response) {
//       console.error("Status:", error.response.status);
//       console.error(JSON.stringify(error.response.data, null, 2));
//     } else {
//       console.error(error);
//     }

//     console.error("=========================================\n");

//     throw new Error(
//       error?.response?.data?.Message ||
//         error?.response?.data?.ErrorMessage ||
//         "Failed to add payment",
//     );
//   }
// };
import axios from "axios";
import { getAuthHeader } from "../../config/supplierApi.js";

export const addPaymentService = async ({
  BookingRefNo,
  transactionType = 0,
  productId = "3",
  clientRefNo = "Testing Praba",
}) => {
  try {
    if (!BookingRefNo) {
      throw new Error("BookingRefNo is required");
    }

 const auth = getAuthHeader();

const payload = {
  Auth_Header: {
    IP_Address:
      auth?.AuthHeader?.IPAddress || "1",

    Password:
      auth?.AuthHeader?.Password,

    Request_Id:
      auth?.AuthHeader?.RequestId,

    UserId:
      auth?.AuthHeader?.UserId,

    IMEI_Number: "2232323232323",
  },

  ClientRefNo: "Testing Praba",

  RefNo: BookingRefNo,

  TransactionType: 0,

  ProductId: "3",
};
    console.log(
      "\n=========== ADD PAYMENT REQUEST ==========="
    );

    console.log(
      JSON.stringify(payload, null, 2)
    );

    const response = await axios.post(
      "http://uat.flyshop.in/TradeHost/TradeAPIService.svc/JSONService/AddPayment",
      payload
    );

    console.log(
      "\n=========== ADD PAYMENT RESPONSE ==========="
    );

    console.log(
      JSON.stringify(response.data, null, 2)
    );

    return response.data;

  } catch (error) {

    console.error(
      "\n=========== ADD PAYMENT ERROR ==========="
    );

    console.error(
      error?.response?.data ||
      error.message
    );

    throw new Error(
      error?.response?.data?.Message ||
      error?.response?.data?.ErrorMessage ||
      "Failed to add payment"
    );
  }
};