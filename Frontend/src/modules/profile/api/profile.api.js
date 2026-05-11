import { api } from "@/services/axios";

// PROFILE
export const getProfileApi = () => api.get("/customer/profile");

export const updateProfileApi = (data) => api.patch("/customer/profile", data);

// EMAIL
export const sendEmailOtpApi = (data) =>
  api.post("/customer/auth/email/send", data);

export const verifyEmailApi = (data) =>
  api.post("/customer/profile/email/verify", data);

// MOBILE
export const sendMobileOtpApi = (data) =>
  api.post("/customer/auth/otp/send", data);

export const verifyMobileApi = (data) =>
  api.post("/customer/profile/mobile/verify", data);

// CUSTOMER DOCUMENTS
export const getCustomerDocumentsApi = () =>
  api.get("/customer/profile/documents");

export const updateCustomerDocumentsApi = (data) =>
  api.put("/customer/profile/documents", data);
