import { asyncHandler } from "../../../../middleware/asyncHandler.js";
import { sendSuccess } from "../../../../utils/response/ApiResponse.js";

import {
  getCustomerdetailService,
  updateCustomerdetailService,
} from "./customerdetails.service.js";


// GET CUSTOMER DETAIL
export const getCustomerDocumentdetail = asyncHandler(async (req, res) => {
  const profile = await getCustomerdetailService(req.user._id);

  return sendSuccess(res, "Customer profile fetched", {
    passportNo: profile.passportNo || null,
    expireDate: profile.expireDate || null,
    issuingCountry: profile.issuingCountry || null,
    panCardNumber: profile.panCardNumber || null,
  });
});


// UPDATE CUSTOMER DETAIL
export const updateCustomerDocumentDetail = asyncHandler(async (req, res) => {
  const { passportNo, expireDate, issuingCountry, panCardNumber } = req.body;

  const profile = await updateCustomerdetailService(req.user._id, {
    passportNo,
    expireDate,
    issuingCountry,
    panCardNumber,
  });

  return sendSuccess(res, "Customer profile updated", {
    passportNo: profile.passportNo,
    expireDate: profile.expireDate,
    issuingCountry: profile.issuingCountry,
    panCardNumber: profile.panCardNumber,
  });
});