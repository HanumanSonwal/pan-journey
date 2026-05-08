// "use client";
// import { useState, useEffect,  useCallback } from "react";


// const categories = [
//   "Beach Vacations",
//   "Mountain Vacations",
//   "Luxury Stays",
//   "Weekend Gateways",
//   "City Escapes",
//   "Adventure Trips",
// ];

// const hotelsData = {
//   "Beach Vacations": [
//     { name: "Azure Shore Resort", desc: "Pristine beachfront villas with turquoise waters and sandy shores.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=75" },
//     { name: "Coral Bay Hotel", desc: "Tropical paradise nestled between lush palms and crystal lagoons.", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=75" },
//     { name: "Sunset Cove Inn", desc: "Breathtaking oceanfront suites with panoramic sunset views.", img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=75" },
//     { name: "Pearl Sands Villa", desc: "Exclusive beachside retreat offering world-class amenities.", img: "https://images.unsplash.com/photo-1439130490301-25e322d88054?w=400&q=75" },
//   ],
//   "Mountain Vacations": [
//     { name: "Alpine Peak Lodge", desc: "Cozy mountain retreat with breathtaking valley views.", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=75" },
//     { name: "Summit Chalet", desc: "Luxury wooden chalet perched high above the clouds.", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=75" },
//     { name: "Glacier View Hotel", desc: "Stunning panoramic views of ancient glaciers from infinity pools.", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=75" },
//     { name: "Pine Ridge Resort", desc: "Serene forest escape with guided hiking trails and stargazing.", img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&q=75" },
//   ],
//   "Luxury Stays": [
//     { name: "Royal Palace Suite", desc: "Opulent rooms adorned with gold accents and butler service.", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=75" },
//     { name: "The Grand Monarch", desc: "Timeless elegance meets modern luxury in the city.", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=75" },
//     { name: "Velvet Sky Tower", desc: "Sky-high penthouse living with private pool and fine dining.", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=75" },
//     { name: "Obsidian Estate", desc: "Ultra-private estate with spa, wine cellar and gardens.", img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&q=75" },
//   ],
//   "Weekend Gateways": [
//     { name: "Lakeside Cabin", desc: "Peaceful lakeside getaway perfect for a quick recharge.", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=75" },
//     { name: "Countryside Cottage", desc: "Charming rural retreat surrounded by rolling hills.", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=75" },
//     { name: "River Bend Lodge", desc: "Rustic wooden lodge with fishing and campfire evenings.", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=75" },
//     { name: "Hilltop Haven", desc: "Intimate hillside escape with sweeping countryside views.", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=75" },
//   ],
//   "City Escapes": [
//     { name: "Metro Boutique Hotel", desc: "Stylish urban sanctuary in the vibrant cultural district.", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=75" },
//     { name: "Skyline Lofts", desc: "Modern loft rooms with floor-to-ceiling city views.", img: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=400&q=75" },
//     { name: "The Urban Nest", desc: "Chic minimalist rooms in the arts and dining scene.", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=75" },
//     { name: "Neon Quarter Inn", desc: "Vibrant hotel by nightlife, galleries and restaurants.", img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=75" },
//   ],
//   "Adventure Trips": [
//     { name: "Jungle Base Camp", desc: "Deep jungle eco-lodge with zip-lining and river rafting.", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=75" },
//     { name: "Desert Dune Lodge", desc: "Camel treks and starlit dinners in the golden dunes.", img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=75" },
//     { name: "Arctic Base Hotel", desc: "Northern lights viewing and snowmobile expeditions.", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=75" },
//     { name: "Volcano View Camp", desc: "Thrilling volcano hikes in a breathtaking raw landscape.", img: "https://images.unsplash.com/photo-1455218873509-8097305ee378?w=400&q=75" },
//   ],
// };

// function usePerPage() {
//   const [perPage, setPerPage] = useState(1);

//   useEffect(() => {
//     const handleResize = () => {
//       const w = window.innerWidth;

//       if (w < 480) {
//         setPerPage(1);
//       } else if (w < 640) {
//         setPerPage(2);
//       } else if (w < 1024) {
//         setPerPage(3);
//       } else {
//         setPerPage(4);
//       }
//     };


//     handleResize();

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };

//   }, []);

