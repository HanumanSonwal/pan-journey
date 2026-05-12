// // "use client";

// // import { useDestinationSearch } from "@/modules/hotel/hooks/useDestinationSearch";
// // import { Select, Spin } from "antd";
// // import debounce from "lodash/debounce";
// // import { useMemo, useState } from "react";

// // export default function DestinationSearchField({
// //   value,
// //   onChange,
// // }) {
// //   const [searchText, setSearchText] = useState("");

// //   const [debouncedSearch, setDebouncedSearch] =
// //     useState("");

// //   // debounce
// //   const debounceSearch = useMemo(
// //     () =>
// //       debounce((value) => {
// //         setDebouncedSearch(value);
// //       }, 400),
// //     [],
// //   );

// //   // search
// //   const handleSearch = (value) => {
// //     setSearchText(value);
// //     debounceSearch(value);
// //   };

// //   // api
// //   const { data = [], isLoading } =
// //     useDestinationSearch(debouncedSearch);

// //   // filtered
// //   const filteredData =
// //     searchText?.trim() === ""
// //       ? data?.slice(0, 8)
// //       : data;

// //   // sort exact matches first
// //   const sortedData = [
// //     ...(filteredData || []),
// //   ].sort((a, b) => {
// //     const aMatch = a.name
// //       ?.toLowerCase()
// //       ?.includes(searchText?.toLowerCase());

// //     const bMatch = b.name
// //       ?.toLowerCase()
// //       ?.includes(searchText?.toLowerCase());

// //     return bMatch - aMatch;
// //   });

// //   // create option
// //   const createOptions = (type) => {
// //     return (
// //       sortedData
// //         ?.filter((item) => item.type === type)
// //         ?.map((item) => ({
// //           label: (
// //             <div className="flex flex-col py-1">
// //               <span className="font-semibold text-gray-800">
// //                 {item.name}
// //               </span>

// //               <span className="text-xs text-gray-500">
// //                 {item.type}
// //               </span>
// //             </div>
// //           ),

// //           value: `${item.type}-${item.id}`,

// //           searchLabel: item.name,

// //           itemData: item,
// //         })) || []
// //     );
// //   };

// //   // grouped options
// //   const groupedOptions = [
// //     {
// //       label: "Cities",
// //       options: createOptions("City"),
// //     },

// //     {
// //       label: "Hotels",
// //       options: createOptions("Hotel"),
// //     },

// //     {
// //       label: "Airports",
// //       options: createOptions("Airport"),
// //     },

// //     {
// //       label: "Locations",

// //       options:
// //         sortedData
// //           ?.filter(
// //             (item) =>
// //               item.type !== "City" &&
// //               item.type !== "Hotel" &&
// //               item.type !== "Airport",
// //           )
// //           ?.map((item) => ({
// //             label: (
// //               <div className="flex flex-col py-1">
// //                 <span className="font-semibold text-gray-800">
// //                   {item.name}
// //                 </span>

// //                 <span className="text-xs text-gray-500">
// //                   {item.type}
// //                 </span>
// //               </div>
// //             ),

// //             value: `${item.type}-${item.id}`,

// //             searchLabel: item.name,

// //             itemData: item,
// //           })) || [],
// //     },
// //   ];

// //   return (
// //     <div className="relative h-[82px] rounded-xl border border-gray-300 px-3 py-3 transition-all hover:border-[#0077b6]">
// //       <span className="absolute -top-2 left-3 bg-white px-1 text-[14px] font-medium text-gray-800 md:text-[15px]">
// //         City, Property name or Location
// //       </span>

// //       <div className="flex min-h-[56px] flex-col justify-center px-1 md:px-2">
// //         <Select
// //           showSearch
// //           allowClear
// //           value={value?.city || undefined}
// //           placeholder="Where do you want to stay?"
// //           variant="borderless"
// //           popupMatchSelectWidth={false}
// //           filterOption={false}
// //           loading={isLoading}
// //           className="w-full"
// //           style={{
// //             fontWeight: 700,
// //             fontSize: "24px",
// //           }}
// //           options={groupedOptions}
// //           onSearch={handleSearch}
// //           notFoundContent={
// //             isLoading ? (
// //               <div className="flex justify-center py-4">
// //                 <Spin size="small" />
// //               </div>
// //             ) : (
// //               <div className="py-3 text-center text-sm text-gray-500">
// //                 No destinations found
// //               </div>
// //             )
// //           }
// //           onFocus={() => {
// //             if (!searchText) {
// //               setDebouncedSearch("");
// //             }
// //           }}
// //           onChange={(selectedValue, option) => {
// //             onChange({
// //               city:
// //                 option?.searchLabel || "",

