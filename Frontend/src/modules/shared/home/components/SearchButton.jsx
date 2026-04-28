export default function SearchButton() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 md:top-[80%] md:-translate-y-1/2">
      <button className="bg-gradient-to-r from-[#6FAED0] via-[#4A9BB5] to-[#1F6F78] text-white px-12 py-4 rounded-xl text-lg font-semibold shadow-lg hover:opacity-90 w-[350px]">
        Search →
      </button>
    </div>
  );
}
