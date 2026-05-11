"use client";

export default function SearchButton({ onSearch }) {
  return (
    <div
      className="
        absolute
        left-1/2
        -translate-x-1/2
        translate-y-1/2

        top-[64%]

        /* Tablet */
        max-lg:top-[68%]

        /* Mobile */
        max-md:top-[72%]
      "
    >
      <button
        onClick={onSearch}
        className="
          flex
          items-center
          justify-center

          text-white
          font-semibold
          shadow-lg
          transition-all
          duration-200

          hover:opacity-90
          hover:scale-[1.02]
          active:scale-[0.98]

          rounded-xl

          /* Laptop Same */
          w-[400px]
          h-16
          text-2xl
          px-12
          py-4

          /* Tablet */
          max-lg:w-[330px]
          max-lg:h-14
          max-lg:text-xl

          /* Mobile */
          max-md:w-[250px]
          max-md:h-12
          max-md:text-lg
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