// //               cityData:
// //                 option?.itemData || null,
// //             });
// //           }}
// //         />

// //         <span className="text-xs text-gray-500 md:text-sm">
// //           {value?.cityData?.country ||
// //             "Search destinations"}
// //         </span>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useDestinationSearch } from "@/modules/hotel/hooks/useDestinationSearch";
// import { Select, Spin } from "antd";
// import debounce from "lodash/debounce";
// import { useEffect, useMemo, useState } from "react";

// // POPULAR DESTINATIONS
// const POPULAR_DESTINATIONS = [
//   {
//     id: "popular-goa",
//     name: "Goa, India",
//     type: "Popular",
//     country: "IN",
//   },

//   {
//     id: "popular-delhi",
//     name: "Delhi, India",
//     type: "Popular",
//     country: "IN",
//   },

//   {
//     id: "popular-jaipur",
//     name: "Jaipur, Rajasthan, India",
//     type: "Popular",
//     country: "IN",
//   },

//   {
//     id: "popular-dubai",
//     name: "Dubai, UAE",
//     type: "Popular",
//     country: "UAE",
//   },
// ];

// export default function DestinationSearchField({
//   value,
//   onChange,
// }) {
//   const [searchText, setSearchText] = useState("");

//   const [debouncedSearch, setDebouncedSearch] =
//     useState("");

//   const [recentSearches, setRecentSearches] =
//     useState([]);

//   // LOAD RECENT SEARCHES
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const stored =
//       JSON.parse(
//         localStorage.getItem(
//           "recentHotelSearches",
//         ) || "[]",
//       ) || [];

//     setRecentSearches(stored);
//   }, []);

//   // DEBOUNCE
//   const debounceSearch = useMemo(
//     () =>
//       debounce((value) => {
//         setDebouncedSearch(value);
//       }, 400),
//     [],
//   );

//   // HANDLE SEARCH
//   const handleSearch = (value) => {
//     setSearchText(value);
//     debounceSearch(value);
//   };

//   // API
//   const { data = [], isLoading } =
//     useDestinationSearch(debouncedSearch);

//   // SAVE RECENT SEARCH
//   const saveRecentSearch = (item) => {
//     if (!item) return;

//     const existing =
//       JSON.parse(
//         localStorage.getItem(
//           "recentHotelSearches",
//         ) || "[]",
//       ) || [];

//     const filtered = existing.filter(
//       (x) => x.id !== item.id,
//     );

//     const updated = [
//       item,
//       ...filtered,
//     ].slice(0, 5);

//     localStorage.setItem(
//       "recentHotelSearches",
//       JSON.stringify(updated),
//     );

//     setRecentSearches(updated);
//   };

//   // EMPTY STATE
//   const displayData =
//     searchText.trim() === ""
//       ? [
//           ...recentSearches,

//           ...POPULAR_DESTINATIONS.filter(
//             (popular) =>
//               !recentSearches.some(
//                 (recent) =>
//                   recent.name === popular.name,
//               ),
//           ),
//         ]
//       : data;

//   // SORT RESULTS
//   const sortedData = [...displayData].sort(
//     (a, b) => {
//       const aMatch = a.name
//         ?.toLowerCase()
//         ?.includes(
//           searchText?.toLowerCase(),
//         );

//       const bMatch = b.name
//         ?.toLowerCase()
//         ?.includes(
//           searchText?.toLowerCase(),
//         );

//       return bMatch - aMatch;
//     },
//   );

//   // OPTION BUILDER
//   const buildOptions = (items = []) => {
//     return items.map((item) => ({
//       label: (
//         <div className="flex flex-col py-1">
//           <span className="font-semibold text-gray-800">
//             {item.name}
//           </span>

//           <span className="text-xs text-gray-500">
//             {item.type}
//           </span>
//         </div>
//       ),

//       value: `${item.type}-${item.id}`,

//       searchLabel: item.name,

//       itemData: item,
//     }));
//   };

//   // GROUPED OPTIONS
//   const groupedOptions =
//     searchText.trim() === ""
//       ? [
//           {
//             label: "Recent Searches",

