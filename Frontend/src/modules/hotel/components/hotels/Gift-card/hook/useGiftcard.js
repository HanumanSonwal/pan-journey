import { useQuery } from "@tanstack/react-query";
import { getAllGiftCardApi } from "../service/GiftCard.api";

export const useGiftcard = () =>
  useQuery({
    queryKey: ["giftcard"],
    queryFn: async () => {
      const res = await getAllGiftCardApi();

      console.log("API RESPONSE:", res.data);

      if (!res?.data?.data) {
        throw new Error("giftCard data missing");
      }

      return res.data.data;
    },
  });
