"use client";

export default function SearchButton({ onSearch }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 w-full flex justify-center
      top-[70%]        /* Default/Desktop */
      md:top-[380px]   /* 768px */
      lg:top-[380px]   /* 1024px */
      xl:top-[292px]   /* ~1440px */
      2xl:top-[260px]  /* ~2560px */
      "
    >
      <button
        onClick={onSearch}
        className="flex items-center justify-center text-white font-semibold shadow-lg transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] rounded-xl
        w-[400px] 
        md:w-[300px] 
        lg:w-[360px] 
        xl:w-[380px] 
        !2xl:w-[490px]

        h-16 
        md:h-14 
        lg:h-16 
        xl:h-[60px] 
        2xl:h-[70px]

        text-2xl 
        md:text-xl 
        lg:text-2xl 
        xl:text-2xl 
        2xl:text-2xl
        "
        style={{
          background: "linear-gradient(180deg, #72C0F0 0%, #0F6A75 100%)",
        }}
      >
        Search →
      </button>
    </div>
  );
}
