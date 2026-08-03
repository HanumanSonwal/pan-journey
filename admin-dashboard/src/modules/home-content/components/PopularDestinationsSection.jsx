"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Image } from "antd";

import { useTheme } from "@/context/ThemeContext";
import { HOME_CONTENT_SECTIONS } from "../constants/homeContent.constants";

export default function PopularDestinationsSection({ data = null, onEdit }) {
  const { isDark } = useTheme();

  const InfoRow = ({ label, value }) => (
    <div className="flex text-sm">
      <span
        className={`w-20 shrink-0 font-medium ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {label}
      </span>

      <span className={`mx-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
        :
      </span>

      <span className={`flex-1 ${isDark ? "text-white" : "text-gray-900"}`}>
        {value || "-"}
      </span>
    </div>
  );

  return (
    <Card
      className={`rounded-2xl border shadow-sm ${
        isDark ? "border-[#2f2f2f] bg-[#1b1b1b]" : "border-gray-200 bg-white"
      }`}
      styles={{
        body: {
          padding: 20,
        },
      }}
      title={
        <div className="flex items-center gap-3">
          <span
            className={`text-lg font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Popular Destinations
          </span>

          {data && (
            <span
              className={`rounded-full px-2 py-1 text-xs ${
                isDark
                  ? "bg-[#303030] text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {data.items?.length || 0} Destinations
            </span>
          )}
        </div>
      }
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() =>
            onEdit(HOME_CONTENT_SECTIONS.POPULAR_DESTINATIONS, data)
          }
        >
          {data ? "Edit" : "Create"}
        </Button>
      }
    >
      {!data ? (
        <Empty description="No Popular Destinations Found" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.items?.map((destination) => (
            <div
              key={destination._id || destination.cityId}
              className={`overflow-hidden rounded-xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
                isDark
                  ? "border-[#303030] bg-[#232323]"
                  : "border-gray-200 bg-white"
              }`}
            >
              {/* Image */}
              <Image
                preview
                src={destination.image}
                className="h-36 w-full object-cover"
              />

              {/* Content */}
              <div className="space-y-3 p-4">
                {/* Destination Name */}
                <h3
                  className={`line-clamp-2 text-sm font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {destination.name}
                </h3>

                <div
                  className={`border-t pt-3 ${
                    isDark ? "border-[#303030]" : "border-gray-200"
                  }`}
                >
                  <div className="space-y-2">
                    <InfoRow label="City" value={destination.city} />

                    <InfoRow label="City ID" value={destination.cityId} />

                    <InfoRow label="Alt" value={destination.alt} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
