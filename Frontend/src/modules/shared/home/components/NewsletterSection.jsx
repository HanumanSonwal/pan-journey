"use client";

import { MailOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubscribe = () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <section className="bg-[#dce9f0] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* Left Content */}
          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#222] sm:h-14 sm:w-14">
              <MailOutlined className="text-2xl text-[#222]" />
            </div>

            <h2 className="text-xl font-bold leading-tight text-[#222] sm:text-2xl lg:text-3xl">
              Join Our Weekly Newsletter
            </h2>

          </div>

          {/* Right Content */}
          <div className="w-full lg:max-w-[620px]">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Write Email"
               className={`flex-1 w-full border-0 border-b bg-transparent py-3 text-[15px] outline-none transition-all placeholder:text-[#8b8b8b] ${error
                    ? "border-red-500"
                    : "border-black focus:border-[#137C9C]"
                  }`}
              />

              <button
                onClick={handleSubscribe}
               className="w-[150px] sm:w-auto sm:min-w-[180px] rounded-md px-5 py-3 text-[15px] font-medium !text-white transition-all hover:opacity-90 flex items-center justify-center self-start"
                style={{
                  background:
                    "linear-gradient(to bottom, #63C0EC, #137C9C)",
                }}
              >
                Subscribe Now
              </button>

            </div>

            {error && (
              <p className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
