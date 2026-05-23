"use client";

import {
  AppstoreOutlined,
  CarOutlined,
  CloudOutlined,
  CoffeeOutlined,
  HomeOutlined,
  RestOutlined,
  ShopOutlined,
  ThunderboltOutlined,
  WifiOutlined,
} from "@ant-design/icons";

const getAmenityIcon = (amenity = "") => {
  const name = amenity.toLowerCase();
  if (name.includes("wifi")) return <WifiOutlined />;
  if (name.includes("pool")) return <CloudOutlined />;
  if (name.includes("bar")) return <CoffeeOutlined />;
  if (name.includes("parking")) return <CarOutlined />;
  if (name.includes("power")) return <ThunderboltOutlined />;
  if (name.includes("room") || name.includes("lounge")) return <HomeOutlined />;
  if (name.includes("refrigerator")) return <ShopOutlined />;
  if (name.includes("smoking")) return <RestOutlined />;
  return <AppstoreOutlined />;
};

const Amenities = ({ amenities = [] }) => {
  return (
    <div className="rounded border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-gray-800">Amenities</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {amenities?.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded border border-gray-100 bg-gray-50 p-3"
          >
            {/* Dynamic Icon */}
            <div className="text-[18px] text-[#0ea5e9]">
              {getAmenityIcon(item)}
            </div>

            {/* Text */}
            <span className="text-sm font-medium text-gray-700">{item}</span>
          </div>
        ))}
      </div>

      {!amenities.length && (
        <div className="text-gray-500">No amenities available</div>
      )}
    </div>
  );
};

export default Amenities;
