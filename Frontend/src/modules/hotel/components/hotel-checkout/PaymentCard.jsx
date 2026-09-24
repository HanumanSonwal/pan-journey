"use client";

import {
  BankOutlined,
  CheckOutlined,
  CreditCardOutlined,
  LockOutlined,
  MobileOutlined,
  SafetyCertificateFilled,
  WalletOutlined,
} from "@ant-design/icons";
import { Checkbox, Input } from "antd";
import { useState } from "react";

const PAYMENT_METHODS = [
  {
    key: "cards",
    label: "Cards",
    subLabel: "Credit/Debit",
    icon: CreditCardOutlined,
  },
  {
    key: "upi",
    label: "UPI Apps",
    subLabel: "GPay, PhonePe",
    icon: MobileOutlined,
  },
  {
    key: "netbanking",
    label: "Net Banking",
    subLabel: "All Major Banks",
    icon: BankOutlined,
  },
  {
    key: "wallets",
    label: "Wallets",
    subLabel: "Paytm & More",
    icon: WalletOutlined,
  },
];

export default function PaymentCard() {
  const [selectedMethod, setSelectedMethod] = useState("cards");

  const [nameOnCard, setNameOnCard] = useState("Kanak Sharma");
  const [cardNumber, setCardNumber] = useState("4532 8921 0012 3456");
  const [expiryDate, setExpiryDate] = useState("08 / 29");
  const [cvv, setCvv] = useState("892");
  const [saveCard, setSaveCard] = useState(true);
  const [upiId, setUpiId] = useState("");

  // =========================================================
  // CARD NUMBER FORMAT
  // =========================================================
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    value = value.slice(0, 16);

    value = value.replace(/(.{4})/g, "$1 ").trim();

    setCardNumber(value);
  };

  // =========================================================
  // EXPIRY FORMAT
  // =========================================================
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    value = value.slice(0, 4);

    if (value.length >= 3) {
      value = `${value.slice(0, 2)} / ${value.slice(2)}`;
    }

    setExpiryDate(value);
  };

  // =========================================================
  // CVV
  // =========================================================
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);

    setCvv(value);
  };

  return (
    <div
      className="
        w-full
        overflow-hidden
        rounded-[16px]
        border
        border-[#e0e6eb]
        bg-white
      "
    >
      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="px-[18px] py-[20px] sm:px-[24px] sm:py-[22px]">
        {/* =================================================
            HEADER
        ================================================== */}
        <div className="mb-[17px] flex items-start justify-between gap-3">
          <div>
            <h2
              className="
                !m-0
                font-roboto
                text-[17px]
                font-bold
                leading-[22px]
                text-[#172033]
                sm:text-[18px]
              "
            >
              Select Payment Method
            </h2>

            <div className="mt-[3px] flex items-center gap-[5px]">
              <SafetyCertificateFilled
                className="!text-[14px] !text-[#0f9f73]"
              />

              <span
                className="
                  font-roboto
                  text-[10px]
                  text-[#667085]
                  sm:text-[11px]
                "
              >
                Encrypted 256-bit SSL transaction guaranteed by Razorpay
              </span>
            </div>
          </div>

          {/* Instant Confirmation */}
          <div
            className="
              hidden
              shrink-0
              rounded-[6px]
              bg-[#f1f3f6]
              px-[10px]
              py-[5px]
              text-[10px]
              font-semibold
              text-[#667085]
              sm:block
            "
          >
            Instant Confirmation
          </div>
        </div>

        {/* =================================================
            PAYMENT METHOD TABS
        ================================================== */}
        <div
          className="
            grid
            grid-cols-4
            gap-[7px]
            sm:gap-[8px]
          "
        >
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon;
            const active = selectedMethod === method.key;

            return (
              <button
                key={method.key}
                type="button"
                onClick={() => setSelectedMethod(method.key)}
                className={`
                  relative
                  flex
                  min-h-[68px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[10px]
                  border
                  px-1
                  py-[8px]
                  transition-all
                  duration-200
                  ${
                    active
                      ? "border-[2px] border-[#0751a5] bg-[#f8fbff]"
                      : "border-[#dfe5ec] bg-white hover:border-[#b7c9dc]"
                  }
                `}
              >
                {/* Active dot */}
                {active && (
                  <span
                    className="
                      absolute
                      right-[5px]
                      top-[5px]
                      h-[8px]
                      w-[8px]
                      rounded-full
                      bg-[#0751a5]
                    "
                  />
                )}

                <Icon
                  className={`
                    mb-[5px]
                    !text-[16px]
                    ${
                      active
                        ? "!text-[#0751a5]"
                        : "!text-[#667085]"
                    }
                  `}
                />

                <span
                  className={`
                    font-roboto
                    text-[11px]
                    font-semibold
                    ${
                      active
                        ? "text-[#0751a5]"
                        : "text-[#344054]"
                    }
                  `}
                >
                  {method.label}
                </span>

                <span
                  className="
                    mt-[1px]
                    whitespace-nowrap
                    font-roboto
                    text-[8px]
                    text-[#98a2b3]
                    sm:text-[9px]
                  "
                >
                  {method.subLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* =================================================
            CARD PAYMENT
        ================================================== */}
        {selectedMethod === "cards" && (
          <>
            {/* Divider */}
            <div className="my-[16px] border-t border-[#edf0f3]" />

            {/* =================================================
                SUPPORTED NETWORKS
            ================================================== */}
            <div
              className="
                mb-[13px]
                flex
                min-h-[35px]
                items-center
                justify-between
                gap-3
                rounded-[7px]
                border
                border-[#edf0f3]
                bg-[#fafbfc]
                px-[9px]
                py-[6px]
              "
            >
              <span
                className="
                  whitespace-nowrap
                  font-roboto
                  text-[9px]
                  font-medium
                  text-[#667085]
                  sm:text-[10px]
                "
              >
                Supported Payment Networks
              </span>

              <div className="flex items-center gap-[5px]">
                {/* VISA */}
                <span
                  className="
                    rounded-[4px]
                    border
                    border-[#dfe4ea]
                    bg-white
                    px-[6px]
                    py-[2px]
                    text-[9px]
                    font-bold
                    text-[#1647a5]
                  "
                >
                  VISA
                </span>

                {/* Mastercard */}
                <span
                  className="
                    rounded-[4px]
                    border
                    border-[#dfe4ea]
                    bg-white
                    px-[5px]
                    py-[2px]
                    text-[8px]
                    font-bold
                    text-[#df2e2e]
                    sm:text-[9px]
                  "
                >
                  Mastercard
                </span>

                {/* RuPay */}
                <span
                  className="
                    rounded-[4px]
                    border
                    border-[#dfe4ea]
                    bg-white
                    px-[6px]
                    py-[2px]
                    text-[9px]
                    font-bold
                    text-[#078a78]
                  "
                >
                  RuPay
                </span>

                {/* AMEX */}
                <span
                  className="
                    rounded-[4px]
                    border
                    border-[#dfe4ea]
                    bg-white
                    px-[6px]
                    py-[2px]
                    text-[9px]
                    font-bold
                    text-[#2563eb]
                  "
                >
                  AMEX
                </span>
              </div>
            </div>

            {/* =================================================
                NAME ON CARD
            ================================================== */}
            <div className="mb-[11px]">
              <label
                className="
                  mb-[5px]
                  block
                  font-roboto
                  text-[10px]
                  font-bold
                  tracking-wide
                  text-[#344054]
                  uppercase
                "
              >
                NAME ON CARD{" "}
                <span className="text-[#ef4444]">*</span>
              </label>

              <div className="relative">
                <Input
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className="
                    !h-[36px]
                    !rounded-[7px]
                    !border-[#d7dee7]
                    !px-[11px]
                    !font-roboto
                    !text-[12px]
                    hover:!border-[#9db5cf]
                    focus:!border-[#0751a5]
                  "
                />

                {nameOnCard && (
                  <CheckOutlined
                    className="
                      absolute
                      right-[11px]
                      top-1/2
                      -translate-y-1/2
                      !text-[13px]
                      !text-[#059669]
                    "
                  />
                )}
              </div>
            </div>

            {/* =================================================
                CARD NUMBER
            ================================================== */}
            <div className="mb-[11px]">
              <label
                className="
                  mb-[5px]
                  block
                  font-roboto
                  text-[10px]
                  font-bold
                  tracking-wide
                  text-[#344054]
                  uppercase
                "
              >
                CARD NUMBER{" "}
                <span className="text-[#ef4444]">*</span>
              </label>

              <div className="relative">
                <Input
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  inputMode="numeric"
                  className="
                    !h-[36px]
                    !rounded-[7px]
                    !border-[#d7dee7]
                    !px-[11px]
                    !pr-[35px]
                    !font-mono
                    !text-[12px]
                    !tracking-[1px]
                    hover:!border-[#9db5cf]
                    focus:!border-[#0751a5]
                  "
                />

                <LockOutlined
                  className="
                    absolute
                    right-[11px]
                    top-1/2
                    -translate-y-1/2
                    !text-[13px]
                    !text-[#98a2b3]
                  "
                />
              </div>
            </div>

            {/* =================================================
                EXPIRY + CVV
            ================================================== */}
            <div className="grid grid-cols-2 gap-[12px]">
              {/* EXPIRY */}
              <div>
                <label
                  className="
                    mb-[5px]
                    block
                    font-roboto
                    text-[10px]
                    font-bold
                    tracking-wide
                    text-[#344054]
                    uppercase
                  "
                >
                  EXPIRY DATE{" "}
                  <span className="text-[#ef4444]">*</span>
                </label>

                <Input
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  maxLength={7}
                  inputMode="numeric"
                  className="
                    !h-[36px]
                    !rounded-[7px]
                    !border-[#d7dee7]
                    !px-[11px]
                    !font-mono
                    !text-[12px]
                    hover:!border-[#9db5cf]
                    focus:!border-[#0751a5]
                  "
                />
              </div>

              {/* CVV */}
              <div>
                <div className="mb-[5px] flex items-center justify-between">
                  <label
                    className="
                      font-roboto
                      text-[10px]
                      font-bold
                      tracking-wide
                      text-[#344054]
                      uppercase
                    "
                  >
                    CVV / CVC{" "}
                    <span className="text-[#ef4444]">*</span>
                  </label>

                  <span
                    className="
                      text-[8px]
                      text-[#667085]
                      sm:text-[9px]
                    "
                  >
                    3 digits on back
                  </span>
                </div>

                <div className="relative">
                  <Input
                    value={cvv}
                    onChange={handleCvvChange}
                    maxLength={3}
                    inputMode="numeric"
                    type="password"
                    className="
                      !h-[36px]
                      !rounded-[7px]
                      !border-[#d7dee7]
                      !px-[11px]
                      !font-mono
                      !text-[12px]
                      hover:!border-[#9db5cf]
                      focus:!border-[#0751a5]
                    "
                  />

                  <LockOutlined
                    className="
                      absolute
                      right-[10px]
                      top-1/2
                      -translate-y-1/2
                      !text-[10px]
                      !text-[#98a2b3]
                    "
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                SAVE CARD
            ================================================== */}
            <div className="mt-[12px]">
              <Checkbox
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
              >
                <span className="font-roboto text-[10px] font-medium text-[#344054]">
                  Save card securely for faster checkout
                </span>
              </Checkbox>

              <p
                className="
                  ml-[24px]
                  mt-[1px]
                  font-roboto
                  text-[8px]
                  leading-[12px]
                  text-[#667085]
                "
              >
                Card tokenization is fully compliant with RBI & PCI-DSS
                regulations.
              </p>
            </div>

            {/* =================================================
                UPI QUICK PAYMENT
            ================================================== */}
            <div className="mt-[16px] border-t border-[#edf0f3] pt-[14px]">
              <div className="mb-[7px] flex items-center justify-between gap-2">
                <span
                  className="
                    font-roboto
                    text-[10px]
                    font-medium
                    text-[#344054]
                  "
                >
                  Or Pay Instantly with UPI
                </span>

                <span
                  className="
                    rounded-[5px]
                    bg-[#e6f9ef]
                    px-[7px]
                    py-[3px]
                    text-[8px]
                    font-semibold
                    text-[#059669]
                  "
                >
                  Fast & No Fees
                </span>
              </div>

              <div className="flex gap-[7px]">
                <Input
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="Enter UPI ID (e.g. mobile@upi)"
                  className="
                    !h-[36px]
                    !flex-1
                    !rounded-[7px]
                    !border-[#d7dee7]
                    !px-[10px]
                    !font-roboto
                    !text-[10px]
                  "
                />

                <button
                  type="button"
                  className="
                    h-[36px]
                    shrink-0
                    rounded-[7px]
                    border-0
                    bg-[#f1f3f6]
                    px-[13px]
                    font-roboto
                    text-[10px]
                    font-semibold
                    text-[#344054]
                    transition
                    hover:bg-[#e5e7eb]
                  "
                >
                  Verify & Pay
                </button>
              </div>
            </div>
          </>
        )}

        {/* =================================================
            UPI TAB
        ================================================== */}
        {selectedMethod === "upi" && (
          <div className="mt-[16px] border-t border-[#edf0f3] pt-[18px]">
            <div className="rounded-[10px] border border-[#e1e7ec] bg-[#fafbfc] p-4">
              <p className="mb-2 font-roboto text-[12px] font-semibold text-[#344054]">
                Pay using UPI
              </p>

              <div className="flex gap-2">
                <Input
                  placeholder="Enter UPI ID (e.g. mobile@upi)"
                  className="!h-[38px] !rounded-[7px] !text-[11px]"
                />

                <button
                  type="button"
                  className="
                    h-[38px]
                    shrink-0
                    rounded-[7px]
                    border-0
                    bg-[#0751a5]
                    px-4
                    text-[11px]
                    font-semibold
                    text-white
                  "
                >
                  Verify & Pay
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            NET BANKING TAB
        ================================================== */}
        {selectedMethod === "netbanking" && (
          <div className="mt-[16px] border-t border-[#edf0f3] pt-[18px]">
            <div className="rounded-[10px] border border-[#e1e7ec] bg-[#fafbfc] p-4">
              <p className="mb-3 font-roboto text-[12px] font-semibold text-[#344054]">
                Select your bank
              </p>

              <select
                className="
                  h-[38px]
                  w-full
                  rounded-[7px]
                  border
                  border-[#d7dee7]
                  bg-white
                  px-3
                  text-[11px]
                  text-[#344054]
                  outline-none
                "
              >
                <option value="">Select Bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
              </select>
            </div>
          </div>
        )}

        {/* =================================================
            WALLET TAB
        ================================================== */}
        {selectedMethod === "wallets" && (
          <div className="mt-[16px] border-t border-[#edf0f3] pt-[18px]">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {["Paytm", "Mobikwik", "Amazon Pay"].map((wallet) => (
                <button
                  key={wallet}
                  type="button"
                  className="
                    rounded-[8px]
                    border
                    border-[#dfe5ec]
                    bg-white
                    px-3
                    py-3
                    text-[11px]
                    font-semibold
                    text-[#344054]
                    hover:border-[#0751a5]
                  "
                >
                  {wallet}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}