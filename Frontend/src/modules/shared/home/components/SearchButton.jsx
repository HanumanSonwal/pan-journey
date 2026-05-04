"use client";

import { Button } from "antd";




export function SearchButton() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[72%] translate-y-1/2 ">
      <button className="bg-gradient-to-r from-[#6FAED0] via-[#4A9BB5] to-[#1F6F78] text-white px-12 py-4 rounded-xl text-base font-semibold shadow-lg hover:opacity-90 w-[400px] h-17 flex items-center justify-center !text-2xl">
        Search →
      </button>
    </div>
  );
}
  
export default function HeroSearchButtons(){
   return (
   <Button
            type="primary"
            size="large"
            className="!bg-white !text-blue-500 !border-none !font-medium"
          >
            Start Booking Now →
          </Button>
   );

}