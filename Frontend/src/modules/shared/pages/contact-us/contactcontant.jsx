"use client";

import RHFInput from "@/components/ui/RHFinputs/RHFInput";
import { FormProvider, useForm } from "react-hook-form";

export default function ContactFormSection() {
  const methods = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form Submitted!");
  };

  return (
    <section className="bg-[#eef5fa] py-21 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">

          {/* Left Content */}
          <div>
            <h2 className="text-[22px] sm:text-[24px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-bold text-black leading-[1.2] mb-6">
              We’re Always Here To
              <br />
              Help You
            </h2>

            <p className="text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-black leading-[1.8] max-w-[700px] mb-12 lg:mb-20">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>

            <h3 className="text-[28px] md:text-[32px] lg:text-[40px] font-semibold text-[#0f6b78] mb-8 lg:mb-10">
              Business Hours
            </h3>

            <div className="space-y-6 lg:space-y-10">
              <div className="border-b border-gray-300 pb-3 flex justify-between">
                <span>Monday - Sunday</span>
                <span className="font-semibold">10 AM - 6 PM</span>
              </div>

              <div className="border-b border-gray-300 pb-3 flex justify-between">
                <span>Online</span>
                <span className="font-semibold">24 Hrs.</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-5 sm:p-6 md:p-8 lg:p-10">
            <h3 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold text-black mb-5 md:mb-8">
              Fill this form
            </h3>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Full Name */}
                <div className="relative">
                  <RHFInput
                    name="fullName"
                    label="Full Name"
                    type="text"
                    placeholder=" "
                    className="peer w-full h-[52px] border border-gray-300 rounded-md px-4 pt-4 outline-none focus:border-[#0f6b78]"
                  />
                </div>


                {/* Email */}
                <div className="relative">
  <RHFInput
    name="email"
    label="Email"
    type="email"
    placeholder=" "
    className="peer w-full h-[52px] border border-gray-300 rounded-md px-4 pt-4 outline-none focus:border-[#0f6b78]"
  />
</div>
               

                {/* Subject */}
                <div className="relative">
  <RHFInput
    name="subject"
    label="Subject"
    type="text"
    placeholder=" "
    className="peer w-full h-[52px] border border-gray-300 rounded-md px-4 pt-4 outline-none focus:border-[#0f6b78]"
  />
</div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder=" "
                    className="peer w-full border border-gray-300 rounded-md p-4 outline-none resize-none focus:border-[#0f6b78]"
                  />

                  <label
                    className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500
                    peer-placeholder-shown:top-4
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-400
                    peer-focus:-top-2
                    peer-focus:text-sm
                    peer-focus:text-[#0f6b78]"
                  >
                    Message
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-md text-white text-[16px] bg-gradient-to-b from-[#67b5e2] to-[#006c7a]"
                >
                  Submit
                </button>

              </form>
            </FormProvider>
          </div>

        </div>
      </div>
    </section>
  );
}