"use client";

import { Image, Modal } from "antd";
import { useMemo, useState } from "react";

const ViewHotelModal = ({ open, onClose, images = [] }) => {
  const [active, setActive] = useState("All");

  const categories = useMemo(() => {
    const unique = [
      ...new Set(images?.map((img) => img?.ImageDesc)?.filter(Boolean)),
    ];
    return ["All", ...unique];
  }, [images]);

  const filteredImages =
    active === "All"
      ? images
      : images.filter((img) => img?.ImageDesc === active);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1200}
      centered
      destroyOnHidden
      styles={{
        body: {
          padding: 24,
          maxHeight: "85vh",
          overflowY: "auto",
        },
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-800">Hotel Photos</h2>
          <span className="text-sm text-gray-500">
            {filteredImages.length} Photos
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
                active === cat
                  ? "border-[#0ea5e9] bg-[#0ea5e9] text-white"
                  : "border-gray-300 bg-white text-gray-600 hover:border-[#0ea5e9]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <Image.PreviewGroup>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredImages?.map((img, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition hover:shadow-lg"
              >
                <Image
                  src={img?.ImageURL}
                  alt={img?.ImageDesc || "hotel"}
                  preview={{
                    cover: (
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-base font-semibold">
                          View Photo
                        </span>
                        <span className="text-xs opacity-80">
                          Click to Preview
                        </span>
                      </div>
                    ),
                  }}
                  className="!w-full overflow-hidden rounded-2xl transition duration-300 group-hover:scale-[1.02]"
                  style={{
                    width: "100%",
                    height: 320,
                    objectFit: "cover",
                    borderRadius: 18,
                    display: "block",
                  }}
                />

                <div className="px-1 pt-3">
                  <p className="truncate text-sm font-medium text-gray-700">
                    {img?.ImageDesc || "Hotel Photo"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Image.PreviewGroup>

        {!filteredImages.length && (
          <div className="rounded-xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
            No photos available
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ViewHotelModal;
