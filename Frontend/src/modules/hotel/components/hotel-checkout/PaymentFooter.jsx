"use client";

import { LockOutlined, SafetyCertificateFilled } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";
import { useHotelBookingStore } from "../../store/booking.store";

const { Text, Title } = Typography;

export default function PaymentFooter({
  priceSummary = {},
  loading = false,
  onPay,
}) {
  const { bookingData } = useHotelBookingStore();

  const paymentMethod = bookingData?.selectedPaymentMethod || "razorpay";

  const payableAmount = Number(
    priceSummary?.totalPayableAmountAfterDiscount ??
      priceSummary?.totalAmount ??
      0,
  );

  const formatPrice = (value) =>
    Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <Card
      className="rounded-xl border-0 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
      styles={{
        body: {
          padding: 20,
        },
      }}
    >
      {/* Total */}

      <div className="mb-5 flex items-center justify-between">
        <div>
          <Text className="text-gray-500">Amount Payable</Text>

          <Title level={2} className="!mt-1 !mb-0 !text-[#0f766e]">
            ₹ {formatPrice(payableAmount)}
          </Title>
        </div>

        <div className="text-right">
          <Text className="text-gray-500">Payment Gateway</Text>

          <Title level={5} className="!mt-1 !mb-0 capitalize">
            {paymentMethod}
          </Title>
        </div>
      </div>

      {/* Security */}

      <div className="mb-6 rounded-xl bg-[#eef8fd] p-4">
        <div className="flex items-center gap-2">
          <SafetyCertificateFilled className="text-[#0f766e]" />

          <Text strong>100% Secure Payment</Text>
        </div>

        <Text className="mt-2 block text-gray-600">
          Your payment is encrypted and securely processed through{" "}
          <strong className="capitalize">{paymentMethod}</strong>.
        </Text>
      </div>

      {/* Button */}

      <Button
        type="primary"
        size="large"
        loading={loading}
        onClick={onPay}
        icon={<LockOutlined />}
        className="!h-[56px] w-full !rounded-xl !bg-[#0f766e] !text-[16px] !font-semibold"
      >
        Pay ₹ {formatPrice(payableAmount)}
      </Button>

      {/* Footer */}

      <p className="mt-4 mb-0 text-center text-xs leading-5 text-gray-500">
        By continuing, you agree to our booking terms, cancellation policy and
        secure payment process.
      </p>
    </Card>
  );
}
