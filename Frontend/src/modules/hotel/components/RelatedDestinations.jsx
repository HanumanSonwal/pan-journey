import Link from "next/link";

const POPULAR_CITIES = [
  "Jaipur",
  "Delhi",
  "Goa",
  "Udaipur",
  "Mumbai",
  "Bangalore",
  "Ahmedabad",
  "Agra",
];

export default function RelatedDestinations({ currentCity }) {
  const cities = POPULAR_CITIES.filter(
    (city) => city.toLowerCase() !== currentCity?.toLowerCase(),
  ).slice(0, 6);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold text-gray-900">
        Popular Hotel Destinations
      </h3>

      <div className="flex flex-wrap gap-3">
        {cities.map((city) => (
          <Link
            key={city}
            href={`/hotels/${city.toLowerCase()}`}
            className="rounded-full bg-sky-50 px-4 py-2 text-sm text-sky-700 transition hover:bg-sky-100"
          >
            Hotels in {city}
          </Link>
        ))}
      </div>
    </div>
  );
}
