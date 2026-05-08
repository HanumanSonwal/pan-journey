"use client";

import RHFInput from "@/components/ui/RHFInput";
import { EditOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import EditableField from "./EditableField";
import RHFDatePicker from "./RHFDatePicker";
import RHFSelect from "./RHFSelect";

// SCHEMA
const schema = z.object({
  passportNumber: z.string().optional(),
  passportExpiry: z.string().nullable().optional(),
  issuingCountry: z.string().optional(),
  panNumber: z.string().optional(),
});

export default function DocumentsTab() {
  const [isEdit, setIsEdit] = useState(false);

  // API DATA
  const userDocs = useMemo(
    () => ({
      passportNumber: "P123456",
      passportExpiry: "2028-05-20T00:00:00.000Z",
      issuingCountry: "India",
      panNumber: "ABCDE1234F",
    }),
    [],
  );

  // FORM
  const methods = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      passportNumber: "",
      passportExpiry: null,
      issuingCountry: "",
      panNumber: "",
    },
  });

  const { handleSubmit, reset, watch } = methods;

  // LOAD API DATA
  useEffect(() => {
    if (userDocs) {
      reset(userDocs);
    }
  }, [userDocs, reset]);

  // SUBMIT
  const onSubmit = async (data) => {
    console.log("FINAL DATA:", data);

    // API CALL
    // await updateDocuments(data)

    setIsEdit(false);
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
          <Button icon={<EditOutlined />} onClick={() => setIsEdit(true)}>
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
                watch("passportExpiry")
                  ? dayjs(watch("passportExpiry")).format("DD MMM YYYY")
                  : ""
              }
              isEdit={isEdit}
            >
              <RHFDatePicker name="passportExpiry" />
            </EditableField>

            {/* COUNTRY */}
            <EditableField
              label="Issuing Country"
              value={watch("issuingCountry")}
              isEdit={isEdit}
            >
              <RHFSelect
                name="issuingCountry"
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

            {/* PAN NUMBER */}
            <EditableField
              label="PAN Number"
              value={watch("panNumber")}
              isEdit={isEdit}
            >
              <RHFInput
                name="panNumber"
                label="PAN Number"
                transform={(value) => value.toUpperCase()}
              />
            </EditableField>
          </div>

          {/* ACTION BUTTONS */}
          {isEdit && (
            <div className="mt-6 flex gap-3">
              <Button onClick={() => setIsEdit(false)}>Cancel</Button>

              <Button htmlType="submit" type="primary">
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