//   return perPage;
// }
// export default function Home() {
//   const [activeTab, setActiveTab] = useState("Beach Vacations");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const perPage = usePerPage();
//   const hotels = hotelsData[activeTab] || [];

//   useEffect(() => { 
//     if (currentIndex + perPage > hotels.length) {
//       setCurrentIndex(Math.max(0, hotels.length - perPage));
//     }
//   }, [perPage, hotels.length, currentIndex]);

//   const handleTabChange = (tab) => { setActiveTab(tab); setCurrentIndex(0);};
//   const handlePrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
//   const handleNext = () => setCurrentIndex((i) => (i + perPage < hotels.length ? i + 1 : i));

//   const visibleHotels = hotels.slice(currentIndex, currentIndex + perPage);

//   const gridColsClass = {
//     1: "grid-cols-1",
//     2: "grid-cols-2",
//     3: "grid-cols-3",
//     4: "grid-cols-4",
//   }[perPage] || "grid-cols-4";
//    const hotelss = [
//   {
//     name: "Hotel Full Name",
//     desc: "Lorem Ipsum Dolor Sit Amet, Consectetur Lorem Adipiscing.",
//     img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
//   },
//   {
//     name: "Hotel Full Name",
//     desc: "Lorem Ipsum Dolor Sit Amet, Consectetur Lorem Adipiscing.",
//     img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
//   },
//   {
//     name: "Hotel Full Name",
//     desc: "Lorem Ipsum Dolor Sit Amet, Consectetur Lorem Adipiscing.",
//     img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
//   },
//   {
//     name: "Hotel Full Name",
//     desc: "Lorem Ipsum Dolor Sit Amet, Consectetur Lorem Adipiscing.",
//     img: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210f9?w=800",
//   },
//   {
//     name: "Hotel Full Name",
//     desc: "Lorem Ipsum Dolor Sit Amet, Consectetur Lorem Adipiscing.",
//     img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
//   },
//   {
//     name: "Hotel Full Name",
//     desc: "Lorem Ipsum Dolor Sit Amet, Consectetur Lorem Adipiscing.",
//     img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
//   },
//   {
//     name: "Hotel Full Name",
//     desc: "Lorem Ipsum Dolor Sit Amet, Consectetur Lorem Adipiscing.",
//     img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
//   },
//   {
//     name: "Hotel Full Name",
//     desc: "Lorem Ipsum Dolor Sit Amet, Consectetur Lorem Adipiscing.",
//     img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
//   },
// ];
// const [index, setIndex] = useState(0);

//   const perrPage = 4;

//   const next = () => {
//     if (index + perrPage < hotelss.length) {
//       setIndex(index + 1);
//     }
//   };

//   const prev = () => {
//     if (index > 0) {
//       setIndex(index - 1);
//     }
//   };

//   const visible = hotelss.slice(index, index + perPage);
//   return (
//     <div className="min-h-screen bg-[#edf7ff] py-2 px-4 font-sans">

//       {/* Header */}
//       <div className="text-center mb-8">
//         <h1 className="text-5xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2" style={{ fontFamily: "Georgia, serif" }}>
//           Places As Per Your Vibe
//         </h1>
//         <p className="text-gray-500 text-sm sm:text-[18px] max-w-md mx-auto leading-relaxed">
//           We're committed to offering more than just products—
//           <br className="hidden sm:block" />
//           we provide exceptional experiences.
//         </p>
//       </div>

//       {/* Tabs — sm+ screens */}
//       <div className="hidden sm:flex justify-center mb-8 border-b border-gray-200 overflow-x-auto text-black ">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => handleTabChange(cat)}
//             className={`pb-3 px-4  whitespace-nowrap transition-all duration-200 border-b-2 ${
//               activeTab === cat
//                 ? "border-sky-500 text-sky-500"
//                 : "border-transparent text-sm md:text-[1.25rem] lg:text-2xl hover:text-gray-800"
//             }`}
//           >
//             {cat}
//           </button> 
//         ))}
//       </div>

//       {/* Dropdown — mobile only */}
//       <div className="sm:hidden mb-6 px-1">
//         <select
//           value={activeTab}
//           onChange={(e) => handleTabChange(e.target.value)}
//           className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
//         >
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>{cat}</option>
//           ))}
//         </select>
//       </div>

//       {/* Carousel */}
//       <div className="flex items-center gap-2 sm:gap-3 max-w-6xl mx-auto">

