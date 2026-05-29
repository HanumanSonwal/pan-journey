"use client";

import { App } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCMSPageApi } from "../api/cms.service";
import { useCMS } from "./useCMS";

export default function useCMSForm({ id, form }) {
  const router = useRouter();
  const { message } = App.useApp();
  const { createCMS, updateCMS } = useCMS();

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const page = await getCMSPageApi(id);
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

  const handleSubmit = async (values) => {
    const formValues = form.getFieldsValue(true);
    try {
      const payload = {
        title: formValues.title,
        slug: formValues.slug,
        template: formValues.template,
        entityType: formValues.entityType,
        entityId: formValues.entityId,
        metaTitle: formValues.metaTitle,
        metaDescription: formValues.metaDescription,
        isPublished: formValues.isPublished,
        keywords:
          formValues?.keywords?.split(",")?.map((item) => item.trim()) || [],
        data: {
          ...(formValues?.data || {}),
          cityMeta: formValues?.cityMeta || null,
        },
      };

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
