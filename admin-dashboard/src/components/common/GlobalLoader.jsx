"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./loader.css";

export default function GlobalLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="spinner">
          <div className="spinner-inner"></div>
        </div>

        <p className="loader-text">Checking authentication...</p>
      </div>
    </div>,
    document.body,
  );
}