//         {/* Prev */}
//         <button
//           onClick={handlePrev}
//           disabled={currentIndex === 0}
//           className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border bg-white flex items-center justify-center shadow-sm transition-all ${
//             currentIndex === 0
//               ? "opacity-25 cursor-not-allowed border-gray-200 text-gray-400"
//               : "border-gray-300 text-gray-500 hover:border-sky-400 hover:text-sky-500"
//           }`}
//         >
//           <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>

//         {/* Cards */}
//         <div className={`grid ${gridColsClass} gap-3 sm:gap-4 flex-1`}>
//           {visibleHotels.map((hotel, i) => (
//             <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
//               <div className="overflow-hidden h-36 sm:h-44">
//                 <img
//                   src={hotel.img}
//                   alt={hotel.name}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=75"; }}
//                 />
//               </div>
//               <div className="p-3 sm:p-4 text-center">
//                 <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1" style={{ fontFamily: "Georgia, serif" }}>
//                   {hotel.name}
//                 </h3>
//                 <p className="text-gray-400 text-xs leading-relaxed mb-3 px-1">"{hotel.desc}"</p>
//                 <button className="!text-sky-500  text-xs sm:text-sm font-semibold border-b border-dashed border-sky-300 pb-0.5 hover:text-sky-700 hover:border-sky-500 transition-colors">
//                   View Details →
//                 </button>
//               </div>
//             </div>
//           ))}
//           {Array.from({ length: perPage - visibleHotels.length }).map((_, i) => (
//             <div key={`ph-${i}`} className="invisible" />
//           ))}
//         </div>

//         {/* Next */}
//         <button
//           onClick={handleNext}
//           disabled={currentIndex + perPage >= hotels.length}
//           className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border bg-white flex items-center justify-center shadow-sm transition-all ${
//             currentIndex + perPage >= hotels.length
//               ? "opacity-25 cursor-not-allowed border-gray-200 text-gray-400"
//               : "border-gray-300 text-gray-500 hover:border-sky-400 hover:text-sky-500"
//           }`}
//         >
//           <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" text="black-500">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>

//       {/* Dots */}
//       <div className="flex justify-center gap-1.5 mt-6">
//         {hotels.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentIndex(Math.max(0, Math.min(i, hotels.length - perPage)))}
//             className={`h-2 rounded-full transition-all duration-200 ${
//               i >= currentIndex && i < currentIndex + perPage
//                 ? "bg-sky-500 w-4"
//                 : "bg-gray-300 w-2"
//             }`}
//           />
          
//         ))}
//       </div>
     
//     <div className="bg-[#edf7ff] p-6">

//       <div className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden">

//         {/* Background Image */}
//         <img
//           src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
//           className="w-full h-[260px] sm:h-[350px] md:h-[420px] object-cover"
//         />

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/30"></div>

//         {/* Content */}
//         <div className="absolute inset-0 flex items-center justify-center text-center px-4">

//           <div className="max-w-2xl text-white">
//             <p className="text-sm sm:text-lg mb-2 opacity-90">
//               Lowest Deals Are Here
//             </p>

//             <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3">
//               Cashback Guaranteed
//             </h1>

//             <p className="text-xs sm:text-sm md:text-base opacity-80 mb-6">
//               It is a long established fact that a reader will be distracted by
//               the readable content of a page when looking at its layout.
//             </p>

//             <button className="bg-white !text-[#3FA2C7] px-5 py-2 rounded-md font-medium hover:bg-gray-100 transition">
//               Start Booking Now →
//             </button>
//           </div>
//         </div>

//         {/* Red Badge */}
//         <div className="absolute top-6 left-6 bg">
//           <div className="bg-red-500 text-white text-center px-4 py-6 rounded-full rotate-[-15deg] shadow-lg">
//             <p className="text-xs font-bold">%</p>
//             <p className="text-sm font-bold leading-tight">
//               GET THE BEST <br /> OFFER
//             </p>
//           </div>
//         </div>

//         {/* Right Side Image (Suitcase) */}
//         <img
//           src="https://pngimg.com/uploads/suitcase/suitcase_PNG10181.png"
//           className="absolute right-4 bottom-0 h-[180px] sm:h-[250px] md:h-[300px] object-contain"
//         />

//       </div>
//     </div>
//     <div className="bg-[#EDF7FF] py-12 px-4">
      
