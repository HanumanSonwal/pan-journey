"use client";

import { ArrowUpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 250);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        aria-label="Scroll To Top"
        className={`fixed right-6 bottom-20 md:bottom-12 z-[9999]
        h-[42px] w-[42px]
        rounded-full
        transition-all duration-500
        ${show
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-20 opacity-0 scale-75 pointer-events-none"
          }`}
      >
        {/* Animated Ring */}
        <span
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            animationDuration: "4s",
            background:
              "conic-gradient(from 0deg,#9FE8F5,#6FAED0,#2E8E99,#1F6F78,#6FAED0,#9FE8F5)",
          }}
        />

        {/* Main Button */}
        <span
          className="absolute inset-[4px] rounded-full bg-gradient-to-b from-[#6FAED0] to-[#1F6F78] flex items-center justify-center shadow-[0_15px_35px_rgba(0,0,0,.35)] overflow-hidden"
        >
          {/* Gloss */}
          <span
            className="absolute top-1 left-1/2 -translate-x-1/2
            h-6 w-10 rounded-full
            bg-white/35 blur-sm"
          />

          {/* Arrow */}
          <ArrowUpOutlined
            className="relative z-10 text-[24px] !text-white drop-shadow-lg"
          />
        </span>

        {/* Outer Glow */}
        <span
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            boxShadow:
              "0 0 20px rgba(111,174,208,.45),0 0 40px rgba(31,111,120,.35)",
          }}
        />
      </button>
    </>
  );
};

export default ScrollToTopButton;