"use client";

import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import HotelList from "../components/hotels/HotelList";
import SearchBar from "../components/hotels/SearchBar";
import SidebarFilters from "../components/SidebarFilters";
import SortBar from "../components/SortBar";

export default function Hotel() {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");

  const removeFilter = (key, value) => {
    const updated = { ...filters };

    if (Array.isArray(updated[key])) {
      updated[key] = updated[key].filter((v) => v !== value);
      if (updated[key].length === 0) delete updated[key];
    } else {
      delete updated[key];
    }

    setFilters(updated);
  };

  const clearAll = () => {
    setFilters({});
  };

  return (
    <div className="bg-[#edf7ff] ">
      <SearchBar filters={filters} setFilters={setFilters} />

      <div className="flex gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4 max-w-7xl mx-auto flex-wrap md:flex-nowrap mt-[-48px] relative">
        {/* 📌 SIDEBAR */}
        <div className="w-full sm:w-64 md:w-72 self-start sticky top-4 max-h-[calc(100vh-20px)] overflow-y-auto overflow-x-hidden custom-scrollbar">
          <SidebarFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className="flex-1 min-w-0">
          {/* 🔃 SORT BAR (TOP) */}
          <SortBar sort={sort} setSort={setSort} />

          {/* 🏷️ ACTIVE FILTERS (NOW BELOW SORTBAR) */}
          <div className="flex flex-wrap gap-2 mb-4 mt-3">
            {Object.entries(filters).map(([key, value]) => {
              if (Array.isArray(value)) {
                return value.map((v, i) => (
                  <div
                    key={`${key}-${i}`}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1"
                  >
                    {v}
                    <CloseOutlined
                      className="cursor-pointer text-xs"
                      onClick={() => removeFilter(key, v)}
                    />
                  </div>
                ));
              }

              return (
                <div
                  key={key}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  {value}
                  <CloseOutlined
                    className="cursor-pointer text-xs"
                    onClick={() => removeFilter(key)}
                  />
                </div>
              );
            })}
          </div>

          {/* 🏨 HOTEL LIST */}
          <HotelList filters={filters} sort={sort} />
        </div>
      </div>
    </div>
  );
}


// "use client";

// import { CloseOutlined } from "@ant-design/icons";
// import { useState } from "react";

// import HotelList from "../components/hotels/HotelList";
// import SearchBar from "../components/hotels/SearchBar";

// import SidebarFilters from "../components/SidebarFilters";
// import SortBar from "../components/SortBar";

// export default function Hotel() {
//   // 🔍 SEARCH STATE
//   const [searchData, setSearchData] = useState({
//     city: "",
//     cityData: null,

//     checkIn: "",
//     checkOut: "",

//     rooms: 1,
//     adults: 2,
//     children: 0,

//     childAges: [],
//     pets: false,
//   });

//   // 🎯 FILTERS STATE
//   const [filters, setFilters] = useState({
//     priceMin: 0,
//     priceMax: 50000,

//     starRating: [],

//     propertyType: [],

//     amenities: [],
//   });

//   // 🔃 SORT STATE
//   const [sort, setSort] = useState("recommended");

//   // 📄 PAGINATION
//   const [page, setPage] = useState(1);

//   // ❌ REMOVE FILTER
//   const removeFilter = (key, value) => {
//     const updated = { ...filters };

//     if (Array.isArray(updated[key])) {
//       updated[key] = updated[key].filter((v) => v !== value);

//       if (updated[key].length === 0) {
//         delete updated[key];
//       }
//     } else {
//       delete updated[key];
//     }

//     setFilters(updated);
//   };

//   // 🧹 CLEAR ALL FILTERS
//   const clearAll = () => {
//     setFilters({
//       priceMin: 0,
//       priceMax: 50000,

//       starRating: [],

//       propertyType: [],

//       amenities: [],
//     });
//   };

//   return (
//     <div className="bg-[#edf7ff]">
//       {/* 🔍 SEARCH BAR */}
//       <SearchBar
//         searchData={searchData}
//         setSearchData={setSearchData}
//       />

//       <div className="relative mx-auto mt-[-48px] flex max-w-7xl flex-wrap gap-2 p-2 sm:gap-3 sm:p-3 md:flex-nowrap md:gap-4 md:p-4">
//         {/* 📌 SIDEBAR */}
//         <div className="custom-scrollbar sticky top-4 max-h-[calc(100vh-20px)] w-full overflow-x-hidden overflow-y-auto self-start sm:w-64 md:w-72">
//           <SidebarFilters
//             filters={filters}
//             setFilters={setFilters}
//           />
//         </div>

//         {/* 📋 CONTENT */}
//         <div className="min-w-0 flex-1">
//           {/* 🔃 SORT BAR */}
//           <SortBar
//             sort={sort}
//             setSort={setSort}
//           />

//           {/* 🏷️ ACTIVE FILTERS */}
//           <div className="mt-3 mb-4 flex flex-wrap gap-2">
//             {Object.entries(filters).map(([key, value]) => {
//               // ❌ skip empty arrays
//               if (Array.isArray(value) && value.length === 0) {
//                 return null;
//               }

//               // ❌ skip default prices
//               if (
//                 key === "priceMin" ||
//                 key === "priceMax"
//               ) {
//                 return null;
//               }

//               // 🔁 array filters
//               if (Array.isArray(value)) {
//                 return value.map((v, i) => (
//                   <div
//                     key={`${key}-${i}`}
//                     className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600"
//                   >
//                     {v}

//                     <CloseOutlined
//                       className="cursor-pointer text-xs"
//                       onClick={() => removeFilter(key, v)}
//                     />
//                   </div>
//                 ));
//               }

//               // 🔹 single filters
//               return (
//                 <div
//                   key={key}
//                   className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600"
//                 >
//                   {value}

//                   <CloseOutlined
//                     className="cursor-pointer text-xs"
//                     onClick={() => removeFilter(key)}
//                   />
//                 </div>
//               );
//             })}

//             {/* 🧹 CLEAR ALL */}
//             <button
//               onClick={clearAll}
//               className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-600"
//             >
//               Clear All
//             </button>
//           </div>

//           {/* 🏨 HOTEL LIST */}
//           <HotelList
//             searchData={searchData}
//             filters={filters}
//             sort={sort}
//             page={page}
//             setPage={setPage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }