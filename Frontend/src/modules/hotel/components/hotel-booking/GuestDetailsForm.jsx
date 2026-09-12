"use client";

import RHFInput from "@/components/ui/RHFinputs/RHFInput";
import RHFPhoneInput from "@/components/ui/RHFinputs/RHFPhoneInput";
import RHFSelect from "@/components/ui/RHFinputs/RHFSelect";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Typography } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { primaryGuestSchema } from "../../schema/guest.schema";

const MAX_GUESTS_PER_ROOM = 4;

const GuestDetailsForm = forwardRef(({ onSubmit, occupancy = [] }, ref) => {
  const [roomOccupancy, setRoomOccupancy] = useState([]);
  const [expandedRooms, setExpandedRooms] = useState({});

  useEffect(() => {
    const normalized = occupancy.map((room, index) => {
      const adults = Math.max(Number(room?.adults) || 0, 0);
      const children = Math.max(Number(room?.children) || 0, 0);

      return {
        roomNo: Number(room?.roomNo) || index + 1,
        adults,
        children,
      };
    });

    setRoomOccupancy((previous) => {
      if (!previous.length) {
        return normalized;
      }

      return normalized.map((room, index) => {
        const oldRoom = previous[index];

        if (!oldRoom) {
          return room;
        }

        return {
          roomNo: room.roomNo,
          adults: oldRoom.adults,
          children: oldRoom.children,
        };
      });
    });

    setExpandedRooms((previous) => {
      const next = {};

      normalized.forEach((room, index) => {
        next[room.roomNo] = previous[room.roomNo] ?? index === 0;
      });

      return next;
    });
  }, [occupancy]);

  const totalSelectedGuests = useMemo(
    () =>
      roomOccupancy.reduce(
        (total, room) =>
          total + (Number(room?.adults) || 0) + (Number(room?.children) || 0),
        0,
      ),
    [roomOccupancy],
  );

  const guestFields = useMemo(() => {
    const fields = [];

    roomOccupancy.forEach((room) => {
      const roomNo = Number(room?.roomNo) || 1;
      const adults = Math.max(Number(room?.adults) || 0, 0);
      const children = Math.max(Number(room?.children) || 0, 0);

      for (let index = 1; index <= adults; index += 1) {
        fields.push({
          key: `room-${roomNo}-adult-${index}`,
          roomNo,
          passengerTyp: `Adult ${index}`,
          isChild: false,
        });
      }

      for (let index = 1; index <= children; index += 1) {
        fields.push({
          key: `room-${roomNo}-child-${index}`,
          roomNo,
          passengerTyp: `Child ${index}`,
          isChild: true,
        });
      }
    });

    return fields;
  }, [roomOccupancy]);

  const defaultValues = useMemo(() => {
    const values = {
      bookingFor: "myself",
      customerAddress: "",
      customerPostalCode: "",
      panNumber: "",
      customerEmail: "",
      customerMobile: "",
      customerPhoneCode: "+91",
      paxDetails: {},
    };

    guestFields.forEach((guest) => {
      values.paxDetails[guest.key] = {
        title: guest.isChild ? "Master" : "Mr",
        firstName: "",
        lastName: "",
      };
    });

    return values;
  }, [guestFields]);

  const methods = useForm({
    resolver: zodResolver(primaryGuestSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit, setValue, watch, reset } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const toggleRoom = (roomNo) => {
    setExpandedRooms((previous) => ({
      ...previous,
      [roomNo]: !previous[roomNo],
    }));
  };

  const updateRoomGuests = (roomNo, type, change) => {
    setRoomOccupancy((previous) =>
      previous.map((room) => {
        if (room.roomNo !== roomNo) {
          return room;
        }

        const currentAdults = Number(room.adults) || 0;
        const currentChildren = Number(room.children) || 0;
        const currentTotal = currentAdults + currentChildren;

        if (type === "child" && change > 0 && currentChildren >= 2) {
          return room;
        }

        if (change > 0 && currentTotal >= MAX_GUESTS_PER_ROOM) {
          return room;
        }

        if (change < 0 && currentTotal <= 1) {
          return room;
        }

        if (type === "adult") {
          const nextAdults = Math.max(currentAdults + change, 0);

          if (change < 0 && nextAdults + currentChildren < 1) {
            return room;
          }

          return {
            ...room,
            adults: nextAdults,
          };
        }

        const nextChildren = Math.max(currentChildren + change, 0);

        if (change < 0 && currentAdults + nextChildren < 1) {
          return room;
        }

        return {
          ...room,
          children: nextChildren,
        };
      }),
    );
  };

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
                isChild: guest.isChild,
                roomNo: guest.roomNo,
                passengerTyp: guest.passengerTyp,
              };
            });

            const guestData = {
              customerAddress: data?.customerAddress || "",
              customerPostalCode: data?.customerPostalCode || "",
              panNumber: data?.panNumber || "",

              customerMobile: data?.customerMobile || "",
              passengerEmail: data?.customerEmail || "",
              passengerMobile: data?.customerMobile || "",

              paxDetails,
              occupancy: roomOccupancy,
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
    <Card className="font-roboto !mb-2 rounded-xl border-0 !shadow-[0_4px_12px_rgba(0,0,0,0.16)]">
      <div className="mb-6">
        <Typography.Title
          level={4}
          className="font-roboto !mb-1 !text-[20px] font-bold"
        >
          Guest Details
        </Typography.Title>

        <Typography.Text className="text-sm text-[#666]">
          Enter guest details exactly as they appear on the official ID.
        </Typography.Text>
      </div>

      <FormProvider {...methods}>
        <form>
          <div className="mt-7">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[17px] font-bold text-[#151515]">
                  Rooms & Guests
                </div>

                <div className="mt-1 text-sm text-[#666]">
                  Add up to 4 guests in each room.
                </div>
              </div>

              <div className="rounded-full bg-[#f3f6fa] px-3 py-1.5 text-xs font-semibold text-[#172033]">
                {totalSelectedGuests}{" "}
                {totalSelectedGuests === 1 ? "Guest" : "Guests"}
              </div>
            </div>

            <div className="space-y-3">
              {roomOccupancy.map((room) => {
                const roomNo = Number(room?.roomNo) || 1;
                const adultCount = Number(room?.adults) || 0;
                const childCount = Number(room?.children) || 0;
                const totalRoomGuests = adultCount + childCount;
                const roomGuests = guestFields.filter(
                  (guest) => guest.roomNo === roomNo,
                );
                const isExpanded = expandedRooms[roomNo];

                return (
                  <div
                    key={roomNo}
                    className="overflow-hidden rounded-xl border border-[#e1e5eb] bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => toggleRoom(roomNo)}
                      className="flex w-full items-center justify-between bg-[#f7f9fc] px-5 py-4 text-left"
                    >
                      <div>
                        <div className="text-[17px] font-bold text-[#151515]">
                          Room {roomNo}
                        </div>

                        <div className="mt-1 text-sm text-[#666]">
                          {adultCount} {adultCount === 1 ? "Adult" : "Adults"}
                          {childCount > 0
                            ? ` · ${childCount} ${
                                childCount === 1 ? "Child" : "Children"
                              }`
                            : ""}
                          <span className="ml-2 text-[#999]">
                            ({totalRoomGuests}/4)
                          </span>
                        </div>
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dfe3e8] bg-white">
                        {isExpanded ? (
                          <UpOutlined className="!text-xs !text-[#555]" />
                        ) : (
                          <DownOutlined className="!text-xs !text-[#555]" />
                        )}
                      </div>
                    </button>

                    <div className={isExpanded ? "block" : "hidden"}>
                      <div className="border-b border-[#e5e7eb] p-5">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="flex items-center justify-between rounded-xl border border-[#e5e7eb] px-4 py-3">
                            <div>
                              <div className="text-sm font-semibold text-[#222]">
                                Adults
                              </div>

                              <div className="text-xs text-[#777]">
                                Adult travellers
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  updateRoomGuests(roomNo, "adult", -1)
                                }
                                disabled={adultCount + childCount <= 1}
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d9dde3] text-lg text-[#333] disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                −
                              </button>

                              <span className="w-5 text-center text-sm font-semibold">
                                {adultCount}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateRoomGuests(roomNo, "adult", 1)
                                }
                                disabled={
                                  adultCount + childCount >= MAX_GUESTS_PER_ROOM
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d9dde3] text-lg text-[#333] disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between rounded-xl border border-[#e5e7eb] px-4 py-3">
                            <div>
                              <div className="text-sm font-semibold text-[#222]">
                                Children
                              </div>

                              <div className="text-xs text-[#777]">
                                Child travellers
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  updateRoomGuests(roomNo, "child", -1)
                                }
                                disabled={
                                  childCount <= 0 ||
                                  adultCount + childCount <= 1
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d9dde3] text-lg text-[#333] disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                −
                              </button>

                              <span className="w-5 text-center text-sm font-semibold">
                                {childCount}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateRoomGuests(roomNo, "child", 1)
                                }
                                disabled={
                                  childCount >= 2 ||
                                  adultCount + childCount >= MAX_GUESTS_PER_ROOM
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d9dde3] text-lg text-[#333] disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 text-xs text-[#777]">
                          Minimum 1 guest and maximum 4 guests per room. Adults
                          and children together cannot exceed 4.
                        </div>
                      </div>

                      <div className="space-y-5 p-5">
                        {roomGuests.map((guest) => (
                          <div key={guest.key}>
                            <div className="grid gap-5 md:grid-cols-3">
                              <RHFSelect
                                name={`paxDetails.${guest.key}.title`}
                                label="Title"
                                options={
                                  guest.isChild
                                    ? [
                                        {
                                          label: "Master",
                                          value: "Master",
                                        },
                                        {
                                          label: "Miss",
                                          value: "Miss",
                                        },
                                      ]
                                    : [
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
                                      ]
                                }
                              />

                              <RHFInput
                                name={`paxDetails.${guest.key}.firstName`}
                                label="First Name"
                              />

                              <RHFInput
                                name={`paxDetails.${guest.key}.lastName`}
                                label="Last Name"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-[#e1e5eb]">
            <div className="border-b border-[#e1e5eb] bg-[#f7f9fc] px-5 py-4">
              <div className="text-[17px] font-bold text-[#151515]">
                Customer Information
              </div>

              <div className="mt-1 text-sm text-[#666]">
                Required information for booking and communication.
              </div>
            </div>

            <div className="grid gap-5 p-5 md:grid-cols-2">
              <RHFInput name="customerAddress" label="Address" />
              <RHFInput name="customerPostalCode" label="Postal Code" />
              <RHFInput name="panNumber" label="PAN Number" />
              <RHFInput name="customerEmail" label="Email" />
              <RHFPhoneInput
                name="customerMobile"
                codeName="customerPhoneCode"
                label="Mobile No."
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
});

GuestDetailsForm.displayName = "GuestDetailsForm";

export default GuestDetailsForm;
