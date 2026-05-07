"use client";

import {
  BankOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const ViewHotelTobs = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-4">

      {/* ⭐ Rating */}
      <div className="btn flex items-center gap-3">
        <div className="rating">4.5</div>

        <div className="flex items-center gap-2">
          <span className="label">Very Good</span>
          <span className="link">All Reviews</span>
        </div>
      </div>

      {/* 🏨 Highlights */}
      <div className="btn flex items-center gap-2">
        <BankOutlined className="icon" />
        <span className="label">Property Highlights</span>
      </div>

      {/* 📍 Activities */}
      <div className="btn flex items-center gap-2">
        <EnvironmentOutlined className="icon" />
        <span className="label">
          Activities & Nearby Attraction
        </span>
      </div>

      {/* 🔥 GLOBAL STYLE (IMPORTANT) */}
      <style jsx global>{`
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;

          padding: 10px 18px;
          min-height: 44px;

          /* ✅ SABHI BUTTONS PE SAME BORDER */
          border: 2px solid #79b6d8;
          border-radius: 8px;

          /* ✅ DOUBLE BORDER EFFECT */
          box-shadow: inset 0 0 0 2px #d9edf7;

          background: #f4f9fc;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn:hover {
          border-color: #2a85c8;
          box-shadow: inset 0 0 0 2px #cbe7f6;
        }

        .rating {
          background: #6bb6d6;
          color: white;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 14px;
        }

        .icon {
          font-size: 18px;
          color: #2a85c8;
        }

        .label {
          font-weight: 500;
          color: #2b2b2b;
        }

        .link {
          color: #2a85c8;
          cursor: pointer;
        }

        .link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default ViewHotelTobs;