//             options: buildOptions(
//               recentSearches,
//             ),
//           },

//           {
//             label: "Popular Destinations",

//             options: buildOptions(
//               POPULAR_DESTINATIONS.filter(
//                 (popular) =>
//                   !recentSearches.some(
//                     (recent) =>
//                       recent.name ===
//                       popular.name,
//                   ),
//               ),
//             ),
//           },
//         ]
//       : [
//           {
//             label: "Cities",

//             options: buildOptions(
//               sortedData.filter(
//                 (item) =>
//                   item.type === "City",
//               ),
//             ),
//           },

//           {
//             label: "Hotels",

//             options: buildOptions(
//               sortedData.filter(
//                 (item) =>
//                   item.type === "Hotel",
//               ),
//             ),
//           },

//           {
//             label: "Airports",

//             options: buildOptions(
//               sortedData.filter(
//                 (item) =>
//                   item.type === "Airport",
//               ),
//             ),
//           },

//           {
//             label: "Locations",

//             options: buildOptions(
//               sortedData.filter(
//                 (item) =>
//                   item.type !== "City" &&
//                   item.type !==
//                     "Hotel" &&
//                   item.type !==
//                     "Airport",
//               ),
//             ),
//           },
//         ];

//   return (
//     <div className="relative h-[82px] rounded-xl border border-gray-300 px-3 py-3 transition-all hover:border-[#0077b6]">
//       {/* LABEL */}
//       <span className="absolute -top-2 left-3 bg-white px-1 text-[14px] font-medium text-gray-800 md:text-[15px]">
//         City, Property name or Location
//       </span>

//       <div className="flex min-h-[56px] flex-col justify-center px-1 md:px-2">
//         <Select
//           showSearch
//           allowClear
//           value={value?.city || undefined}
//           placeholder="Where do you want to stay?"
//           variant="borderless"
//           popupMatchSelectWidth={false}
//           filterOption={false}
//           loading={isLoading}
//           className="w-full"
//           style={{
//             fontWeight: 700,
//             fontSize: "24px",
//           }}
//           options={groupedOptions}
//           onSearch={handleSearch}
//           notFoundContent={
//             isLoading ? (
//               <div className="flex justify-center py-4">
//                 <Spin size="small" />
//               </div>
//             ) : (
//               <div className="py-3 text-center text-sm text-gray-500">
//                 No destinations found
//               </div>
//             )
//           }
//           onChange={(
//             selectedValue,
//             option,
//           ) => {
//             saveRecentSearch(
//               option?.itemData,
//             );

//             onChange({
//               city:
//                 option?.searchLabel ||
//                 "",

//               cityData:
//                 option?.itemData || null,
//             });
//           }}
//         />

//         {/* COUNTRY */}
//         <span className="text-xs text-gray-500 md:text-sm">
//           {value?.cityData?.country ||
//             "Search destinations"}
//         </span>
//       </div>
//     </div>
//   );
// }

"use client";

import { useDestinationSearch } from "@/modules/hotel/hooks/useDestinationSearch";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";

