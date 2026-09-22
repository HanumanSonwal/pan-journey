"use client";
import { StarFilled } from "@ant-design/icons";
import { Card, Typography } from "antd";
import Image from "next/image";
const { Title, Text } = Typography;
export default function BookingHeaderCard({ bookingData }) {
  const hotelName = bookingData?.name || "Hotel";
  const location = bookingData?.location || {};
  const address = location?.address || "";
  const fullLocation = [location?.city, location?.state, location?.country]
    .filter(Boolean)
    .join(", ");
  const hotelImage = bookingData?.image || "/no-room.jpg";
  const rating = Math.min(
    Math.max(Number(bookingData?.starCategory || 0), 0),
    5,
  );
  const room = bookingData?.rooms?.[0] || bookingData?.selectedRoom || {};
  const roomName = room?.roomType || room?.GroupName || "Selected Room";
  return (
    <Card
      className="!mb-3 !overflow-hidden !rounded-xl !border !border-gray-200 !bg-white !shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
      styles={{ body: { padding: 0 } }}
    >
      <div className="flex gap-3 p-5 lg:hidden">
        <div className="relative h-[96px] w-[105px] shrink-0 overflow-hidden rounded-lg sm:h-[115px] sm:w-[125px]">
          <Image
            src={hotelImage}
            alt={hotelName}
            fill
            sizes="125px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1 py-[1px]">
          <div className="flex items-start justify-between gap-2">
            <Title
              level={5}
              className="!mb-1.5 !truncate !text-[15px] !leading-[20px] !font-semibold !text-[#172033]"
            >
              {hotelName}
            </Title>
          </div>
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            {rating > 0 && (
              <div className="flex items-center gap-[2px]">
                {[1, 2, 3, 4, 5].map((item) => (
                  <StarFilled
                    key={item}
                    className={`!text-[10px] ${item <= rating ? "!text-[#F5A623]" : "!text-[#D9DEE7]"}`}
                  />
                ))}
              </div>
            )}
            <span className="h-3 w-px bg-gray-200" />
            <span className="rounded-full bg-gray-100 px-2 py-[2px] text-[10px] font-medium text-gray-600">
              Selected
            </span>
            <span className="rounded-full bg-emerald-50 px-2 py-[2px] text-[10px] font-medium text-emerald-600">
              Confirming
            </span>
          </div>
          {address && (
            <Text className="!block !truncate !text-[11px] !leading-[17px] !text-gray-500">
              {address}
            </Text>
          )}
          {fullLocation && (
            <Text className="!block !truncate !text-[11px] !leading-[17px] !text-gray-400">
              {fullLocation}
            </Text>
          )}
          <div className="mt-2.5">
            <span className="inline-block max-w-full truncate rounded-md bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-600">
              {roomName}
            </span>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="relative h-[165px] w-full overflow-hidden">
          <Image
            src={hotelImage}
            alt={hotelName}
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="px-4 py-4">
          <Title
            level={4}
            className="!mb-2.5 !text-[18px] !leading-[24px] !font-semibold !text-[#172033]"
          >
            {hotelName}
          </Title>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {rating > 0 && (
              <div className="flex items-center gap-[3px]">
                {[1, 2, 3, 4, 5].map((item) => (
                  <StarFilled
                    key={item}
                    className={`!text-[12px] ${item <= rating ? "!text-[#F5A623]" : "!text-[#D9DEE7]"}`}
                  />
                ))}
              </div>
            )}
            <span className="h-3.5 w-px bg-gray-200" />
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-600">
              Selected
            </span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-600">
              Confirming
            </span>
          </div>
          <div className="space-y-0.5">
            {address && (
              <Text className="!block !text-[12px] !leading-[18px] !text-gray-600">
                {address}
              </Text>
            )}
            {fullLocation && (
              <Text className="!block !text-[11px] !leading-[17px] !text-gray-400">
                {fullLocation}
              </Text>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
            <span className="shrink-0 text-[11px] font-medium text-gray-400">
              Room
            </span>
            <span className="truncate text-right text-[12px] font-medium text-[#172033]">
              {roomName}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
