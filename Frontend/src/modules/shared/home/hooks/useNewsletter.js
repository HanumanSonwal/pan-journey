import { useMutation } from "@tanstack/react-query";
import { subscribeNewsletterApi } from "../services/newsletter.api";

export const useNewsletter = () => {
  return useMutation({
    mutationFn: subscribeNewsletterApi,
  });
};
