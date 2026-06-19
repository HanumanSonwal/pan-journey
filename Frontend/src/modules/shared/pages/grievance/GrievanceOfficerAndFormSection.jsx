"use client";

import RHFInput from "@/components/ui/RHFinputs/RHFInput";
import RHFSelect from "@/components/ui/RHFinputs/RHFSelect";
import RHFTextarea from "@/components/ui/RHFinputs/RHFTextarea";
import { FormProvider, useForm } from "react-hook-form";

const grievanceCategories = [
  { label: "Refund Issue", value: "refund" },
  { label: "Booking Issue", value: "booking" },
  { label: "Payment Dispute", value: "payment" },
  { label: "Hotel Complaint", value: "hotel" },
  { label: "Customer Service Complaint", value: "service" },
  { label: "Other", value: "other" },
];

export default function GrievanceOfficerAndFormSection() {
  const methods = useForm({
    // resolver: zodResolver(() => ({})), // schema later
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      bookingRefNo: "",
      supportTicketId: "",
      category: "",
      subject: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Grievance Form Data:", data);
  };

  return (
    <section className="bg-[#eef5fa] py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div className="rounded bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:p-8">
            <div className="mb-6">
              <span className="rounded-full bg-[#eef5fa] px-3 py-1 text-xs font-medium text-[#0f6b78]">
                Customer Protection
              </span>
            </div>

            <h2 className="mb-3 text-[28px] font-bold text-[#0f6b78]">
              Grievance Officer
            </h2>

            <p className="mb-6 text-[15px] leading-relaxed text-gray-600">
              If your issue has not been resolved through our customer support
              team, you may escalate it to our Grievance Officer for an
              independent review.
            </p>

            <div className="mb-3! grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-[#eef5fa] p-3">
                <p className="text-xs text-gray-500">Review Time</p>
                <p className="mt-1 text-xl font-bold text-[#0f6b78]">
                  48 Hours
                </p>
              </div>

              <div className="rounded-xl bg-[#eef5fa] p-3">
                <p className="text-xs text-gray-500">Resolution</p>
                <p className="mt-1 text-xl font-bold text-[#0f6b78]">7 Days</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
              <div className="rounded-lg bg-[#eef5fa] p-4">
                <p className="text-xs font-medium text-[#0f6b78]">
                  Grievance Email
                </p>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  grievance@panjourney.com
                </p>
              </div>

              <div className="rounded-lg bg-[#eef5fa] p-4">
                <p className="text-xs font-medium text-[#0f6b78]">
                  Contact Number
                </p>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  +91 XXXXX XXXXX
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-[#dcecf1] bg-[#f8fcfd] p-4">
              <p className="font-medium text-[#0f6b78]">
                Before Raising A Grievance
              </p>

              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>✓ Contact customer support first</li>
                <li>✓ Keep booking reference ready</li>
                <li>✓ Mention previous ticket number</li>
                <li>✓ Provide complete issue details</li>
                <li>✓ Attach supporting evidence if available</li>
              </ul>
            </div>
            <div className="mt-4 rounded-xl border border-[#f7d9b5] bg-[#fff8ef] p-4">
              <h4 className="mb-2 font-semibold text-[#b76e00]">
                Important Notice
              </h4>

              <p className="text-sm leading-relaxed text-gray-700">
                Please raise a grievance only after contacting our support team
                and allowing reasonable time for resolution. Grievances are
                intended for unresolved or escalated matters.
              </p>
            </div>
          </div>

          <div className="rounded bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:p-8">
            <h3 className="mb-2 text-[28px] font-bold text-black">
              Submit Your Grievance
            </h3>

            <p className="mb-8 text-sm text-gray-500">
              Share complete details regarding your concern. Our grievance team
              will review your request and provide updates throughout the
              resolution process.
            </p>

            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <RHFInput name="fullName" label="Full Name" placeholder=" " />

                  <RHFInput
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder=" "
                  />

                  <RHFInput name="phone" label="Phone Number" placeholder=" " />

                  <RHFSelect
                    name="category"
                    label="Issue Category"
                    options={grievanceCategories}
                  />

                  <RHFInput
                    name="bookingRefNo"
                    label="Booking Reference Number"
                    placeholder=" "
                  />

                  <RHFInput
                    name="supportTicketId"
                    label="Support Ticket ID"
                    placeholder=" "
                  />
                </div>

                <RHFInput name="subject" label="Subject" placeholder=" " />

                <RHFTextarea
                  name="description"
                  label="Detailed Description"
                  rows={5}
                  placeholder=" "
                />

                <div className="rounded-lg bg-[#eef5fa] p-4">
                  <p className="text-xs leading-relaxed text-gray-600">
                    Please provide accurate information and include any previous
                    support ticket details to help us review your grievance
                    faster.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-b from-[#67b5e2] to-[#006c7a] px-8 py-3.5 font-medium text-white! transition-all duration-300 hover:shadow-lg"
                >
                  Submit Grievance
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
}
