"use client";

export default function SearchButton({ onSearch }) {
  return (
    <div className="absolute top-[87%] left-1/2 flex w-full -translate-x-1/2 justify-center md:top-[380px] lg:top-[410px] xl:top-[330px] 2xl:top-[325px]">
      <button
        onClick={onSearch}
        className="!sm:text-[20px] ! !lg:text-2xl !xl:text-2xl !2xl:text-2xl flex h-[52px] w-[90%] max-w-[320px] items-center justify-center rounded-xl !text-[18px] !font-semibold !text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] sm:h-[56px] sm:max-w-[360px] md:h-14 md:w-[300px] md:max-w-none md:text-xl lg:h-16 lg:w-[360px] xl:h-[60px] xl:w-[350px] 2xl:h-[60px] 2xl:w-[490px]"
        style={{
          background: "linear-gradient(180deg, #72C0F0 0%, #0F6A75 100%)",
        }}
      >
        Search →
      </button>
    </div>
  );
}
