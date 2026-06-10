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
      width={1100}
      centered
      destroyOnHidden
      styles={{
        body: {
          padding: 24,
          maxHeight: "85vh",
          overflowY: "auto",
          background: "#f5f5f5",
        },
      }}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="pb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-semibold text-[#333]">
              Photos By Customers
            </h2>

            <span className="text-sm text-gray-500">
              {filteredImages.length} Photos
            </span>
          </div>
        </div>

        {/* Sticky Tabs */}
        <div className="sticky -top-6 z-20 -mx-6 border-b bg-white px-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`whitespace-nowrap border-b-2 px-8 py-4 text-[15px] font-semibold transition-all ${active === cat
                  ? "border-[#64b5f6] text-[#64b5f6]"
                  : "border-transparent text-[#222]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photos Section */}
        <div className="rounded-md bg-[#efefef] p-4">
          <h3 className="mb-5 text-[18px] font-semibold text-[#333]">
            {active === "All" ? "All Photos" : active}
          </h3>

          <Image.PreviewGroup>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {filteredImages?.map((img, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-xl"
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
                    className="!block !w-full overflow-hidden rounded-xl"
                    style={{
                      width: 200,
                      height: 310,
                      objectFit: "cover",
                      display: "block",
                      borderRadius: 12,
                    }}
                  />
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
      </div>
    </Modal>
  );
};

export default ViewHotelModal;
