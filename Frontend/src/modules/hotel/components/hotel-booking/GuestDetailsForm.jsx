"use client";

import RHFInput from "@/components/ui/RHFinputs/RHFInput";
import RHFPhoneInput from "@/components/ui/RHFinputs/RHFPhoneInput";
import RHFSelect from "@/components/ui/RHFinputs/RHFSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, ConfigProvider, Radio, Typography } from "antd";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { primaryGuestSchema } from "../../schema/guest.schema";

const GuestDetailsForm = forwardRef(({ onSubmit, occupancy = [] }, ref) => {
  const guestFields = useMemo(() => {
    const fields = [];

    occupancy.forEach((room) => {
      const roomNo = Number(room?.roomNo) || 1;
      const adults = Math.max(Number(room?.adults) || 0, 0);
      const children = Math.max(Number(room?.children) || 0, 0);

      for (let adultIndex = 1; adultIndex <= adults; adultIndex += 1) {
        fields.push({
          key: `room-${roomNo}-adult-${adultIndex}`,
          roomNo,
          passengerTyp: `Adult ${adultIndex}`,
          isChild: false,
          childAge: null,
        });
      }

      for (let childIndex = 1; childIndex <= children; childIndex += 1) {
        fields.push({
          key: `room-${roomNo}-child-${childIndex}`,
          roomNo,
          passengerTyp: `Child ${childIndex}`,
          isChild: true,
          childAge: null,
        });
      }
    });

    return fields;
  }, [occupancy]);

  const defaultValues = useMemo(() => {
    const values = {
      bookingFor: "myself",
      customerAddress: "",
      customerPostalCode: "",
      panNumber: "",
      paxDetails: {},
    };

    guestFields.forEach((guest) => {
      values.paxDetails[guest.key] = {
        title: "Mr",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        phoneCode: "+91",
      };
    });

    return values;
  }, [guestFields]);

  const methods = useForm({
    resolver: zodResolver(primaryGuestSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit, setValue, watch } = methods;

  useImperativeHandle(ref, () => ({
    submitForm: () =>
      new Promise((resolve, reject) => {
        handleSubmit(
          (data) => {
            const paxDetails = guestFields.map((guest) => {
              const guestData = data?.paxDetails?.[guest.key] || {};

              return {
                firstName: guestData?.firstName || "",
                lastName: guestData?.lastName || "",
                title: guestData?.title || "Mr",
                email: guestData?.email || "",
                mobile: guestData?.mobile || "",
                phoneCode: guestData?.phoneCode || "+91",
                isChild: guest.isChild,
                childAge: guest.childAge,
                roomNo: guest.roomNo,
                passengerTyp: guest.passengerTyp,
              };
            });

            const primaryGuest = paxDetails[0] || {};

            const guestData = {
              customerAddress: data?.customerAddress || "",
              customerPostalCode: data?.customerPostalCode || "",
              panNumber: data?.panNumber || "",
              customerMobile: primaryGuest?.mobile || "",
              passengerEmail: primaryGuest?.email || "",
              passengerMobile: primaryGuest?.mobile || "",
              paxDetails,
            };

            onSubmit?.(guestData);
            resolve(guestData);
          },
          (errors) => {
            reject(errors);
          },
        )();
      }),
  }));

  return (
    <Card className="font-roboto! !mb-2 rounded border-0 !shadow-[0_4px_12px_rgba(0,0,0,0.25)] shadow-sm">
      <Typography.Title
        level={4}
        className="font-roboto! !mb-5 !text-[20px] font-bold!"
      >
        Guest Details
      </Typography.Title>

      <FormProvider {...methods}>
        <form>
          <ConfigProvider
            theme={{
              components: {
                Radio: {
                  colorPrimary: "#05144B",
                  colorPrimaryHover: "#05144B",
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

          <div className="space-y-6">
            {occupancy.map((room) => {
              const roomNo = Number(room?.roomNo) || 1;

              const roomGuests = guestFields.filter(
                (guest) => guest.roomNo === roomNo,
              );

              return (
                <div
                  key={roomNo}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <Typography.Title
                    level={5}
                    className="!mb-5 !text-[18px] font-bold"
                  >
                    Room {roomNo}
                  </Typography.Title>

                  <div className="space-y-6">
                    {roomGuests.map((guest) => (
                      <div
                        key={guest.key}
                        className="rounded-lg bg-gray-50 p-4"
                      >
                        <div className="mb-4 text-base font-semibold">
                          {guest.passengerTyp}
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">
                          <RHFSelect
                            name={`paxDetails.${guest.key}.title`}
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

                          <RHFInput
                            name={`paxDetails.${guest.key}.firstName`}
                            label="First Name"
                          />

                          <RHFInput
                            name={`paxDetails.${guest.key}.lastName`}
                            label="Last Name"
                          />

                          <RHFInput
                            name={`paxDetails.${guest.key}.email`}
                            label="Email"
                          />

                          <RHFPhoneInput
                            name={`paxDetails.${guest.key}.mobile`}
                            codeName={`paxDetails.${guest.key}.phoneCode`}
                            label="Mobile No."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-gray-200 p-4">
            <Typography.Title
              level={5}
              className="!mb-5 !text-[18px] font-bold"
            >
              Customer Details
            </Typography.Title>

            <div className="grid gap-5 md:grid-cols-2">
              <RHFInput name="customerAddress" label="Address" />

              <RHFInput name="customerPostalCode" label="Postal Code" />

              <RHFInput name="panNumber" label="PAN Number" />
            </div>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
});

GuestDetailsForm.displayName = "GuestDetailsForm";

export default GuestDetailsForm;
