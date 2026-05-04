"use client";

import { Card } from "antd";
import bookingData from "../components/data/Busflightherodata"; // 🔥 IMPORT DATA

export default function BussflightCards() {
  return (
    <div className="px-6 py-12 bg-gray-100">
      
      {/* Cards Section */}
      <div className="grid md:grid-cols-2 gap-10">
        {bookingData.map((item) => (
          <div key={item.id} className="relative">

            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="rounded-2xl w-full h-[320px] object-cover"
            />

            {/* Tag */}
            <span className="absolute top-3 left-3 bg-sky-500 text-white text-sm px-3 py-1 rounded-md">
              {item.tag}
            </span>

            {/* Bottom Card */}
            <Card
              className="absolute left-1/2 -translate-x-1/2 -bottom-10 w-[90%] rounded-2xl shadow-xl text-center"
              styles={{ body: { padding: "20px" } }}  // ✅ FIX (no warning)
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-2">
                {item.desc}
              </p>
            </Card>

          </div>
        ))}
      </div>

      {/* Bottom Text Section */}
      <div className="grid md:grid-cols-2 gap-10 mt-24">
        
        <div>
          <p className="text-sky-500 font-medium">Our Testimonial</p>
          <h2 className="text-4xl font-bold mt-2 text-gray-800">
            Real Feedback from Our Happy Travelers Worldwide
          </h2>
        </div>

        <div>
          <p className="text-gray-600">
            Contrary to popular belief, Lorem Ipsum is not simply random text. 
            It has roots in a piece of classical Latin literature from 45 BC.
          </p>
        </div>

      </div>

    </div>
  );
}
