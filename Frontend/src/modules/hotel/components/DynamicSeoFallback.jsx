import RelatedDestinations from "./RelatedDestinations";

export default function DynamicSeoFallback({ cityName }) {
  if (!cityName) return null;

  return (
    <section className="mt-10 space-y-6">
      {/* INTRO */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-2xl font-semibold text-gray-900">
          Hotels in {cityName}
        </h2>

        <p className="leading-7 text-gray-600">
          Looking for hotels in {cityName}? PAN Journey helps you compare hotel
          prices, explore verified stays, and find accommodation that fits your
          budget and travel plans. Whether you are planning a business trip,
          family vacation, or weekend getaway, discover hotel options in{" "}
          {cityName} with an easy booking experience.
        </p>
      </div>

      {/* WHY BOOK */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-semibold text-gray-900">
          Why Book Hotels with PAN Journey
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-sky-50 p-4">
            <h4 className="mb-2 font-medium text-gray-900">
              Verified Hotel Listings
            </h4>

            <p className="text-sm leading-6 text-gray-600">
              Explore hotel stays with reliable information and transparent
              details.
            </p>
          </div>

          <div className="rounded-xl bg-sky-50 p-4">
            <h4 className="mb-2 font-medium text-gray-900">
              Easy Price Comparison
            </h4>

            <p className="text-sm leading-6 text-gray-600">
              Compare hotel pricing and find accommodation that matches your
              travel budget.
            </p>
          </div>

          <div className="rounded-xl bg-sky-50 p-4">
            <h4 className="mb-2 font-medium text-gray-900">
              Fast Booking Experience
            </h4>

            <p className="text-sm leading-6 text-gray-600">
              Search and book hotels quickly with a smooth and simple booking
              process.
            </p>
          </div>
        </div>
      </div>

      {/* BOOKING TIPS */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-xl font-semibold text-gray-900">
          Hotel Booking Tips for {cityName}
        </h3>

        <ul className="space-y-2 text-gray-600">
          <li>
            • Compare hotel options before booking to find the right balance
            between price and comfort.
          </li>

          <li>
            • Check hotel location and nearby attractions when planning your
            stay.
          </li>

          <li>
            • Book early during holidays and peak travel seasons for better
            availability.
          </li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-semibold text-gray-900">
          Frequently Asked Questions
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">
              What are the best areas to stay in {cityName}?
            </h4>

            <p className="mt-1 text-gray-600">
              The best area depends on your trip purpose, budget, and nearby
              attractions you want to visit.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900">
              When should I book hotels in {cityName}?
            </h4>

            <p className="mt-1 text-gray-600">
              Booking in advance is usually recommended during weekends,
              holidays, and busy travel seasons.
            </p>
          </div>
        </div>
      </div>

      {/* INTERNAL LINKS */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-semibold text-gray-900">
          Popular Hotel Destinations
        </h3>

        <div className="flex flex-wrap gap-3">
          <RelatedDestinations currentCity={cityName} />
        </div>
      </div>
    </section>
  );
}
