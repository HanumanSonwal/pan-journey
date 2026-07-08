import { api } from "@/services/axios";

// PROFILE
export const getAllGiftCardApi = () => api.get("/couponCode/get-all-giftCard");
