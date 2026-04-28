"use client";
import { useState } from "react";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("hotel");
  const [dropdown, setDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setDropdown(dropdown === name ? null : name);
  };

  return (
    <div className="relative w-full min-h-[90vh]">
      {/* TOP IMAGE */}
      <div
        className="absolute top-0 left-0 w-full h-[50%] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      ></div>

      {/* BOTTOM COLOR */}
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-[#EDF7FF]"></div>

      {/* MAIN */}
      <div className="relative flex items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl p-8  pb-23 ">
          {/* ICONS */}
          <div className="flex justify-center gap-6 -mt-16 mb-6  pb-6">
            {["hotel", "flight", "bus"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setDropdown(null);
                }}
                className={`w-16 h-16 flex items-center justify-center rounded-xl shadow-lg ${
                  activeTab === tab
                    ? "bg-gradient-to-b from-[#6FAED0] via-[#4A9BB5] to-[#1F6F78] text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {tab === "hotel" && "🏨"}
                {tab === "flight" && "✈️"}
                {tab === "bus" && "🚌"}
              </button>
            ))}
          </div>

          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Find What You Are Looking For
          </h2>

          {/* HOTEL */}
          {activeTab === "hotel" && (
            <div>
              <Title text="Select Your Hotels" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <InputBox
                  title="City, Property name or Location"
                  main="Goa"
                  sub="India"
                />

                <DropdownBox
                  title="Check In"
                  main="27 Sep, 2025"
                  open={dropdown === "checkin"}
                  onClick={() => toggleDropdown("checkin")}
                  data={["27 Sep 2025", "28 Sep 2025"]}
                />

                <DropdownBox
                  title="Check Out"
                  main="29 Sep, 2025"
                  open={dropdown === "checkout"}
                  onClick={() => toggleDropdown("checkout")}
                  data={["29 Sep 2025", "30 Sep 2025"]}
                />

                <DropdownBox
                  title="Guests"
                  main="1 Room • 2 Adults"
                  open={dropdown === "guest"}
                  onClick={() => toggleDropdown("guest")}
                  data={["1 Room • 2 Adults", "2 Rooms • 4 Adults"]}
                />
              </div>
            </div>
          )}

          {/* FLIGHT */}
          {activeTab === "flight" && (
            <div>
              <Title text="Book Flights" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <InputBox title="From" main="Delhi" sub="India" />
                <InputBox title="To" main="Mumbai" sub="India" />

                <DropdownBox
                  title="Departure"
                  main="10 Oct, 2025"
                  open={dropdown === "depart"}
                  onClick={() => toggleDropdown("depart")}
                  data={["10 Oct 2025", "11 Oct 2025"]}
                />

                <DropdownBox
                  title="Travellers"
                  main="2 Adults"
                  open={dropdown === "travellers"}
                  onClick={() => toggleDropdown("travellers")}
                  data={["1 Adult", "2 Adults", "3 Adults"]}
                />
              </div>
            </div>
          )}

          {/* BUS */}
          {activeTab === "bus" && (
            <div>
              <Title text="Book Bus Tickets" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
                <InputBox title="From" main="Jaipur" sub="Rajasthan" />
                <InputBox title="To" main="Delhi" sub="India" />

                <DropdownBox
                  title="Date"
                  main="15 Oct, 2025"
                  open={dropdown === "date"}
                  onClick={() => toggleDropdown("date")}
                  data={["15 Oct 2025", "16 Oct 2025"]}
                />

                <DropdownBox
                  title="Seats"
                  main="2 Seats"
                  open={dropdown === "seats"}
                  onClick={() => toggleDropdown("seats")}
                  data={["1 Seat", "2 Seats", "3 Seats"]}
                />
              </div>
            </div>
          )}

          {/* BUTTON */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 md:top-[80%] md:bottom-auto md:-translate-y-1/2">
            <button className="bg-gradient-to-r from-[#6FAED0] via-[#4A9BB5] to-[#1F6F78] text-white px-12 py-4 rounded-xl text-lg font-semibold shadow-lg hover:opacity-90 w-[350px] pt-5 pb-5 p">
              Search →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function Title({ text }) {
  return (
    <div className="flex justify-between mb-4">
      <h3 className="text-xl font-bold text-gray-800">{text}</h3>
      <p className="text-sm text-gray-400">
        Book Domestic and International Property Online.
      </p>
    </div>
  );
}

function InputBox({ title, main, sub }) {
  return (
    <div className="relative border border-gray-200 rounded-xl p-4 pt-6 h-[90px] flex flex-col justify-center hover:border-[#4A9BB5] transition">
      <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-400 font-medium">
        {title}
      </span>

      <input
        defaultValue={main}
        className="text-2xl font-bold text-gray-900 outline-none border-none bg-transparent w-full"
      />

      <p className="text-sm text-gray-500">{sub}</p>
    </div>
  );
}

function DropdownBox({ title, main, open, onClick, data }) {
  return (
    <div
      className="relative border border-gray-200 rounded-xl p-4 pt-6 h-[90px] flex flex-col justify-center cursor-pointer hover:border-[#4A9BB5] transition"
      onClick={onClick}
    >
      <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-400 font-medium">
        {title}
      </span>

      <h2 className="text-lg font-semibold text-gray-900">{main}</h2>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-4 h-4 absolute right-4 top-6 text-gray-500 transition-transform ${
          open ? "rotate-180" : ""
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>

      {open && (
        <div className="absolute bg-white shadow-xl mt-2 p-2 rounded-xl w-full top-full z-10 border">
          {data.map((item, i) => (
            <p
              key={i}
              className="p-2 text-gray-700 hover:bg-[#EDF7FF] rounded-md cursor-pointer"
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
