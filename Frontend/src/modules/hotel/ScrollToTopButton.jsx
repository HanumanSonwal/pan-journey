"use client";

import { UpOutlined } from "@ant-design/icons";
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
        className={`fixed right-6 bottom-20 z-[99] h-[42px] w-[42px] rounded-full transition-all duration-500 md:bottom-12 ${show
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-20 scale-75 opacity-0"
          }`}
      >
        {/* Animated Ring */}
        <span
          className="absolute inset-0 animate-spin rounded-full most-boder-colour "
          style={{
            animationDuration: "4s",
          }}
        />

        {/* Main Button */}
        <span className="absolute inset-[4px] flex items-center justify-center overflow-hidden rounded-full ">
          {/* Gloss */}
          <span className="absolute left-1/2 top-1 h-6 w-10 -translate-x-1/2 rounded-full " />

          {/* Arrow */}
          <UpOutlined className="relative z-10 text-[24px] most-text-color drop-shadow-lg" />
        </span>

        {/* Outer Glow */}
        <span
          className="absolute inset-0 animate-pulse rounded-full"

        />
      </button>
    </>
  );
};

export default ScrollToTopButton;
