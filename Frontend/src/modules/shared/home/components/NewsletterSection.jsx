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
    <section className="bg-[#dce9f0] px-4 py-12! md:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Content */}
          <div className="flex items-center gap-5">
            <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-md border border-[#222]">
              <MailOutlined className="text-[24px] text-[#222]!" />
            </div>

            <h2 className="leading-tight font-bold text-[#222] md:text-3xl">
              Join Our Weekly Newsletter
            </h2>
          </div>

          {/* Right Form */}
          <div className="flex flex-col">
            <div className="text-balck! flex w-fit items-center gap-6 rounded-lg px-9 py-7">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Write Email"
                className={`w-[280px] border-0 border-b bg-transparent py-2 text-base text-black! transition-colors outline-none placeholder:text-[#9B9B9B] ${
                  error
                    ? "border-red-500"
                    : "border-black focus:border-[#137C9C]"
                }`}
              />

              <button
                onClick={handleSubscribe}
                className="rounded-md border-0 px-6 py-3 text-[15px] font-medium whitespace-nowrap text-white!"
                style={{
                  background: "linear-gradient(to bottom, #63C0EC, #137C9C)",
                }}
              >
                Subscribe Now
              </button>
            </div>

            {error && <p className="px-9 text-sm text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
