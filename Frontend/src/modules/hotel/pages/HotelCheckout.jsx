// "use client";

// import { App, Button, Card, Typography } from "antd";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import BookingSummaryCard from "../components/hotel-checkout/BookingSummaryCard";
// import CouponCard from "../components/hotel-checkout/CouponCard";
// import CustomerSummaryCard from "../components/hotel-checkout/CustomerSummaryCard";
// import PaymentMethodCard from "../components/hotel-checkout/PaymentMethodCard";
// import PriceSummaryCard from "../components/hotel-checkout/PriceSummaryCard";
// import { useAddBalance } from "../hooks/useAddBalance";
// import { useBookingDetails } from "../hooks/useBookingDetails";
// import { useHotelTicketing } from "../hooks/useHotelTicketing";
// import { useHotelBookingStore } from "../store/booking.store";
// import PaymentFooter from "../components/hotel-checkout/PaymentFooter";

// const { Title, Text } = Typography;

// export default function HotelCheckout() {
//   const router = useRouter();
//   const { message } = App.useApp();
//   const searchParams = useSearchParams();
//   const { mutate: hotelTicketingMutation } = useHotelTicketing();
//   const { bookingData, setTicketingData } = useHotelBookingStore();
//   const searchKey = bookingData?.selectedHotel?.searchKey;
//   const bookingRefNo = searchParams.get("bookingRefNo");

//   const { data, isLoading, isError } = useBookingDetails(bookingRefNo);
//   const booking = data?.data;
//   console.log("Booking Details in checkout page", booking);
//   console.log("Booking Ref No", bookingRefNo);
//   const { mutate: addBalanceMutation, isPending } = useAddBalance();

//   const handlePayment = () => {
//     if (!bookingRefNo) {
//       return;
//     }
//     addBalanceMutation(
//       {
//         BookingRefNo: bookingRefNo,
//       },
//       {
//         onSuccess: (response) => {
//           const statusId = response?.data?.Response_Header?.Status_Id;
//           if (statusId !== "11") {
//             message.error(
//               response?.data?.Response_Header?.Error_InnerException ||
//                 "Payment failed",
//             );
//             return;
//           }
//           hotelTicketingMutation(
//             {
//               BookingRefNo: bookingRefNo,
//               SearchKey: searchKey,
//             },
//             {
//               onSuccess: (ticketResponse) => {
//                 const statusId = ticketResponse?.data?.ResponseHeader?.StatusId;
//                 if (statusId !== "11") {
//                   message.error(
//                     ticketResponse?.data?.ResponseHeader?.ErrorDesc ||
//                       "Ticketing failed",
//                   );
//                   return;
//                 }
//                 setTicketingData(ticketResponse?.data);
//                 router.push("/hotel-booking-success");
//               },

//               onError: (error) => {
//                 message.error(error?.message || "Ticketing failed");
//               },
//             },
//           );
//         },
//       },
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#eaf4fb] p-4 md:p-8">
//       <div className="mx-auto max-w-[700px]">
//         <Card className="rounded-2xl border-0 shadow-sm">
//           <Title level={3} className="text-center">
//             Select Payment Method
//           </Title>

//           <div className="mt-8">
//             <div className="cursor-pointer rounded-xl border border-[#0f766e] bg-white p-5">
//               <BookingSummaryCard
//                 booking={booking}
//                 hotel={bookingData?.supplierData}
//                 room={bookingData?.selectedRoom}
//                 search={bookingData?.searchData}
//               />
//               <CustomerSummaryCard
//                 customer={booking.customer}
//                 guestDetails={booking.guestDetails}
//               />
//               <CouponCard
//                 coupons={booking.availableCoupons}
//                 priceSummary={booking.priceSummary}
//               />
//               <PaymentMethodCard />
//               <PriceSummaryCard priceSummary={booking.priceSummary} />
//               <PaymentFooter
//                 priceSummary={booking.priceSummary}
//                 loading={isPending}
//                 onPay={handlePayment}
//               />
//               <div className="flex items-center justify-between">
//                 <div>
//                   <Text strong>Razorpay</Text>

//                   <p className="mt-1 text-sm text-gray-500">Secure Payment</p>
//                 </div>

//                 <Image
//                   src="/images/razorpay.png"
//                   alt="razorpay"
//                   width={120}
//                   height={40}
//                 />
//               </div>
//             </div>

//             <Button
//               type="primary"
//               size="large"
//               loading={isPending}
//               disabled={!bookingRefNo || !searchKey}
//               onClick={handlePayment}
//               className="!mt-8 !h-[52px] w-full !rounded-xl !bg-[#0f766e]"
//             >
//               Pay Now
//             </Button>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import { App } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

import HotelCheckoutContent from "../components/hotel-checkout/HotelCheckoutContent";

import { useAddBalance } from "../hooks/useAddBalance";
import { useBookingDetails } from "../hooks/useBookingDetails";
import { useHotelTicketing } from "../hooks/useHotelTicketing";

import { useHotelBookingStore } from "../store/booking.store";

export default function HotelCheckout() {
  const router = useRouter();
  const { message } = App.useApp();

  const searchParams = useSearchParams();
  const bookingRefNo = searchParams.get("bookingRefNo");

  const { bookingData, setTicketingData } = useHotelBookingStore();

  const searchKey = bookingData?.selectedHotel?.searchKey;

  /*
   * BOOKING DETAILS
   */

  const { data, isLoading, isError, error, refetch } =
    useBookingDetails(bookingRefNo);

  const booking = data?.data ?? {};

  /*
   * PAYMENT
   */

  const { mutate: addBalanceMutation, isPending: isPaymentLoading } =
    useAddBalance();

  /*
   * TICKETING
   */

  const { mutate: hotelTicketingMutation, isPending: isTicketingLoading } =
    useHotelTicketing();

  /*
   * PAY NOW
   */

  const handlePayment = () => {
    if (!bookingRefNo || !searchKey) {
      message.error("Booking information is missing.");
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
                const ticketStatus =
                  ticketResponse?.data?.ResponseHeader?.StatusId;

                if (ticketStatus !== "11") {
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

        onError: (error) => {
          message.error(error?.message || "Payment failed");
        },
      },
    );
  };

  /*
   * LOADING
   */

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        Loading booking details...
      </div>
    );
  }

  /*
   * ERROR
   */

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold">Booking not found</h2>

          <p className="text-gray-500">{error?.message}</p>

          <button
            onClick={() => refetch()}
            className="mt-5 rounded bg-[#0f766e] px-5 py-2 text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /*
   * CONTENT
   */

  return (
    <HotelCheckoutContent
      booking={booking}
      bookingData={bookingData}
      loading={isPaymentLoading || isTicketingLoading}
      onPay={handlePayment}
    />
  );
}
