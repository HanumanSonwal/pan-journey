"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { App, Button, Card, Typography } from "antd";
import { useAddBalance } from "../hooks/useAddBalance";
import { useHotelBookingStore } from "../store/booking.store";
import { useHotelTicketing } from "../hooks/useHotelTicketing";

const { Title, Text } = Typography;

export default function HotelCheckout() {
  const router = useRouter();
  const { message } = App.useApp();
  const searchParams = useSearchParams();
  const { mutate: hotelTicketingMutation } = useHotelTicketing();
  const { bookingData, setTicketingData } = useHotelBookingStore();
  const searchKey = bookingData?.selectedHotel?.searchKey;
  const bookingRefNo = searchParams.get("bookingRefNo");
  console.log("Booking Ref No", bookingRefNo);
  const { mutate: addBalanceMutation, isPending } = useAddBalance();

  const handlePayment = () => {
    if (!bookingRefNo) {
      return;
    }
    addBalanceMutation(
      {
        BookingRefNo: bookingRefNo,
      },
      {
        onSuccess: (response) => {
          const statusId = response?.data?.Response_Header?.Status_Id;
          if (statusId !== "11") {
            message.error(
              response?.data?.Response_Header?.Error_InnerException ||
                "Payment failed",
            );
            return;
          }
          hotelTicketingMutation(
            {
              BookingRefNo: bookingRefNo,
              SearchKey: searchKey,
            },
            {
              onSuccess: (ticketResponse) => {
                const statusId = ticketResponse?.data?.ResponseHeader?.StatusId;
                if (statusId !== "11") {
                  message.error(
                    ticketResponse?.data?.ResponseHeader?.ErrorDesc ||
                      "Ticketing failed",
                  );
                  return;
                }
                setTicketingData(ticketResponse?.data);
                router.push("/hotel-booking-success");
              },

              onError: (error) => {
                message.error(error?.message || "Ticketing failed");
              },
            },
          );
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-[#eaf4fb] p-4 md:p-8">
      <div className="mx-auto max-w-[700px]">
        <Card className="rounded-2xl border-0 shadow-sm">
          <Title level={3} className="text-center">
            Select Payment Method
          </Title>

          <div className="mt-8">
            <div className="cursor-pointer rounded-xl border border-[#0f766e] bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <Text strong>Razorpay</Text>

                  <p className="mt-1 text-sm text-gray-500">Secure Payment</p>
                </div>

                <Image
                  src="/images/razorpay.png"
                  alt="razorpay"
                  width={120}
                  height={40}
                />
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              loading={isPending}
              disabled={!bookingRefNo || !searchKey}
              onClick={handlePayment}
              className="!mt-8 !h-[52px] w-full !rounded-xl !bg-[#0f766e]"
            >
              Pay Now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
