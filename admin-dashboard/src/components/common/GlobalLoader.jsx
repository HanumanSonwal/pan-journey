"use client";
import "./loader.css";

export default function GlobalLoader() {
  return (
    <div className="loader-wrapper">
      <div className="loader-container">
        <div className="spinner"></div>

        <p className="loader-text">Checking authentication...</p>
      </div>
    </div>
  );
}