export default function DestinationSearchField({
  value,
  onChange,
}) {
  const [searchText, setSearchText] = useState("");

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [recentSearches, setRecentSearches] =
    useState([]);

  // LOAD RECENT SEARCHES
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored =
      JSON.parse(
        localStorage.getItem(
          "recentHotelSearches",
        ) || "[]",
      ) || [];

    setRecentSearches(stored);

    // AUTO SELECT LAST SEARCH
    if (
      stored.length > 0 &&
      !value?.city
    ) {
      onChange({
        city: stored[0]?.name || "",

        cityData: stored[0] || null,
      });
    }
  }, []);

  // DEBOUNCE
  const debounceSearch = useMemo(
    () =>
      debounce((value) => {
        setDebouncedSearch(value);
      }, 400),
    [],
  );

  // HANDLE SEARCH
  const handleSearch = (value) => {
    setSearchText(value);
    debounceSearch(value);
  };

  // API
  const { data = [], isLoading } =
    useDestinationSearch(debouncedSearch);

  // SAVE RECENT SEARCH
  const saveRecentSearch = (item) => {
    if (!item) return;

    const existing =
      JSON.parse(
        localStorage.getItem(
          "recentHotelSearches",
        ) || "[]",
      ) || [];

    // REMOVE DUPLICATES
    const filtered = existing.filter(
      (x) => x.id !== item.id,
    );

    // MAX 4 ITEMS
    const updated = [
      item,
      ...filtered,
    ].slice(0, 4);

    localStorage.setItem(
      "recentHotelSearches",
      JSON.stringify(updated),
    );

    setRecentSearches(updated);
  };

  // EMPTY INPUT
  const isEmptySearch =
    searchText.trim() === "";

  // SORT SEARCH RESULTS
  const sortedSearchResults = [
    ...(data || []),
  ].sort((a, b) => {
    const aStarts = a.name
      ?.toLowerCase()
      ?.startsWith(
        searchText.toLowerCase(),
      );

    const bStarts = b.name
      ?.toLowerCase()
      ?.startsWith(
        searchText.toLowerCase(),
      );

    if (aStarts && !bStarts) return -1;

    if (!aStarts && bStarts) return 1;

    return 0;
  });

  // OPTION BUILDER
  const buildOptions = (items = []) => {
    return items.map((item) => ({
      label: (
        <div className="flex flex-col py-1">
          <span className="font-semibold text-gray-800">
            {item.name}
          </span>

          <span className="text-xs text-gray-500">
            {item.type}
          </span>
        </div>
      ),

      value: `${item.type}-${item.id}`,

      searchLabel: item.name,

      itemData: item,
    }));
  };

  // GROUPED OPTIONS
  const groupedOptions = isEmptySearch
    ? [
        // RECENT SEARCHES
        ...(recentSearches.length > 0
          ? [
              {
                label: "Recent Searches",

                options: buildOptions(
                  recentSearches,
                ),
              },
            ]
          : []),

        // POPULAR DESTINATIONS FROM API
        {
          label: "Popular Destinations",

          options: buildOptions(
            data.filter(
              (popular) =>
                !recentSearches.some(
                  (recent) =>
                    recent.name ===
                    popular.name,
                ),
            ),
          ),
        },
      ]
    : [
        {
          label: "Cities",

          options: buildOptions(
            sortedSearchResults.filter(
              (item) =>
                item.type === "City",
            ),
          ),
        },

        {
          label: "Hotels",

          options: buildOptions(
            sortedSearchResults.filter(
              (item) =>
                item.type === "Hotel",
            ),
          ),
        },

        {
          label: "Airports",

          options: buildOptions(
            sortedSearchResults.filter(
              (item) =>
                item.type === "Airport",
            ),
          ),
        },

        {
          label: "Locations",

          options: buildOptions(
            sortedSearchResults.filter(
              (item) =>
                item.type !== "City" &&
                item.type !==
                  "Hotel" &&
                item.type !==
                  "Airport",
            ),
          ),
        },
      ];

  return (
    <div className="relative h-[82px] rounded-xl border border-gray-300 px-3 py-3 transition-all hover:border-[#0077b6]">
      {/* LABEL */}
      <span className="absolute -top-2 left-3 bg-white px-1 text-[14px] font-medium text-gray-800 md:text-[15px]">
        City, Property name or Location
      </span>

      <div className="flex min-h-[56px] flex-col justify-center px-1 md:px-2">
        <Select
          showSearch
          allowClear
          value={value?.city || undefined}
          placeholder="Where do you want to stay?"
          variant="borderless"
          popupMatchSelectWidth={false}
          filterOption={false}
          loading={isLoading}
          className="w-full"
          style={{
            fontWeight: 700,
            fontSize: "24px",
          }}
          options={groupedOptions}
          onSearch={handleSearch}
          onFocus={() => {
            setDebouncedSearch("");
          }}
          notFoundContent={
            isLoading ? (
              <div className="flex justify-center py-4">
                <Spin size="small" />
              </div>
            ) : (
              <div className="py-3 text-center text-sm text-gray-500">
                No destinations found
              </div>
            )
          }
          onChange={(
            selectedValue,
            option,
          ) => {
            saveRecentSearch(
              option?.itemData,
            );

            onChange({
              city:
                option?.searchLabel ||
                "",

              cityData:
                option?.itemData || null,
            });
          }}
        />

        {/* COUNTRY */}
        <span className="text-xs text-gray-500 md:text-sm">
          {value?.cityData?.country ||
            "Search destinations"}
        </span>
      </div>
    </div>
  );
}