"use client";

import RHFInput from "@/components/ui/RHFinputs/RHFInput";
import RHFSelect from "@/components/ui/RHFinputs/RHFSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, ConfigProvider, Radio, Typography } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import RHFPhoneInput from "@/components/ui/RHFinputs/RHFPhoneInput";
import { primaryGuestSchema } from "../../schema/guest.schema";
import AddGuestModal from "./AddGuestModal";

const GuestDetailsForm = forwardRef(({ onSubmit }, ref) => {
  const [openGuestModal, setOpenGuestModal] = useState(false);
  const { Title, Text } = Typography;
  const [guests, setGuests] = useState([]);

  

  console.log("guests details", guests);

  const methods = useForm({
    resolver: zodResolver(primaryGuestSchema),
    defaultValues: {
      bookingFor: "myself",
      title: "Mr",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      phoneCode: "+91",
    },
  });

  const { handleSubmit, setValue, watch } = methods;

  const formValues = watch();
  useImperativeHandle(ref, () => ({
    submitForm: () =>
      new Promise((resolve, reject) => {
        handleSubmit(
          (data) => {
            console.log("Latest Form Data", data);
            console.log("Watch Data", methods.getValues());
            const guestData = {
              primaryGuest: data,
              additionalGuests: guests,
            };

            console.log("Payload", guestData);

            onSubmit(guestData);
            resolve(guestData);
          },
          (errors) => {
            reject(errors);
          },
        )();
      }),
  }));

  return (
    <>
      <Card className="font-roboto! !mb-2 rounded border-0 !shadow-[0_4px_12px_rgba(0,0,0,0.25)] shadow-sm">
        <Title level={4} className="font-roboto! !mb-5 !text-[20px] font-bold!">
          Guest Details
        </Title>

        <FormProvider {...methods}>
          <form>
            <ConfigProvider
              theme={{
                components: {
                  Radio: {
                    colorPrimary: "#72c0f0",
                    colorPrimaryHover: "#72c0f0",
                    dotSize: 8,
                  },
                },
              }}
            >
              <Radio.Group
                value={watch("bookingFor")}
                onChange={(e) => setValue("bookingFor", e.target.value)}
                className="mb-7"
              >
                <Radio value="myself">Myself</Radio>

                <Radio value="someone">Someone</Radio>
              </Radio.Group>
            </ConfigProvider>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <RHFSelect
                name="title"
                label="Gender"
                options={[
                  {
                    label: "Mr",
                    value: "Mr",
                  },
                  {
                    label: "Mrs",
                    value: "Mrs",
                  },
                  {
                    label: "Miss",
                    value: "Miss",
                  },
                ]}
              />

              <RHFInput name="firstName" label="First Name" />

              <RHFInput name="lastName" label="Last Name" />

              <RHFInput name="email" label="Email" />

              <RHFPhoneInput
                name="mobile"
                codeName="phoneCode"
                label="Mobile No."
              />
            </div>

            {!!guests.length && (
              <div className="mt-6 space-y-3">
                {guests.map((guest, index) => (
                  <div key={index} className="rounded-xl border p-4">
                    Guest {index + 2}
                    {" - "}
                    {guest.firstName} {guest.lastName}
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setOpenGuestModal(true)}
              className="mt-6! cursor-pointer! font-[15px]! font-bold text-[#62B7EB]!"
            >
              + Add Guest
            </button>
          </form>
        </FormProvider>
      </Card>

      <AddGuestModal
        open={openGuestModal}
        guestNo={guests.length + 2}
        onClose={() => setOpenGuestModal(false)}
        onSave={(guest) => setGuests((prev) => [...prev, guest])}
      />
    </>
  );
});

export default GuestDetailsForm;
