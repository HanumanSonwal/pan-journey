import React, { useState } from "react";
import { Modal } from "antd";

const categories = [
  "All",
  "Room",
  "Outdoor",
  "Facade",
  "Washroom",
  "Reception",
  "Common Area",
  "Parking",
  "Views",
];

const images = [
  { url: "https://images.unsplash.com/photo-1566073771259", type: "Room" },
  { url: "https://images.unsplash.com/photo-1582719478250", type: "Outdoor" },
  { url: "https://images.unsplash.com/photo-1571896349842", type: "Facade" },
  { url: "https://images.unsplash.com/photo-1501117716987", type: "Room" },
  { url: "https://images.unsplash.com/photo-1521783593447", type: "Reception" },
];

const ViewHotelModal = ({ open, onClose }) => {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? images
      : images.filter((img) => img.type === active);

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={900}>

      {/* Categories */}
      <div className="flex gap-3 mb-4 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-3 py-1 border rounded-full ${
              active === cat ? "bg-blue-500 text-white" : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Images */}
      <div className="grid grid-cols-3 gap-3">
        {filtered.map((img, i) => (
          <img
            key={i}
            src={img.url}
            className="h-[150px] w-full object-cover rounded-lg"
          />
        ))}
      </div>

    </Modal>
  );
};

export default ViewHotelModal;