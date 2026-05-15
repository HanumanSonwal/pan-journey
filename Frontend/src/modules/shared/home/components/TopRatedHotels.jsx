"use client";

import { Card, Rate, Spin } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";

import { useDestinations } from "@/modules/shared/home/hooks/useDestinations";

export default function TopRatedHotels() {
  const { data = [], isLoading } = useDestinations("Toprated");

  const [perRow, setPerRow] = useState(4);
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [isDraggingTop, setIsDraggingTop] = useState(false);
  const [isDraggingBottom, setIsDraggingBottom] = useState(false);
  const topStartX = useRef(0);
  const bottomStartX = useRef(0);

  useEffect(() => {
    const updatePerRow = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setPerRow(1);
      } else if (width < 1024) {
        setPerRow(2);
      } else {
        setPerRow(4);
      }
    };
    updatePerRow();
    window.addEventListener("resize", updatePerRow);
    return () => window.removeEventListener("resize", updatePerRow);
  }, []);

  const topData = useMemo(() => data.slice(0, 10), [data]);
  const bottomData = useMemo(() => data.slice(10, 20), [data]);

  useEffect(() => {
    if (topData.length <= perRow || isDraggingTop) return;
    const interval = setInterval(() => {
      setTopIndex((prev) => {
        if (prev >= topData.length - perRow) {
          return 0;
        }
        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [topData, perRow, isDraggingTop]);

  useEffect(() => {
    if (bottomData.length <= perRow || isDraggingBottom) return;

    const interval = setInterval(() => {
      setBottomIndex((prev) => {
        if (prev <= 0) {
          return bottomData.length - perRow;
        }

        return prev - 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [bottomData, perRow, isDraggingBottom]);

  const handleDrag = (startX, endX, type) => {
    const diff = startX - endX;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      if (type === "top") {
        setTopIndex((prev) => Math.min(prev + 1, topData.length - perRow));
      } else {
        setBottomIndex((prev) =>
          Math.min(prev + 1, bottomData.length - perRow),
        );
      }
    } else {
      if (type === "top") {
        setTopIndex((prev) => Math.max(prev - 1, 0));
      } else {
        setBottomIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[500px] items-center justify-center bg-[#EDF7FF]">
        <Spin size="large" />
      </div>
    );
  }

  const renderCard = (hotel) => (
    <div key={hotel.id} className="w-full flex-shrink-0 px-2 sm:w-1/2 lg:w-1/4">
      <Card
        hoverable
        className="overflow-hidden rounded-xl shadow-md"
        cover={
          <img
            src={hotel.image}
            alt={hotel.name}
            className="block h-[220px] w-full object-cover md:h-[240px]"
            draggable={false}
          />
        }
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold">{hotel.name}</h3>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
            {hotel.desc}
          </p>

          <div className="mt-3">
            <Rate disabled allowHalf defaultValue={hotel.rating} />
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="!mt-[-10px] bg-[#EDF7FF] px-4 py-8 md:px-4 md:py-12">
      {/* MAIN */}
      <div className="mx-auto w-full rounded-3xl bg-gradient-to-br from-sky-400 to-teal-700 px-4 py-10 md:px-8 md:py-14 lg:w-[85.87%]">
        {/* HEADING */}
        <div className="mb-8 text-center text-white md:mb-10">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            Top Rated Hotels
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 opacity-90 sm:text-base lg:text-lg">
            We’re committed to offering more than just products we provide
            exceptional experiences.
          </p>
        </div>

        {/* TOP ROW */}
        <div
          className="relative cursor-grab overflow-hidden active:cursor-grabbing"
          onMouseDown={(e) => {
            setIsDraggingTop(true);

            topStartX.current = e.clientX;
          }}
          onMouseUp={(e) => {
            handleDrag(topStartX.current, e.clientX, "top");

            setIsDraggingTop(false);
          }}
          onMouseLeave={() => setIsDraggingTop(false)}
          onTouchStart={(e) => {
            setIsDraggingTop(true);

            topStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            handleDrag(topStartX.current, e.changedTouches[0].clientX, "top");

            setIsDraggingTop(false);
          }}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${topIndex * (100 / perRow)}%)`,
            }}
          >
            {topData.map(renderCard)}
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div
          className="relative mt-6 cursor-grab overflow-hidden active:cursor-grabbing md:mt-10"
          onMouseDown={(e) => {
            setIsDraggingBottom(true);

            bottomStartX.current = e.clientX;
          }}
          onMouseUp={(e) => {
            handleDrag(bottomStartX.current, e.clientX, "bottom");

            setIsDraggingBottom(false);
          }}
          onMouseLeave={() => setIsDraggingBottom(false)}
          onTouchStart={(e) => {
            setIsDraggingBottom(true);

            bottomStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            handleDrag(
              bottomStartX.current,
              e.changedTouches[0].clientX,
              "bottom",
            );

            setIsDraggingBottom(false);
          }}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${bottomIndex * (100 / perRow)}%)`,
            }}
          >
            {bottomData.map(renderCard)}
          </div>
        </div>
      </div>
    </div>
  );
}
