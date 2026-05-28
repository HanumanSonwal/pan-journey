"use client";

import { useEffect } from "react";

import { App } from "antd";
import { useRouter } from "next/navigation";

import { getCMSPageApi } from "../api/cms.service";
import { useCMS } from "./useCMS";

export default function useCMSForm({ id, form }) {
  const router = useRouter();
  const { message } = App.useApp();

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
        title: values.title,
        slug: values.slug,
        template: values.template,
        entityType: values.entityType,
        entityId: values.entityId,
        metaTitle: values.metaTitle,
        metaDescription: values.metaDescription,
        isPublished: values.isPublished,

        keywords:
          values?.keywords?.split(",")?.map((item) => item.trim()) || [],

        data: {
          ...(values?.data || {}),

          cityMeta: values?.cityMeta || null,
        },
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