//       {/* Heading */}
//       <div className="text-center mb-10">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//           Why Choose Our Platform
//         </h2>
//         <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
//           We’re committed to offering more than just products—we provide
//           exceptional experiences.
//         </p>
//       </div>

//       {/* Main Section */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Left Image */}
//         <div className="rounded-2xl overflow-hidden">
//           <img
//             src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
//             alt="resort"
//             className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
//           />
//         </div>

//         {/* Right Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//           {/* Card 1 */}
//           <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
//             <div className="text-sky-400 text-3xl mb-3">💰</div>
//             <h3 className="font-semibold text-lg text-gray-800 mb-2">
//               Best Price Guarantee
//             </h3>
//             <p className="text-gray-500 text-sm">
//               Get the most competitive prices with full transparency and no
//               hidden charges.
//             </p>
//           </div>

//           {/* Card 2 */}
//           <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
//             <div className="text-sky-400 text-3xl mb-3">🔒</div>
//             <h3 className="font-semibold text-lg text-gray-800 mb-2">
//               Easy & Secure Booking
//             </h3>
//             <p className="text-gray-500 text-sm">
//               Book your stay easily with a smooth process and secure payments.
//             </p>
//           </div>

//           {/* Card 3 */}
//           <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
//             <div className="text-sky-400 text-3xl mb-3">📞</div>
//             <h3 className="font-semibold text-lg text-gray-800 mb-2">
//               24/7 Customer Support
//             </h3>
//             <p className="text-gray-500 text-sm">
//               Our team is always available to help you anytime you need.
//             </p>
//           </div>

//           {/* Card 4 */}
//           <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
//             <div className="text-sky-400 text-3xl mb-3">🎁</div>
//             <h3 className="font-semibold text-lg text-gray-800 mb-2">
//               Instant Cashback Rewards
//             </h3>
//             <p className="text-gray-500 text-sm">
//               Earn rewards and cashback on every booking you make.
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//     <div className="bg-gray-200 min-h-screen flex items-center justify-center p-6">

//       <div className="w-full max-w-7xl rounded-[40px] bg-gradient-to-br from-[#6faed0] to-[#1f6f78] p-10">

//         {/* HEADER */}
//         <div className="text-center text-white mb-10">
//           <h1 className="text-4xl font-bold mb-3">
//             Top Rated Hotels
//           </h1>
//           <p className="text-sm opacity-90">
//             We’re committed to offering more than just products—
//             we provide exceptional experiences.
//           </p>
//         </div>

//         {/* TOP CARDS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">

//           {visible.map((hotel, i) => (
//             <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg">

//               <img
//                 src={hotel.img}
//                 className="h-56 w-full object-cover"
//               />

//               <div className="p-4 text-center">
//                 <h3 className="font-semibold text-lg">
//                   {hotel.name}
//                 </h3>

//                 <p className="text-gray-500 text-sm mt-2">
//                   {hotel.desc}
//                 </p>

//                 <div className="text-yellow-400 mt-3">
//                   ★★★★★
//                 </div>
//               </div>

//             </div>
//           ))}

//         </div>

//         {/* BOTTOM SLIDER */}
//         <div className="flex items-center gap-4">

//           {/* LEFT */}
//           <button
//             onClick={prev}
//             className="text-white text-3xl"
//           >
//             ←
//           </button>

      
        
          

//         {/* bottem cards CARDS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">

//           {visible.map((hotel, i) => (
//             <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg">

//               <img
//                 src={hotel.img}
//                 className="h-56 w-full object-cover"
//               />

//               <div className="p-4 text-center">
//                 <h3 className="font-semibold text-lg">
//                   {hotel.name}
//                 </h3>

//                 <p className="text-gray-500 text-sm mt-2">
//                   {hotel.desc}
//                 </p>

//                 <div className="text-yellow-400 mt-3">
//                   ★★★★★
//                 </div>
//               </div>

//             </div>
//           ))}

   

//           </div>

//           {/* RIGHT */}
//           <button
//             onClick={next}
//             className="text-white text-3xl"
//           >
//             →
//           </button>

//         </div>

//         {/* COUNTER */}
//         <div className="text-center text-white mt-4 text-sm">
//           {index + 1} / {hotels.length}
//         </div>

//       </div>
//     </div>

//      </div>

    
    
//   );

// }

