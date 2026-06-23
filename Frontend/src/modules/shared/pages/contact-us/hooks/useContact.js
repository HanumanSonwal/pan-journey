import { useMutation } from "@tanstack/react-query";
import { createContactApi } from "../api/contact.api";

export const useCreateContact = () =>
  useMutation({
    mutationFn: createContactApi,
  });
