"use client";

import { useEffect } from "react";

import { message } from "antd";
import { useRouter } from "next/navigation";

import { useCMS } from "./useCMS";
import { getCMSPageApi } from "../api/cms.service";

export default function useCMSForm({ id, form }) {
  const router = useRouter();

  const { createCMS, updateCMS } = useCMS();

  /*
  EDIT PREFILL
  */
  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const page = await getCMSPageApi(id);

        console.log("CMS EDIT DATA:", page);

        form.setFieldsValue({
          ...page,

          keywords: page?.keywords?.join(", "),

          cityMeta: page?.cityMeta,

          selectedCity: page?.selectedCity,

          selectedHotel: page?.selectedHotel,
        });
      } catch {
        message.error("Failed to load page");
      }
    };

    load();
  }, [id, form]);

  /*
  SUBMIT
  */
  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,

        keywords:
          values?.keywords?.split(",")?.map((item) => item.trim()) || [],
      };

      console.log("CMS PAYLOAD:", payload);

      if (id) {
        await updateCMS.mutateAsync({
          id,
          data: payload,
        });

        message.success("Page updated successfully");
      } else {
        await createCMS.mutateAsync(payload);

        message.success("Page created successfully");
      }

      router.push("/dashboard/cms/pages");
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleSubmit,

    isSubmitting: createCMS.isPending || updateCMS.isPending,
  };
}
