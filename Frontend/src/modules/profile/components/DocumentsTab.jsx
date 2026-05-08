"use client";

import RHFInput from "@/components/ui/RHFInput";
import { EditOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import EditableField from "./EditableField";
import RHFDatePicker from "./RHFDatePicker";
import RHFSelect from "./RHFSelect";

import {
  getCustomerDocumentsApi,
  updateCustomerDocumentsApi,
} from "../api/profile.api";

// SCHEMA
const schema = z.object({
  passportNumber: z.string().optional(),
  passportExpiryDate: z.any().nullable().optional(),
  passportIssuingCountry: z.string().optional(),
  panCardNumber: z.string().optional(),
});

export default function DocumentsTab() {
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documentsLoading, setDocumentsLoading] = useState(true);

  // FORM
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      passportNumber: "",
      passportExpiryDate: null,
      passportIssuingCountry: "",
      panCardNumber: "",
    },
  });

  const { handleSubmit, reset, watch } = methods;
  // LOAD DOCUMENTS
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setDocumentsLoading(true);
        const res = await getCustomerDocumentsApi();
        const data = res?.data?.data;
        reset({
          passportNumber: data?.passportNumber || "",
          passportExpiryDate: data?.passportExpiryDate
            ? dayjs(data.passportExpiryDate)
            : null,
          passportIssuingCountry: data?.passportIssuingCountry || "",
          panCardNumber: data?.panCardNumber || "",
        });
      } catch (error) {
        console.log(error);
        message.error("Failed to load documents");
      } finally {
        setDocumentsLoading(false);
      }
    };

    fetchDocuments();
  }, [reset]);

  // SUBMIT
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        passportNumber: data.passportNumber || null,
        passportExpiryDate: data.passportExpiryDate
          ? dayjs(data.passportExpiryDate).toISOString()
          : null,
        passportIssuingCountry: data.passportIssuingCountry || null,
        panCardNumber: data.panCardNumber || null,
      };
      const res = await updateCustomerDocumentsApi(payload);
      const updatedData = res?.data?.data;
      reset({
        passportNumber: updatedData?.passportNumber || "",
        passportExpiryDate: updatedData?.passportExpiryDate
          ? dayjs(updatedData.passportExpiryDate)
          : null,

        passportIssuingCountry: updatedData?.passportIssuingCountry || "",
        panCardNumber: updatedData?.panCardNumber || "",
      });
      message.success("Documents updated successfully");
      setIsEdit(false);
    } catch (error) {
      console.log(error);
      message.error(
        error?.response?.data?.message || "Failed to update documents",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl p-6 text-gray-900 shadow">
      {/* TITLE */}
      <h2 className="text-[22px] font-semibold">My Profile</h2>
      <Divider />
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Documents</h3>

        {!isEdit && (
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsEdit(true)}
            loading={documentsLoading}
          >
            Edit Details
          </Button>
        )}
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* PASSPORT NUMBER */}
            <EditableField
              label="Passport Number"
              value={watch("passportNumber")}
              isEdit={isEdit}
            >
              <RHFInput name="passportNumber" label="Passport Number" />
            </EditableField>

            {/* PASSPORT EXPIRY */}
            <EditableField
              label="Passport Expiry"
              value={
                watch("passportExpiryDate")
                  ? dayjs(watch("passportExpiryDate")).format("DD MMM YYYY")
                  : ""
              }
              isEdit={isEdit}
            >
              <RHFDatePicker name="passportExpiryDate" />
            </EditableField>

            {/* ISSUING COUNTRY */}
            <EditableField
              label="Issuing Country"
              value={watch("passportIssuingCountry")}
              isEdit={isEdit}
            >
              <RHFSelect
                name="passportIssuingCountry"
                placeholder="Select Country"
                options={[
                  {
                    label: "India",
                    value: "India",
                  },

                  {
                    label: "USA",
                    value: "USA",
                  },
                ]}
              />
            </EditableField>

            {/* PAN CARD NUMBER */}
            <EditableField
              label="PAN Card Number"
              value={watch("panCardNumber")}
              isEdit={isEdit}
            >
              <RHFInput
                name="panCardNumber"
                label="PAN Card Number"
                transform={(value) => value.toUpperCase()}
              />
            </EditableField>
          </div>

          {/* ACTION BUTTONS */}
          {isEdit && (
            <div className="mt-6 flex gap-3">
              <Button
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                Cancel
              </Button>

              <Button htmlType="submit" type="primary" loading={loading}>
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
