 "use client";
 export default function Hero() {
    return (
 <div className="bg-[#EDF7FF] py-12 px-4">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Why Choose Our Platform
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
          We’re committed to offering more than just products—we provide
          exceptional experiences.
        </p>
      </div>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left Image */}
        <div className="rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="resort"
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
          />
        </div>

        {/* Right Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="text-sky-400 text-3xl mb-3">💰</div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Best Price Guarantee
            </h3>
            <p className="text-gray-500 text-sm">
              Get the most competitive prices with full transparency and no
              hidden charges.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="text-sky-400 text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Easy & Secure Booking
            </h3>
            <p className="text-gray-500 text-sm">
              Book your stay easily with a smooth process and secure payments.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="text-sky-400 text-3xl mb-3">📞</div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              24/7 Customer Support
            </h3>
            <p className="text-gray-500 text-sm">
              Our team is always available to help you anytime you need.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="text-sky-400 text-3xl mb-3">🎁</div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Instant Cashback Rewards
            </h3>
            <p className="text-gray-500 text-sm">
              Earn rewards and cashback on every booking you make.
            </p>
          </div>

        </div>
      </div>
    </div>
    );  }
