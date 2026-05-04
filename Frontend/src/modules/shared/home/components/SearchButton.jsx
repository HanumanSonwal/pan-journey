"use client";

export default function SearchButton({ onSearch }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[72%] translate-y-1/2">
      <button
        onClick={onSearch}
        className="text-white px-12 py-4 rounded-xl text-base font-semibold shadow-lg hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] w-[400px] h-16 flex items-center justify-center text-2xl transition-all duration-200"
        style={{
          background: "linear-gradient(180deg, #72C0F0 0%, #0F6A75 100%)",
        }}
      >
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