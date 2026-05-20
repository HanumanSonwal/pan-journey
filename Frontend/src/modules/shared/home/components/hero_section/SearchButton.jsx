"use client";

export default function SearchButton({ onSearch }) {
  return (
    <div className="/* Default/Desktop */ /* 768px */ /* 1024px */ /* ~1440px */ /* ~2560px */ absolute top-[70%] left-1/2 flex w-full -translate-x-1/2 justify-center md:top-[410px] lg:top-[400px] xl:top-[300px] 2xl:top-[299px]">
      <button
        onClick={onSearch}
        className="!2xl:w-[490px] flex h-16 w-[400px] items-center justify-center rounded-xl text-2xl font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] md:h-14 md:w-[300px] md:text-xl lg:h-16 lg:w-[360px] lg:text-2xl xl:h-[60px] xl:w-[380px] xl:text-2xl 2xl:h-[70px] 2xl:text-2xl"
        style={{
          background: "linear-gradient(180deg, #72C0F0 0%, #0F6A75 100%)",
        }}
      >
        Search →
      </button>
    </div>
  );
}
