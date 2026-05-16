"use client";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useDestinations } from "@/modules/shared/home/hooks/useDestinations";
import { useLoader } from "@/providers/LoaderProvider";
import { VacationsimageMap } from "../data/VacationsData";

export default function VacationType({ activeTab }) {
  const [index, setIndex] = useState(0);
  const [perPage, setPerPage] = useState(4);

  // API DATA
  const { data = [], isLoading } = useDestinations(activeTab);

  // GLOBAL LOADER
  const { setLoading } = useLoader();

  // 🔥 CONNECT API LOADER TO GLOBAL LOADER
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  // RESPONSIVE
  useEffect(() => {
    const updatePerPage = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setPerPage(1);
      } else if (width < 1024) {
        setPerPage(2);
      } else {
        setPerPage(4);
      }
    };

    updatePerPage();
    window.addEventListener("resize", updatePerPage);

    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  // RESET SLIDER ON TAB CHANGE
  useEffect(() => {
    setIndex(0);
  }, [activeTab]);

  // NEXT
  const next = () => {
    if (index + perPage < data.length) {
      setIndex((prev) => prev + perPage);
    }
  };

  // PREV
  const prev = () => {
    if (index > 0) {
      setIndex((prev) => prev - perPage);
    }
  };

  // ONLY VISIBLE ITEMS
  const visibleData = data.slice(index, index + perPage);

  // LOADING
  if (isLoading) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="px-2 py-2">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* PREV BUTTON */}
        <button
          onClick={prev}
          disabled={index === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-xl shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <LeftOutlined />
        </button>

        {/* CARDS */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visibleData.map((item, idx) => {
              const image =
                VacationsimageMap?.[activeTab]?.[
                  (index + idx) % VacationsimageMap?.[activeTab]?.length
                ];

              return (
                <div
                  key={item.id || idx}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* IMAGE */}
                  <div className="relative h-[290px] overflow-hidden">
                    <Image
                      src={image}
                      alt={item.name}
                      fill
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                      quality={85}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="bg-[#F5F5F5] px-4 py-5 text-center">
                    <h2 className="mb-2 text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>

                    <p className="mb-3 text-sm text-gray-600">
                      {item.City}
                    </p>

                    <button className="flex w-full items-center justify-center gap-1 text-sm font-medium text-[#5FA8C9] transition hover:text-[#3D8FB3]">
                      View Details →
                    </button>

                    <div className="mx-auto mt-2 w-20 border-b border-dotted border-[#5FA8C9]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* NEXT BUTTON */}
        <button
          onClick={next}
          disabled={index + perPage >= data.length}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-xl shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
}
