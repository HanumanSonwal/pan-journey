"use client";

import RHFInput from "@/components/ui/RHFinputs/RHFInput";
import RHFTextarea from "@/components/ui/RHFinputs/RHFTextarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import RHFSelect from "@/components/ui/RHFinputs/RHFSelect";
import { contactSchema } from "./schema/contactSchema";

export default function ContactFormSection() {
  const methods = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onSubmit",
    defaultValues: {
      category: "",
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const supportCategories = [
    { label: "Booking Issue", value: "booking" },
    { label: "Refund Request", value: "refund" },
    { label: "Payment Issue", value: "payment" },
    { label: "Hotel Complaint", value: "complaint" },
    { label: "Partnership / Business", value: "business" },
    { label: "General Query", value: "general" },
  ];

  const onSubmit = (data) => {
    console.log("Contact Form Data:", data);

    // Future API Call
    // await createContactInquiry(data);

    methods.reset();
  };

  return (
    <section className="bg-[#eef5fa] py-10 lg:py-10">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 min-[901px]:grid-cols-2 min-[901px]:gap-20">
          {/* Left Content */}
          <div>
            <h2 className="mb-5 text-[22px] leading-[1.2] font-bold text-black sm:text-[24px] md:text-[28px] lg:text-[32px]">
              We're Always Here To
              <br />
              Help You
            </h2>

            <p className="mb-8 max-w-[650px] text-[15px] leading-[1.8] text-[#4B5563]">
              Our dedicated support team is available to assist you with hotel
              bookings, payment issues, cancellations, refunds, and
              travel-related inquiries. We strive to provide quick, reliable,
              and hassle-free assistance whenever you need it.
            </p>

            {/* Quick Stats */}
            <div className="mb-7 grid grid-cols-2 gap-5 ">
              <div className="rounded-lg border border-[#d7e8ee] bg-[#f8fcfd] p-3 p-3 pt-1 !pb-0">
                <p className="text-[20px] font-bold text-[#0f6b78] !mb-2">24/7</p>
                <p className="text-[13px] text-gray-600">Support Available</p>
              </div>

              <div className="rounded-lg border border-[#d7e8ee] bg-[#f8fcfd] p-3 pt-1 !pb-0">
                <p className="text-[20px] font-bold text-[#0f6b78] !mb-2">&lt; 24h</p>
                <p className="text-[13px] text-gray-600">Average Response</p>
              </div>
            </div>
            {/* Business Hours */}
            <h3 className="mb-6 text-[28px] font-semibold text-[#0f6b78] md:text-[32px]">
              Business Hours
            </h3>

            <div className="space-y-5">
              <div className="flex justify-between border-b border-gray-300 pb-3">
                <span>Monday - Sunday</span>
                <span className="font-semibold">10 AM - 6 PM</span>
              </div>

              <div className="flex justify-between border-b border-gray-300 pb-3">
                <span>Online Support</span>
                <span className="font-semibold">24 Hours</span>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="mt-10 rounded-xl border border-[#d7e8ee] bg-white p-5 shadow-sm">
              <h4 className="mb-3 text-lg font-semibold text-[#0f6b78]">
                Customer Support Commitment
              </h4>

              <p className="text-sm leading-relaxed text-gray-600">
                We strive to respond to all customer inquiries as quickly as
                possible and provide reliable assistance for bookings, payments,
                cancellations, and refunds.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="rounded-lg bg-white p-5 shadow-[0_8px_40px_rgba(0,0,0,0.12)] sm:p-4 md:p-5 lg:p-7">
            <div className="mb-8">
              <h3 className="text-[24px] font-bold text-black sm:text-[28px] md:text-[32px]">
                How Can We Help You?
              </h3>

              <p className="mt-2 text-[14px] leading-relaxed text-gray-500 md:text-[15px]">
                Select your query category and share the details below. Our
                support team will get back to you as soon as possible.
              </p>
            </div>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <RHFInput
                    name="fullName"
                    label="Full Name"
                    placeholder=" "
                  />

                  <RHFInput
                    name="email"
                    label="Email"
                    type="email"
                    placeholder=" "
                  />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <RHFSelect
                    name="category"
                    label="Support Category"
                    options={supportCategories}
                  />

                  <RHFInput
                    name="subject"
                    label="Subject"
                    placeholder=" "
                  />
                </div>

                {/* Message */}
                <RHFTextarea
                  name="message"
                  label="Message"
                  rows={5}
                  placeholder=" "
                />

                {/* Button */}
                <button
                  type="submit"
                  disabled={methods.formState.isSubmitting}
                  className="w-full rounded-lg bg-gradient-to-b from-[#67b5e2] to-[#006c7a] px-8 py-3.5 font-medium text-white! transition-all duration-300 hover:-translate-y-[1px] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {methods.formState.isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
}
