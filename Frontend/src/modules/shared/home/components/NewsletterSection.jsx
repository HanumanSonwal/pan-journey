"use client";

import { MailOutlined } from "@ant-design/icons";

export default function NewsletterSection() {
  return (
    <section className="bg-[#dce9f0] px-4 py-14 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Content */}
          <div className="flex items-center gap-5">
            {/* Icon */}
            <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-md border border-[#222]">
              <MailOutlined className="text-[24px] text-[#222]!" />
            </div>

            {/* Heading */}
            <h2 className="leading-tight font-bold text-[#222] md:text-3xl">
              Join Our Weekly Newsletter
            </h2>
          </div>

          {/* Right Form */}
          <div className="text-balck! flex w-fit items-center gap-6 rounded-lg px-9 py-7">
            {/* Input */}
            <input
              type="email"
              placeholder="Write Email"
              className="w-[280px] border-0 border-b border-black bg-transparent px-10 py-2 text-base text-black! transition-colors outline-none placeholder:text-[#9B9B9B] focus:border-[#137C9C]"
            />
            {/* Button */}
            <button
              className="rounded-md border-0 px-6 py-3 text-[15px] font-medium whitespace-nowrap text-white"
              style={{
                background: "linear-gradient(to bottom, #63C0EC, #137C9C)",
              }}
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
