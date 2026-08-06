import { supplierAPI } from "../../config/supplierApi.js";
import { getAuthHeader } from "../../config/supplierAuth.service.js";
import { getCurrencyRate } from "../currencyConverter/currency.service.js";
import Markup from "../priceMarkup/markup/markup.model.js";
import { applyHotelPricing } from "../priceMarkup/markup/pricing.service.js";
import getCountryTaxRule from "./../tax/countryTax.service.js";
import { filterHotels } from "./hotel.filters.js";
import { sortHotels } from "./hotel.sort.js";
import HotelCache from "./hotelCache.model.js";
import { paginateHotels } from "./hotelPagination.js";
import { fetchRemainingHotelsInBackground } from "./supplierPagination.service.js";

import {
  convertHotelPrices,
  getCurrencySymbol,
} from "../currencyConverter/currency.helper.js";

/* =====================================================
   🧠 HELPERS
===================================================== */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const normalizeCityName = (input) => {
  if (!input) return "";

  const parts = input.split(",").map((p) => p.trim());

  // city search format
  if (parts.length === 3) {
    return input.trim();
  }

  // hotel search format
  if (parts.length >= 4) {
    // remove hotel name
    return `${parts[1]}, ${parts[2]}, ${parts[3]}`;
  }

  return input.trim();
};
/* =====================================================
   🧠 NORMALIZE BODY
===================================================== */
export const normalizeBody = (body) => ({
  cityId: body.cityId || body.id,

  cityName: body.cityName || body.fullName,

  CheckInDate: body.CheckInDate,

  CheckOutDate: body.CheckOutDate,

  stateName: body.stateName,
  countryCode: body.countryCode,

  RoomCount: body.RoomCount || 1,

  currency: body.currency || "INR",

  filters: body.filters || {},

  sort: body.sort || "",

  pagination: body.pagination || {
    page: 1,
    limit: 10,
  },
});

const resolveMarkupForHotel = ({
  hotel,
  body,
  hotelMarkups,
  cityMarkups,
  stateMarkups,
  countryMarkups,
  worldwideMarkups,
}) => {
  // 1 HOTEL LEVEL
  const hotelMarkup = hotelMarkups.find(
    (m) => String(m.hotelId) === String(hotel.hotelId),
  );

  if (hotelMarkup) return hotelMarkup;

  // 2 CITY LEVEL
  const normalizedCity = normalizeCityName(body.cityName);

  const cityMarkup = cityMarkups.find(
    (m) => String(m.cityId) === String(body.cityId)
);
console.log("cityMarkup",cityMarkup)
  if (cityMarkup) return cityMarkup;

  // 3 STATE LEVEL
  const stateMarkup = stateMarkups.find(
    (m) =>
      m.stateName?.trim().toLowerCase() ===
      body.stateName?.trim().toLowerCase(),
  );

  if (stateMarkup) return stateMarkup;

  // 4 COUNTRY LEVEL
  const countryMarkup = countryMarkups.find(
    (m) =>
      m.countryCode?.trim().toUpperCase() ===
      body.countryCode?.trim().toUpperCase(),
  );

  if (countryMarkup) return countryMarkup;
  const worldwideMarkup = worldwideMarkups.find((m) => m.level === "worldwide");
  if (worldwideMarkup) return worldwideMarkup;

  return null;
};
/* =====================================================
   📤 BUILD PAYLOAD
===================================================== */
export const buildPayload = (body, seedValue = "", authHeader) => ({
  AuthHeader: authHeader,

  HotelSeedValue: seedValue,

  CheckInDate: body?.CheckInDate,

  CheckOutDate: body?.CheckOutDate,

  HotelRoomDetail: [
    {
      AdultCount: 1,
      ChildCount: 0,
      Child1Age: 0,
      Child2Age: 0,
    },
  ],

  fullName: body?.cityName,

  id: body?.cityId,

  RoomCount: body?.RoomCount,
});

/* =====================================================
   🏨 MERGE HOTEL + PRICE
===================================================== */
export const mergeHotels = (data) => {
  if (!data?.HotelContents) {
    return [];
  }

  const fares = data?.HotelFareDetails || [];

  return data.HotelContents.map((hotel) => {
    const price = fares.find((f) => f.HotelId === hotel.HotelId);

    return {
      hotelId: hotel.HotelId,
      hotelName: hotel.HotelName,
      address: hotel.Address,
      location: hotel.Location,
      starRating: hotel.StarCategoryId,
      latitude: hotel.Latitude,
      longitude: hotel.Longitude,
      hotelkey: hotel.HotelKey,
      image: hotel.HotelImage,

      facilities: hotel?.HotelFacilities?.map((f) => f.FacilityName) || [],

      // IMPORTANT CHANGE
      price: price?.TotalAmount || 0,
      tax: 0,

      supplierBaseAmount: price?.BasicAmount || 0,

      supplierTaxAmount: price?.TaxAmount || 0,

      supplierTotalAmount: price?.TotalAmount || 0,

      freeCancellation: price?.FreeCancellation === "2",
    };
  });
};

/* =====================================================
   🚀 SUPPLIER SEARCH WITH RETRY
===================================================== */
const fetchSupplierHotelsWithRetry = async (body) => {
  const auth = getAuthHeader().AuthHeader;

  let payload = buildPayload(body, "", auth);

  let attempts = 0;

  let data = null;

  while (attempts < 5) {
    attempts++;

    console.log(`\n🚀 SUPPLIER ATTEMPT #${attempts}`);

    const response = await supplierAPI.post(
      "/JSONService/HotelSearch",
      payload,
    );

    data = response.data;

    // console.log("🏨 HOTELS RECEIVED:", data?.HotelContents?.length || 0);

    // console.log("📦 MORE HOTELS:", data?.MoreHotels);

    // console.log("🌱 SEED:", data?.HotelSeedValue);

    if (data?.HotelContents && data.HotelContents.length > 0) {
      return {
        data,
        auth,
      };
    }

    await sleep(1000);

    payload = buildPayload(body, data?.HotelSeedValue || "", auth);
  }

  return {
    data,
    auth,
  };
};

/* =====================================================
   🏨 MAIN SEARCH SERVICE
===================================================== */
export const searchHotelsFromSupplier = async (reqBody) => {
  const body = normalizeBody(reqBody);

  const { filters, sort, pagination } = body;

  // console.log("\n=================================================");
  // console.log("🏨 HOTEL SEARCH STARTED");
  // console.log("🏙 CITY:", body.cityName);
  // console.log("=================================================\n");

  // let cache = await HotelCache.findOne({
  //   cityId: body.cityId,
  // });

  let cache = await HotelCache.findOne({
    cityId: body.cityId,
    checkInDate: body.CheckInDate,
    checkOutDate: body.CheckOutDate,
    roomCount: body.RoomCount,
  });

  /* =====================================================
     ⚡ CACHE HIT
  ===================================================== */
  if (cache) {
    console.log("⚡ CACHE HIT");

    // console.log("🏨 CACHED HOTELS:", cache.hotels?.length || 0);
  }

  /* =====================================================
     🌐 CACHE MISS
  ===================================================== */

    // console.log("🌐 CACHE MISS → CALLING SUPPLIER");
    const auth = null;

const data = {
"HotelContents": [
    {
      "Address": "Pillayar Koil Street, Triplicane, Chennai",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Smoke-free property"
        }
      ],
      "HotelId": "32373260",
      "HotelImage": "https://images.grnconnect.com/2099767/78ecb82b20c46275780f682a1a720119.jpg",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45e+WEFg43g/UJlob88gIZR3PD6gwL3KbQauxdCBxayqHMDi/1l2lBxOgSmScF56hoboSEsaBPTVcarzE810a4QqMeur+OOZEEuKxINA0fEm/RVVTor9/bjUaMiFPIXkIew==",
      "HotelName": "Bt Mansion by OYO Rooms",
      "Latitude": "13.060882",
      "Location": "Pillayar Koil Street, Triplicane, Chennai",
      "Longitude": "80.272865",
      "Pincode": "",
      "StarCategoryId": "0"
    },
    {
      "Address": "Near Koyambedu Metro Station, Chennai 600092",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [],
      "HotelId": "31327544",
      "HotelImage": "",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45e+WEFg43g/UJlob88gIZR3PD6gwL3KbQauxdCBxayqHMDi/1l2lBxOgSmScF56hoboSEsaBPTVcarzE810a4Qq+eTamd6Py75RyoBqXnPY2JE4pzVLFna2HI6YMbbDMFw==",
      "HotelName": "Shappy Inn by OYO Rooms",
      "Latitude": "13.059852",
      "Location": "Near Koyambedu Metro Station, Chennai 600092",
      "Longitude": "80.18886",
      "Pincode": "600092",
      "StarCategoryId": "0"
    },
    {
      "Address": "27/3 Masoodhi Street, Velachery Main Road, Little Mount, Seidapet, Chennai 600015",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Complimentary wireless internet"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Laundry/Valet service"
        },
        {
          "FacilityName": "Motorcycle parking"
        }
      ],
      "HotelId": "16182263",
      "HotelImage": "https://images.grnconnect.com/2099576/72a6a2e95d207238c3e1afff6f69f912.jpg",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45e+WEFg43g/UJlob88gIZR3PD6gwL3KbQauxdCBxayqHMDi/1l2lBxOgSmScF56hoboSEsaBPTVcarzE810a4QrFSwd3RAogQwVWDyowQJ/LtRaPaNFC4L/6PGYbk4pN9g==",
      "HotelName": "Hostel Gandhi",
      "Latitude": "13.012308",
      "Location": "27/3 Masoodhi Street, Velachery Main Road, Little Mount, Seidapet, Chennai 600015",
      "Longitude": "80.22444",
      "Pincode": "600015",
      "StarCategoryId": "0"
    },
    {
      "Address": "Old 77, New 102, Tana Steet, Chennai 600007, Tamil Nadu",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Smoke-free property"
        },
        {
          "FacilityName": "WIFI"
        }
      ],
      "HotelId": "32433280",
      "HotelImage": "https://images.grnconnect.com/2099147/269de3b6e4704430aad1e14d8747adc0.jpg",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45e+WEFg43g/UJlob88gIZR3PD6gwL3KbQauxdCBxayqHMDi/1l2lBxOgSmScF56hoboSEsaBPTVcarzE810a4QoVNnwUQuSZIx2Zy3RDJ5/5cWYohX6fU7vNN9n7DKhiuQ==",
      "HotelName": "Agp Home Stay by OYO Rooms",
      "Latitude": "13.088508",
      "Location": "Old 77, New 102, Tana Steet, Chennai 600007, Tamil Nadu",
      "Longitude": "80.254715",
      "Pincode": "600007",
      "StarCategoryId": "0"
    },
    {
      "Address": "4th Cross Street, Shanmuga Nagar, Chennai",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Food delivery"
        },
        {
          "FacilityName": "Hotel room service app"
        },
        {
          "FacilityName": "Hot water linen and laundry washing"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Professional-grade sanitizing services"
        },
        {
          "FacilityName": "Room service [24-hour]"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "41633452",
      "HotelImage": "https://pix8.agoda.net/hotelImages/35662348/-1/267ed192675dba98f959f37400e011cb.jpg?ce=0&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtF8YUn9MzgNYGmcRqQPIuxTt6sO3bW5DJp4Y+M9Bm63r4=",
      "HotelName": "SPOT ON Shappy Inn Koyambedu Near Pvr Spi Palazzo Chennai",
      "Latitude": "13.05982",
      "Location": "4th Cross Street, Shanmuga Nagar, Chennai",
      "Longitude": "80.18885",
      "Pincode": "600092",
      "StarCategoryId": "3"
    },
    {
      "Address": "24, old No.71, Pillayar Koil St Triplicane.",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Room service [24-hour]"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "16145881",
      "HotelImage": "https://pix8.agoda.net/hotelImages/7949890/-1/86bec23e6616204c8085e9b1bf3d6457.jpg?ca=9&ce=1&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFVM9RuaE7I04e/4gnWAmLtJF22vWbjlJXs6NVXvAXO/M=",
      "HotelName": "SPOT ON Bt Mansion Near Marina Beach",
      "Latitude": "13.061002",
      "Location": "24, old No.71, Pillayar Koil St Triplicane.",
      "Longitude": "80.27298",
      "Pincode": "600005",
      "StarCategoryId": "3"
    },
    {
      "Address": "291 Eswaran Nagar Pammadakullam village red hills Chennai Tamil Nadu 600052 India",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Food delivery"
        },
        {
          "FacilityName": "Hotel room service app"
        },
        {
          "FacilityName": "Hot water linen and laundry washing"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Professional-grade sanitizing services"
        },
        {
          "FacilityName": "Room service [24-hour]"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "55254821",
      "HotelImage": "https://q-xx.bstatic.com/xdata/images/hotel/max500/511437283.jpg?k=2ce0de7e32f5690c087c574e72c7315df0c05bb788d303d515c13e828e843312&o=&s=312x",
      "HotelKey": "ZH0OqiZ0VV/Oe1gtZ/cPspCBTQM2z9M3HX+88zVElvfbjDTUiufYJ1F/FdViT/iX6Gu6uJ+De8JEHvf6em6bATTraFvkejAWL/XYsKMts9ZYyUSwIw21ffh4EEJ6Jb2GC2a7CxS4+24qJk1Hhj1/TAWO6vYDNjMuR9GmsZvTms7iE=",
      "HotelName": "OYO Flagship Sp Stay's",
      "Latitude": "13.19115",
      "Location": "291 Eswaran Nagar Pammadakullam village red hills Chennai Tamil Nadu 600052 India",
      "Longitude": "80.158905",
      "Pincode": "600052",
      "StarCategoryId": "3"
    },
    {
      "Address": "8 Kelambakkam - Vandalur Road, Rajan Nagar,Chennai,Tamil Nadu,India,603103,India",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Food delivery"
        },
        {
          "FacilityName": "Hotel room service app"
        },
        {
          "FacilityName": "Hot water linen and laundry washing"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Professional-grade sanitizing services"
        },
        {
          "FacilityName": "Room service [24-hour]"
        },
        {
          "FacilityName": "Air conditioning in public area"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "54074513",
      "HotelImage": "https://pix8.agoda.net/hotelImages/49487941/-1/859da25839f32de10ad2e3cfc4c56c1e.jpg?ce=0&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFx7dd/VG3G/P7oY9EgBPGj+hSND1hhWEFZQvwMKm9G7w=",
      "HotelName": "Super OYO Flagship Elite Residency",
      "Latitude": "12.79167",
      "Location": "8 Kelambakkam - Vandalur Road, Rajan Nagar,Chennai,Tamil Nadu,India,603103,India",
      "Longitude": "80.21814",
      "Pincode": "603103",
      "StarCategoryId": "4"
    },
    {
      "Address": "77, Tana St, Purasaiwakkam, Chennai, Tamil Nadu 600084, India",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "Smoke-free property"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Food delivery"
        },
        {
          "FacilityName": "Hotel room service app"
        },
        {
          "FacilityName": "Hot water linen and laundry washing"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Room service [24-hour]"
        },
        {
          "FacilityName": "Air conditioning in public area"
        },
        {
          "FacilityName": "Car park [nearby]"
        },
        {
          "FacilityName": "Car park [on-site]"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        },
        {
          "FacilityName": "Professional-grade sanitizing services"
        },
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        }
      ],
      "HotelId": "39730241",
      "HotelImage": "https://q-xx.bstatic.com/xdata/images/hotel/max500/509475784.jpg?k=ba0f76067c820856cd04dbdf2d0e877381fc61f75839ec169b5bcded3393c717&o=&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFe/moEHGRnONSXF2G8Z1OqpcvYu1FGGWjzGj8GN+Aprk=",
      "HotelName": "SPOT ON 29391 Agp Home Stay",
      "Latitude": "13.088455",
      "Location": "77, Tana St, Purasaiwakkam, Chennai, Tamil Nadu 600084, India",
      "Longitude": "80.254684",
      "Pincode": "600084",
      "StarCategoryId": "3"
    },
    {
      "Address": "15, CMWSSB Division 128, Ward 128, Zone 10 Kodambakkam, Tamil Nadu 600001, India",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Food delivery"
        },
        {
          "FacilityName": "Hotel room service app"
        },
        {
          "FacilityName": "Hot water linen and laundry washing"
        },
        {
          "FacilityName": "Laundry service"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Professional-grade sanitizing services"
        },
        {
          "FacilityName": "Room service [24-hour]"
        },
        {
          "FacilityName": "Air conditioning in public area"
        },
        {
          "FacilityName": "Heating in public area"
        },
        {
          "FacilityName": "Valet parking"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "53600806",
      "HotelImage": "https://pix8.agoda.net/hotelImages/29380384/-1/091e1b2d8ae188550b3eecf2845a7bf7.jpg?ce=0&s=312x",
      "HotelKey": "ZHOuXX13usNfAqFIaBbceWKz0h7X5JIGx8kqmh1q+CP0hw74/oOuGUfvaKaxvSzseDQvgftZ3FWuDzpXe6Ryt8OP0BAhwj8auNhFFiD0buXVjBdS2Kb3DRogorH6QAASG1hiSzMFtGAJll9T6FLvNQZM45lUHQ5ukKlGYP1dOw6Uw=",
      "HotelName": "Super OYO Flagship Arunachala Guest House",
      "Latitude": "13.054322",
      "Location": "15, CMWSSB Division 128, Ward 128, Zone 10 Kodambakkam, Tamil Nadu 600001, India",
      "Longitude": "80.19258",
      "Pincode": "600001",
      "StarCategoryId": "3"
    },
    {
      "Address": "914 A Block Kalaivanar Street, Ram Nagar Police check post, Ram Nagar North, Madipakkam, , 600091 Chennai, India, Chennai",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Food delivery"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Hotel room service app"
        },
        {
          "FacilityName": "Hot water linen and laundry washing"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Professional-grade sanitizing services"
        },
        {
          "FacilityName": "Room service [24-hour]"
        },
        {
          "FacilityName": "Air conditioning in public area"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "55181464",
      "HotelImage": "https://q-xx.bstatic.com/xdata/images/hotel/max500/446970020.jpg?k=a2392840c57e3404affaef32a298933207d346be5fd6cf2236455a0824ca3e32&o=&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFhQ/0GBLBnH/Keei/zYKnnNOHgMJzlpyA41yl7nvAeMQ=",
      "HotelName": "Flagship Yazhini Service Apartment Near Jazz Cinemas Luxe",
      "Latitude": "12.96519",
      "Location": "914 A Block Kalaivanar Street, Ram Nagar Police check post, Ram Nagar North, Madipakkam, , 600091 Chennai, India, Chennai",
      "Longitude": "80.21082",
      "Pincode": "600091",
      "StarCategoryId": "3"
    },
    {
      "Address": "villa no 13  indas Riviera, near Rajkumar thottam padur Chennai Tamil Nadu 603103 India",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Room service"
        }
      ],
      "HotelId": "55510193",
      "HotelImage": "https://pix8.agoda.net/hotelImages/45025953/-1/c6f80bb7accd1aabeae9217db8c2b8b3.jpg?ce=0&s=312x",
      "HotelKey": "ZHaXOExeN9FW243yXQhopX/gN/0GIglymzt4SO3ZDnLjYO+Uk9TwCnU65V1BRN1tAsm8Zu2xp2LStFJmv8kphI8fsFzWoLqTSdxFTCzjV3QMdVx6D0IsyNcCMddUUo0vp4FskU2ItH5F73hBBa29979VcSoBJmMds9w7HEaCUwFUY=",
      "HotelName": "Super OYO Flagship Paradise Guest House",
      "Latitude": "12.803309",
      "Location": "villa no 13  indas Riviera, near Rajkumar thottam padur Chennai Tamil Nadu 603103 India",
      "Longitude": "80.23284",
      "Pincode": "603103",
      "StarCategoryId": "4"
    },
    {
      "Address": "95, No :11 Muthu street periyamedu central opposite to canara bank chennai",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Room service [24-hour]"
        },
        {
          "FacilityName": "Air conditioning in public area"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "32344684",
      "HotelImage": "https://pix8.agoda.net/hotelImages/12489573/-1/bae98277ccd2203bff1cbeaa4efc40ed.jpg?ce=0&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFm0ToyUI2HTwMvse1I4fMsh2uUCGu9wznXxgZ8tO7CYQ=",
      "HotelName": "SPOT ON Central Inn Near Albert Theatres",
      "Latitude": "13.08301",
      "Location": "95, No :11 Muthu street periyamedu central opposite to canara bank chennai",
      "Longitude": "80.26989",
      "Pincode": "600003",
      "StarCategoryId": "2"
    },
    {
      "Address": "Edapalaiyam",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Wi-Fi [free]"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Daily housekeeping"
        }
      ],
      "HotelId": "41562587",
      "HotelImage": "https://pix8.agoda.net/hotelImages/37012531/0/4f10de8d846b0e10fcf54e060780fb1e.jpg?ce=0&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFcsd809PrhWVoh9YMmwwExmqSgM9yEmkl4Jv4BL+8YhM=",
      "HotelName": "Akash Inn",
      "Latitude": "13.084676",
      "Location": "Edapalaiyam",
      "Longitude": "80.2773",
      "Pincode": "600003",
      "StarCategoryId": "2"
    },
    {
      "Address": "617&618, Arul Nagar Layout, Arul Nagar, Tambaram, Chennai-600059, Chennai",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Food delivery"
        },
        {
          "FacilityName": "Hotel room service app"
        },
        {
          "FacilityName": "Hot water linen and laundry washing"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Professional-grade sanitizing services"
        },
        {
          "FacilityName": "Room service [24-hour]"
        },
        {
          "FacilityName": "Air conditioning in public area"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "41590050",
      "HotelImage": "https://pix8.agoda.net/hotelImages/36992651/-1/b81f65f4145792a47a8e91552b3f8fa7.jpg?ce=0&s=312x",
      "HotelKey": "ZHaXOExeN9FW243yXQhopX/jyF/LXqJ/BzoBP9ygSilvcZ8kLiOBgVvdWIqrdg9LB66YFo3N6/P58k8LIqcLUpBHqcBo5XgsE635SIROHHD/1+ZcqngrA3KzNT2C6c3eC1gvgo4gfbFYdc9pA7NSytIaBKUnRLoeVBR0Adf7qObV8=",
      "HotelName": "OYO Flagship 805216 Senthamizh Residency",
      "Latitude": "12.907219",
      "Location": "617&618, Arul Nagar Layout, Arul Nagar, Tambaram, Chennai-600059, Chennai",
      "Longitude": "80.10936",
      "Pincode": "600059",
      "StarCategoryId": "3"
    },
    {
      "Address": "42401,No.2/16, Begum Sahib Sahib,4th lane, Mount Road, Border Thottam, Padupakkam, Triplicane,Chennai",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Wi-Fi in public areas"
        },
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "Smoke-free property"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Food delivery"
        },
        {
          "FacilityName": "Hotel room service app"
        },
        {
          "FacilityName": "Hot water linen and laundry washing"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Professional-grade sanitizing services"
        },
        {
          "FacilityName": "Room service [24-hour]"
        },
        {
          "FacilityName": "Air conditioning in public area"
        }
      ],
      "HotelId": "39425623",
      "HotelImage": "https://q-xx.bstatic.com/xdata/images/hotel/max500/506590837.jpg?k=8ef419a8cf66ce1f626d51083ef2e224fd7997112967c7ea7cc49fb3f5bd3f7a&o=&s=312x",
      "HotelKey": "ZHnn75lmE22j3xoPr4lhqdGHGEpvF1HZyBb0aq84z3ku+8IwrEs3Vxz/F3ggliEeoirrxTju6Yd1CBvyy5s+M5eGSOdnYrNPUIB54KPwJiZd8p9byHzRz68nGouwIQJBQslRTzyGCK3OmRQmzm+jyiIMctAcHZh0mmnnBehAp5yUk=",
      "HotelName": "SPOT ON 77468 Kunkumam Residency",
      "Latitude": "13.062398",
      "Location": "42401,No.2/16, Begum Sahib Sahib,4th lane, Mount Road, Border Thottam, Padupakkam, Triplicane,Chennai",
      "Longitude": "80.26737",
      "Pincode": "600002",
      "StarCategoryId": "3"
    },
    {
      "Address": "3/2, Meeyan sahib 1st street, (opp.to kalaivanar arangam) ChepaukNear Kalaivanar Arangam, Chepauk, Chennai, Chennai Chennai Tamil Nadu NA India",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Food delivery"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Hotel room service app"
        },
        {
          "FacilityName": "Hot water linen and laundry washing"
        },
        {
          "FacilityName": "Professional-grade sanitizing services"
        },
        {
          "FacilityName": "Room service"
        },
        {
          "FacilityName": "Air conditioning in public area"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "50068485",
      "HotelImage": "https://q-xx.bstatic.com/xdata/images/hotel/max500/490450341.jpg?k=f2e190680dd04a619c59a83b6908045f05759d2d2c9df1368ed87d284e46d53b&o=&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFdMN52lxQc1IdmBSbB4vj4dfV7Lb5kYC18LBFDffsuV4=",
      "HotelName": "OYO Flagship Mtc Guest House",
      "Latitude": "13.064972",
      "Location": "3/2, Meeyan sahib 1st street, (opp.to kalaivanar arangam) ChepaukNear Kalaivanar Arangam, Chepauk, Chennai, Chennai Chennai Tamil Nadu NA India",
      "Longitude": "80.277",
      "Pincode": "600014",
      "StarCategoryId": "4"
    },
    {
      "Address": "14 1st cross street, sachidananda puram, thalambur, chennai Chennai Tamil Nadu 600130 India",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Food delivery"
        },
        {
          "FacilityName": "Hotel room service app"
        },
        {
          "FacilityName": "Hot water linen and laundry washing"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Professional-grade sanitizing services"
        },
        {
          "FacilityName": "Room service [24-hour]"
        },
        {
          "FacilityName": "Air conditioning in public area"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "55510203",
      "HotelImage": "https://q-xx.bstatic.com/xdata/images/hotel/max500/491456162.jpg?k=b1a9679c9856e9f32eeeb5ff7d2cb6212dbfbe3f4f05a89048201618bd05b324&o=&s=312x",
      "HotelKey": "ZHaXOExeN9FW243yXQhopX/vjmPVfvIido2Onxu3p2UmSd0KKguRNEwBi4I00cbeQUi/h6B9RyQLkdEOFd5AVFWi2WvxrFYsmPy3xQ8F4DfLXw4vi1Gr+honUtwGNQQZjtyPX4j7dxJTWTrR+cxu/+YrplkJ3wVVrtssBZjzQElUk=",
      "HotelName": "OYO Flagship 813580 J2 Service Apartment",
      "Latitude": "12.846342",
      "Location": "14 1st cross street, sachidananda puram, thalambur, chennai Chennai Tamil Nadu 600130 India",
      "Longitude": "80.20888",
      "Pincode": "600130",
      "StarCategoryId": "3"
    },
    {
      "Address": "13/5 Perianna Maistry Street, Periamet, Chennai 600003, Tamil Nadu",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Complimentary wireless internet"
        },
        {
          "FacilityName": "WIFI"
        }
      ],
      "HotelId": "39613568",
      "HotelImage": "https://images.grnconnect.com/2101669/a7fab46d95d9d09131c229697029d62a.jpg",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtF9Aj42RuCMwdvoh9e9dGSQd3cq0vcO9Mik1rZ3VloJjo=",
      "HotelName": "Park Tower Guest House",
      "Latitude": "13.083738",
      "Location": "13/5 Perianna Maistry Street, Periamet, Chennai 600003, Tamil Nadu",
      "Longitude": "80.26924",
      "Pincode": "600003",
      "StarCategoryId": "0"
    },
    {
      "Address": "Kaliamman Street, 1st Floor, Elango Nagar, Virugambakkam, Chennai 600092",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [],
      "HotelId": "16171787",
      "HotelImage": "https://images.grnconnect.com/2081983/0bb973db0d4c883c9d21a954a1215d55.jpg",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFKWFTQ56UOSi8hWaTLF1o5Wj+U2TijxBSWtuzCSt9zhI=",
      "HotelName": "OYO 47947 Al. A Towers",
      "Latitude": "13.0539055",
      "Location": "Kaliamman Street, 1st Floor, Elango Nagar, Virugambakkam, Chennai 600092",
      "Longitude": "80.19252",
      "Pincode": "600092",
      "StarCategoryId": "0"
    },
    {
      "Address": "10, Udhaya Nagar Main Rd, Ramakrishna Nagar, Udaya Nagar, Porur, Chennai, Tamil Nadu,Chennai",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Breakfast [free]"
        },
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Food delivery"
        },
        {
          "FacilityName": "Hotel room service app"
        },
        {
          "FacilityName": "Meeting/banquet facilities"
        },
        {
          "FacilityName": "Hot water linen and laundry washing"
        },
        {
          "FacilityName": "Laundry service"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Professional-grade sanitizing services"
        },
        {
          "FacilityName": "Room service [24-hour]"
        },
        {
          "FacilityName": "Shuttle service"
        },
        {
          "FacilityName": "Taxi service"
        },
        {
          "FacilityName": "Ticket services"
        },
        {
          "FacilityName": "Air conditioning in public area"
        },
        {
          "FacilityName": "Car park [nearby]"
        },
        {
          "FacilityName": "Car park [on-site]"
        },
        {
          "FacilityName": "Valet parking"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "40196035",
      "HotelImage": "https://pix8.agoda.net/hotelImages/25011285/-1/43b90bf9f74b1e586f984b3507ea32e4.jpg?ce=0&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFvvrMG3Fwgnd16zS6jE8Sif/37GxthQ3YMcA2TjzXOgI=",
      "HotelName": "OYO Almighty Homes",
      "Latitude": "13.0253",
      "Location": "10, Udhaya Nagar Main Rd, Ramakrishna Nagar, Udaya Nagar, Porur, Chennai, Tamil Nadu,Chennai",
      "Longitude": "80.15856",
      "Pincode": "600116",
      "StarCategoryId": "3"
    },
    {
      "Address": "Dargah Rd, Kovalam",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "Smoke-free property"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Room service"
        },
        {
          "FacilityName": "Air conditioning in public area"
        }
      ],
      "HotelId": "50124506",
      "HotelImage": "https://pix8.agoda.net/hotelImages/42242480/0/4dee20809184dcb6ff5da9aaae167df8.jpg?ce=0&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFbwLtoVEondZaRKcbgetQIQc/M2YzJ30GdJ/t6Y4N7Ro=",
      "HotelName": "SEA GATE ECR ROOMS",
      "Latitude": "12.786711",
      "Location": "Dargah Rd, Kovalam",
      "Longitude": "80.24968",
      "Pincode": "603112",
      "StarCategoryId": "3"
    },
    {
      "Address": "#7 Wallers Road, Mount Road, Chintadripet",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Restaurant"
        }
      ],
      "HotelId": "15339135",
      "HotelImage": "http://cdn.smyrooms.com/cloudcontent/fotos/agregadorHotelero/0030/07855/3007855/30.jpg?f=16650492",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45e+WEFg43g/UJlob88gIZR3PD6gwL3KbQauxdCBxayqHMDi/1l2lBxOgSmScF56hoboSEsaBPTVcarzE810a4QrA5kbRw4S1aJlkCnYzD7mJiT+kE0JvVnUT400PUbZDnw==",
      "HotelName": "The Mount Regency",
      "Latitude": "13.07006",
      "Location": "#7 Wallers Road, Mount Road, Chintadripet",
      "Longitude": "80.27051",
      "Pincode": "600002",
      "StarCategoryId": "-1"
    },
    {
      "Address": "1, Ganapathraj Nagar, Kaliamman Koil Street, Kodambakkam, Chennai, Tamil Nadu - 600092",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Free bottled water"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet access – wireless"
        },
        {
          "FacilityName": "Wi-Fi [free]"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Room service"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "44143286",
      "HotelImage": "https://pix8.agoda.net/hotelImages/44926343/-1/20af3ddd3299530577bc7ffae20e36c2.jpg?ce=0&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtF1DGptYSOfvRLZoZRRiZkzCVs87WJUk4WzxrGq+wiFFE=",
      "HotelName": "FabExpress Arunachala Guest House",
      "Latitude": "13.05432",
      "Location": "1, Ganapathraj Nagar, Kaliamman Koil Street, Kodambakkam, Chennai, Tamil Nadu - 600092",
      "Longitude": "80.19257",
      "Pincode": "600092",
      "StarCategoryId": "3"
    },
    {
      "Address": "Hospital Road, Indirapriyadharshini Nagar,, Kailash Nagar,, Perumbakkam, Chennai 600100, India",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [],
      "HotelId": "41472956",
      "HotelImage": "",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFGY63BR2dMIr7oEowTTarjuVFmJtDJNMDUG0CuUJORqg=",
      "HotelName": "Collection O Hotel Silver Key Executive",
      "Latitude": "13.029",
      "Location": "Hospital Road, Indirapriyadharshini Nagar,, Kailash Nagar,, Perumbakkam, Chennai 600100, India",
      "Longitude": "80.2341",
      "Pincode": "600100",
      "StarCategoryId": "0"
    },
    {
      "Address": "1119, Poonamallee High Rd, Periyamet",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Hot water linen and laundry washing"
        },
        {
          "FacilityName": "Laundry service"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Professional-grade sanitizing services"
        },
        {
          "FacilityName": "Room service"
        },
        {
          "FacilityName": "Air conditioning in public area"
        }
      ],
      "HotelId": "41308464",
      "HotelImage": "https://pix8.agoda.net/hotelImages/44319834/0/4953c3677b0d81e206058017f3828aeb.jpg?ce=0&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFlPYtZ6EcRTjK2ctWTQKEIBVvFC6X2uWF3mcGtS91/lI=",
      "HotelName": "Aum karthikeya residency",
      "Latitude": "13.080923",
      "Location": "1119, Poonamallee High Rd, Periyamet",
      "Longitude": "80.26981",
      "Pincode": "600003",
      "StarCategoryId": "3"
    },
    {
      "Address": "#16/1, Bommu Chetty Street, wall tax road Near centre",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Ironing service"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Car park [nearby]"
        },
        {
          "FacilityName": "Cashless payment service"
        }
      ],
      "HotelId": "15394053",
      "HotelImage": "https://pix8.agoda.net/hotelImages/279/27999447/27999447_210925211900105777504.jpg?s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFr9z+VVo3uWC0XdDXavYJkylC5my6GMC67IrKl0ZTt5U=",
      "HotelName": "Sun City Hotel",
      "Latitude": "13.085629",
      "Location": "#16/1, Bommu Chetty Street, wall tax road Near centre",
      "Longitude": "80.27643",
      "Pincode": "600003",
      "StarCategoryId": "0"
    },
    {
      "Address": "No 2, Cn Krishna Swami Sai Road, Chepauk,",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "WIFI"
        }
      ],
      "HotelId": "15701011",
      "HotelImage": "http://cdn.smyrooms.com/cloudcontent/fotos/agregadorHotelero/0030/47108/3047108/24.jpg?f=16743704",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFw62lkYsuT2H1Y6P7j7VKyDFJ1HJk4kH+JwxkdpErNBk=",
      "HotelName": "New Regency",
      "Latitude": "13.06371",
      "Location": "No 2, Cn Krishna Swami Sai Road, Chepauk,",
      "Longitude": "80.27735",
      "Pincode": "600005",
      "StarCategoryId": "2"
    },
    {
      "Address": "Quaid-E-Millath Road",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Laundry service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Room service"
        },
        {
          "FacilityName": "Car park [charges apply]"
        },
        {
          "FacilityName": "Car park [nearby]"
        },
        {
          "FacilityName": "Rental car "
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "15789163",
      "HotelImage": "https://pix8.agoda.net/hotelImages/284/2849177/2849177_17092918490056925100.jpg?ca=6&ce=1&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFB06YWvcMe+rnzVpUbh/4hytt81bBa0W4hsASV0nFXFI=",
      "HotelName": "Hotel Thaj Regency",
      "Latitude": "13.062812",
      "Location": "Quaid-E-Millath Road",
      "Longitude": "80.27429",
      "Pincode": "600005",
      "StarCategoryId": "2"
    },
    {
      "Address": "9-3 Fathima Nagar Chennai Tamil Nadu 600087 India",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Room service [24-hour]"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "54146344",
      "HotelImage": "https://q-xx.bstatic.com/xdata/images/hotel/max500/496765625.jpg?k=975e0b5117e6aa71df11cb6b75d84f59d886c83b7e54622be8439469c6cdf4b4&o=&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFjUJDft3SG1HVgzy/FurcezZ0SwB+b1Az5d9qwCyWljU=",
      "HotelName": "OYO Flagship Valasaravakkam",
      "Latitude": "13.045613",
      "Location": "9-3 Fathima Nagar Chennai Tamil Nadu 600087 India",
      "Longitude": "80.181175",
      "Pincode": "600087",
      "StarCategoryId": "4"
    },
    {
      "Address": "4 Arumugam Streetnear Lic Mount Road,",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Restaurant"
        }
      ],
      "HotelId": "15394197",
      "HotelImage": "http://cdn.smyrooms.com/cloudcontent/fotos/agregadorHotelero/0021/79760/2179760/39.jpg?f=15761679",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45b+U1xkPMU76gLEPPsCJqkqEzDlNVjCGVIWg6bjbPcZkITu/vtbLb4N3+dI1cw2djJvfoKWJDNT2Op25uMje7FBQU3a8l/99eYLl7vCdK2xEKFY2l2afowPo04Dgw0ZmLfvWvhhWCkTXdrWIv5xytlk=",
      "HotelName": "Mount Residency",
      "Latitude": "13.06325",
      "Location": "4 Arumugam Streetnear Lic Mount Road,",
      "Longitude": "80.26605",
      "Pincode": "600002",
      "StarCategoryId": "3"
    },
    {
      "Address": "No 3, Veeramamunivar Street, Nanganallur, Palavanthangal",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Restaurant"
        }
      ],
      "HotelId": "15102208",
      "HotelImage": "http://cdn.smyrooms.com/cloudcontent/fotos/agregadorHotelero/0021/53517/2153517/1.jpg?f=15284214",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45e+WEFg43g/UJlob88gIZR3PD6gwL3KbQauxdCBxayqHMDi/1l2lBxOgSmScF56hoboSEsaBPTVcarzE810a4Qrit+jkLHJgka0AoxZ0H9YLtbanZlGrq9kSl8b5LWZiFQ==",
      "HotelName": "Just Guest House, Chennai Airport",
      "Latitude": "12.98719",
      "Location": "No 3, Veeramamunivar Street, Nanganallur, Palavanthangal",
      "Longitude": "80.18836",
      "Pincode": "600114",
      "StarCategoryId": "1"
    },
    {
      "Address": "8 Shandy Road, Pallavaram",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [],
      "HotelId": "15394243",
      "HotelImage": "http://cdn.smyrooms.com/cloudcontent/fotos/agregadorHotelero/0038/37548/3837548/20.jpg?f=15676433",
      "HotelKey": "ZHzWIg9WFqztfh70pHxY3C+IX9C0CW1lECPNjWSpw0W9qaB/F7/I8I/t+Vtl+QF0PGRXIBhBeecSCUUwfgSVOxzFfMnPfFDNHeYBlyUxdq+JgyggWNZtipBKaHj0kysiyRzU1hvsL7r4jKjWRdw8Sf9NMoj8v+i6p+tlJULfBsz8I=",
      "HotelName": "Deluxe Hotel",
      "Latitude": "12.9715",
      "Location": "8 Shandy Road, Pallavaram",
      "Longitude": "80.1506",
      "Pincode": "600043",
      "StarCategoryId": "3"
    },
    {
      "Address": "#1 Narayanasamy NAyakar 2nd Cross street, Behind Infosys, Sholinganallur, Chennai",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Free bottled water"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet access – wireless"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "Wi-Fi [free]"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Room service"
        },
        {
          "FacilityName": "Air conditioning in public area"
        },
        {
          "FacilityName": "Car park [on-site]"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "41412561",
      "HotelImage": "https://pix8.agoda.net/hotelImages/32758343/-1/e07248fd1ee444fdbcb91f35c1ab213a.jpg?ce=0&s=312x",
      "HotelKey": "ZHOuXX13usNfAqFIaBbceWK6tMlGUB0nQ5CSTo/XphaDfULPJaaVhv0vYx4o1kdgf3Lvpy3F0TiMsX4sx7rnZOy75PDsR3T260ysH8rZccjbYdZgHQ8nuWUmI3Vdie/9QrCGTC9y5f/v3h/CWRUtriDYFkbkxkDkzCZtc9p5DR7vg=",
      "HotelName": "FabHotel Hibiscus Stays",
      "Latitude": "12.89212",
      "Location": "#1 Narayanasamy NAyakar 2nd Cross street, Behind Infosys, Sholinganallur, Chennai",
      "Longitude": "80.22936",
      "Pincode": "600119",
      "StarCategoryId": "3"
    },
    {
      "Address": "Sakthi Nagar Main Street. Jothi NagarThoraipakkam. 600097. Chennai. . IN",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [],
      "HotelId": "15523672",
      "HotelImage": "https://us.dotwconnect.com/poze_hotel/32/3243895/sPQ1YhX6_55b8c9ff1c6b67811b4a7d128cbbcd90.jpeg",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45e+WEFg43g/UJlob88gIZR3PD6gwL3KbQauxdCBxayqHMDi/1l2lBxOgSmScF56hoboSEsaBPTVcarzE810a4QoEkrcfiDL1Pe3PShkuBFRfYeyTy+OaxWmtIh4HQ7oEUQ==",
      "HotelName": "Oyo 4584 India Gate",
      "Latitude": "12.94506",
      "Location": "Sakthi Nagar Main Street. Jothi NagarThoraipakkam. 600097. Chennai. . IN",
      "Longitude": "80.2411",
      "Pincode": "600097",
      "StarCategoryId": "3"
    },
    {
      "Address": "15 Nainar Nadar Street, Loganathan Colony, Mylapore, Chennai 600005, Tamil Nadu",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Cloakroom service"
        }
      ],
      "HotelId": "38781807",
      "HotelImage": "",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFNYYHNdwKbRInk6YQIgQ8W0bNYZ8+WrIeU+TS9qgRxbA=",
      "HotelName": "Fabexpress P.a.s Residency",
      "Latitude": "13.0423765",
      "Location": "15 Nainar Nadar Street, Loganathan Colony, Mylapore, Chennai 600005, Tamil Nadu",
      "Longitude": "80.27343",
      "Pincode": "600005",
      "StarCategoryId": "0"
    },
    {
      "Address": "126 Big Street, Triplicane, Chennai City Center, Chennai 600005",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [],
      "HotelId": "39703064",
      "HotelImage": "",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45e+WEFg43g/UJlob88gIZR3PD6gwL3KbQauxdCBxayqHMDi/1l2lBxOgSmScF56hoboSEsaBPTVcarzE810a4QqEXgrI+XNUnNzoXpRovHb1ny2ovKxtdeAOYLykdsd8BQ==",
      "HotelName": "Sai Nalam Hotels by OYO Rooms",
      "Latitude": "13.058673",
      "Location": "126 Big Street, Triplicane, Chennai City Center, Chennai 600005",
      "Longitude": "80.27564",
      "Pincode": "600005",
      "StarCategoryId": "0"
    },
    {
      "Address": "1/30 Perumal Nagar Road, Nesamani Nagar, Perumbakkam, Chennai 600100, Tamil Nadu",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Complimentary wireless internet"
        },
        {
          "FacilityName": "Free parking"
        },
        {
          "FacilityName": "Smoke-free property"
        },
        {
          "FacilityName": "Laundry/Valet service"
        }
      ],
      "HotelId": "39645965",
      "HotelImage": "https://images.grnconnect.com/1389802/fc951a2d1f4ea69ffc5a1c51df4bd5d1.jpg",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFAM0MPT7oaiuAfAMkSN0p4No5UwUqZRVQyND+t0SKsEQ=",
      "HotelName": "Eben Service Apartment",
      "Latitude": "12.899928",
      "Location": "1/30 Perumal Nagar Road, Nesamani Nagar, Perumbakkam, Chennai 600100, Tamil Nadu",
      "Longitude": "80.198555",
      "Pincode": "600100",
      "StarCategoryId": "3"
    },
    {
      "Address": "#13, Pozhichalur Main Road, Nehru Nagar, Pozhichalur",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Restaurant"
        }
      ],
      "HotelId": "16284364",
      "HotelImage": "http://cdn.smyrooms.com/cloudcontent/fotos/agregadorHotelero/0021/54964/2154964/21.jpg?f=16654927",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45e+WEFg43g/UJlob88gIZR3PD6gwL3KbQauxdCBxayqHMDi/1l2lBxOgSmScF56hoboSEsaBPTVcarzE810a4QquTbaBhzIUk64g6rJ93EEmZrqnbFvwv248qgMR7x/VFA==",
      "HotelName": "Royal Green Accommodation",
      "Latitude": "12.98169",
      "Location": "#13, Pozhichalur Main Road, Nehru Nagar, Pozhichalur",
      "Longitude": "80.1384",
      "Pincode": "600074",
      "StarCategoryId": "1"
    },
    {
      "Address": "2, Ramakrishna Mutt Rd, Mylapore",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "WIFI"
        }
      ],
      "HotelId": "38345746",
      "HotelImage": "https://photos.hotelbeds.com/giata/66/668175/668175a_hb_a_001.jpg",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45e+WEFg43g/UJlob88gIZR3PD6gwL3KbQauxdCBxayqHMDi/1l2lBxOgSmScF56hoboSEsaBPTVcarzE810a4QpMJtI3KBMb8HmqS9v03Pn2oq7AOiTXbGrSJlca+mglQg==",
      "HotelName": "FabExpress Picnic Plaza, Chennai",
      "Latitude": "13.036344",
      "Location": "2, Ramakrishna Mutt Rd, Mylapore",
      "Longitude": "80.26581",
      "Pincode": "600004",
      "StarCategoryId": "3"
    },
    {
      "Address": "Shastri Nagar 1st Ave",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Allergy-free rooms"
        },
        {
          "FacilityName": "Free face masks"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "Smoke-free property"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Food delivery"
        },
        {
          "FacilityName": "Individually-wrapped food options"
        },
        {
          "FacilityName": "Restaurants"
        },
        {
          "FacilityName": "Dry cleaning"
        },
        {
          "FacilityName": "Hot water linen and laundry washing"
        },
        {
          "FacilityName": "Laundry service"
        },
        {
          "FacilityName": "Breakfast takeaway service"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Grooming service"
        },
        {
          "FacilityName": "Ironing service"
        },
        {
          "FacilityName": "Professional-grade sanitizing services"
        },
        {
          "FacilityName": "Room service"
        },
        {
          "FacilityName": "Ticket services"
        },
        {
          "FacilityName": "Air conditioning in public area"
        },
        {
          "FacilityName": "Car park [on-site]"
        }
      ],
      "HotelId": "38712902",
      "HotelImage": "https://pix8.agoda.net/hotelImages/32015388/0/2b5393f4fa5da0bcfd9a05ff3c3859c7.jpg?ca=29&ce=0&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFXS/pks6YH/C/ehVD8LvbACVdC04tAOpty++aAcxGKtM=",
      "HotelName": "Skyry Hotels",
      "Latitude": "13.001003",
      "Location": "Shastri Nagar 1st Ave",
      "Longitude": "80.26293",
      "Pincode": "600020",
      "StarCategoryId": "0"
    },
    {
      "Address": "14 Kumarappa St. . 600007. Chennai. . IN",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [],
      "HotelId": "16306923",
      "HotelImage": "https://us.dotwconnect.com/poze_hotel/32/3239845/OpoHnR45_46a5db5797362546a728bdd0d423e693.jpeg",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bQH+9526M0VxvEoMXDhYSwGNzutrKWSpVjPrkV4wec47pP6XKwHmJDNgkvjA+plBk9PGyAnNJBxOmWg+l29L/Uav6oB1kJFEN/A8xIjgQL/kqhh0JsmTv4G4S9VLNdtpQ==",
      "HotelName": "Hotel White Park",
      "Latitude": "13.08393",
      "Location": "14 Kumarappa St. . 600007. Chennai. . IN",
      "Longitude": "80.26972",
      "Pincode": "600007",
      "StarCategoryId": "3"
    },
    {
      "Address": "25B, South Boag Road, T Nagar, Chennai 600017",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Allergy-free rooms"
        },
        {
          "FacilityName": "Free bottled water"
        },
        {
          "FacilityName": "Free face masks"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "Smoke-free property"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Food delivery"
        },
        {
          "FacilityName": "Individually-wrapped food options"
        },
        {
          "FacilityName": "Hot water linen and laundry washing"
        },
        {
          "FacilityName": "Laundry service"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Professional-grade sanitizing services"
        },
        {
          "FacilityName": "Room service [24-hour]"
        },
        {
          "FacilityName": "Wake-up service"
        },
        {
          "FacilityName": "Air conditioning in public area"
        },
        {
          "FacilityName": "Car park [on-site]"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "41630697",
      "HotelImage": "https://pix8.agoda.net/hotelImages/281/28177911/28177911_210927215100105804360.jpg?s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFSAQLOqR+orzKubqbXxDQ5tWjTwkUirTL2t2crAYodpE=",
      "HotelName": "SKYRY HOTELS",
      "Latitude": "13.033046",
      "Location": "25B, South Boag Road, T Nagar, Chennai 600017",
      "Longitude": "80.239105",
      "Pincode": "600017",
      "StarCategoryId": "4"
    },
    {
      "Address": "29/1, Bazullah Road, T. Nagar, Viveks Showroom Backside Chennai Tamil Nadu 600017 India",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Car park [free of charge]"
        },
        {
          "FacilityName": "Free Wi-Fi in all rooms!"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet services"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Food delivery"
        },
        {
          "FacilityName": "Hotel room service app"
        },
        {
          "FacilityName": "Hot water linen and laundry washing"
        },
        {
          "FacilityName": "Cashless payment service"
        },
        {
          "FacilityName": "Daily housekeeping"
        },
        {
          "FacilityName": "Professional-grade sanitizing services"
        },
        {
          "FacilityName": "Room service"
        },
        {
          "FacilityName": "Air conditioning in public area"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "55258231",
      "HotelImage": "https://q-xx.bstatic.com/xdata/images/hotel/max500/508008348.jpg?k=ea6336139afc01faeb50f8b76a72ae07ae1622b32e59d1044dbe73a29d374564&o=&s=312x",
      "HotelKey": "ZHOuXX13usNfAqFIaBbceWKyMfEu+GqMsNUurJaPs5oUFZU5YBgvJqNthjye+aFoo4FofBbABCYWtfiRUSS/yzrBnvvQs97ZmPnJgJzq2osv15QswG4bwBiXyzBac6X98rcyFnSV8YVA9Iac5BCoQEg0zOPSNOZMvtAR5A0VNMkUU=",
      "HotelName": "Townhouse 1248 Majestic Inn",
      "Latitude": "13.0468",
      "Location": "29/1, Bazullah Road, T. Nagar, Viveks Showroom Backside Chennai Tamil Nadu 600017 India",
      "Longitude": "80.23753",
      "Pincode": "600017",
      "StarCategoryId": "4"
    },
    {
      "Address": "6/8 Burma Thamizhar colony, Nanganallur, Chennai 600061",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Cloakroom service"
        }
      ],
      "HotelId": "16245565",
      "HotelImage": "",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFLtszG2Z+18qSo7HuAk6MGc1PoW89zFGGeDkfTenfNzo=",
      "HotelName": "Joel Inn By OYO Rooms",
      "Latitude": "13.029",
      "Location": "6/8 Burma Thamizhar colony, Nanganallur, Chennai 600061",
      "Longitude": "80.2341",
      "Pincode": "600061",
      "StarCategoryId": "0"
    },
    {
      "Address": "Rama Pillai St,",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Restaurant"
        }
      ],
      "HotelId": "15136580",
      "HotelImage": "http://cdn.smyrooms.com/cloudcontent/fotos/agregadorHotelero/0030/20475/3020475/1.jpg?f=16938561",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45e+WEFg43g/UJlob88gIZR3PD6gwL3KbQauxdCBxayqHMDi/1l2lBxOgSmScF56hoboSEsaBPTVcarzE810a4QoMOcEcRVmoHcdvDGGjM6F1v9wJMtw40BI9//yvR76ADg==",
      "HotelName": "Hotel White Mount",
      "Latitude": "13.08346",
      "Location": "Rama Pillai St,",
      "Longitude": "80.2705",
      "Pincode": "600003",
      "StarCategoryId": "-1"
    },
    {
      "Address": "27RF+WCQ, Nainar Nadar St, Loganathan Colony, Mylapore, Chennai, Tamil Nadu 600005",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Free bottled water"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet access – wireless"
        },
        {
          "FacilityName": "Wi-Fi [free]"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Room service"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "54089692",
      "HotelImage": "https://pix8.agoda.net/hotelImages/46254619/-1/d02c987ead71bec4c0658ef717a64924.jpg?ce=0&s=312x",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45bElxYs8b0aFGyAWEw/rML6Mm+2vK47aDrnx4hM8ZctbC2s8rFw1G5eimcDKj61yDOEJRI9Le/8VU/Njd89MBGuCf2cT7CfXH294LdYQohtFrJu6fJa1ddxEp41M8ZMPDweu46Jlj8vbTwr4sFXLykY=",
      "HotelName": "FabExpress Citi Centre",
      "Latitude": "13.042377",
      "Location": "27RF+WCQ, Nainar Nadar St, Loganathan Colony, Mylapore, Chennai, Tamil Nadu 600005",
      "Longitude": "80.27351",
      "Pincode": "600005",
      "StarCategoryId": "3"
    },
    {
      "Address": "CMWSSB Division 195, Ward 195, Zone 15 Sholinganallur, Sholinganallur, Karapakkam, Chennai - 600119",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Free bottled water"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet access – wireless"
        },
        {
          "FacilityName": "Wi-Fi [free]"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Room service"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "41590183",
      "HotelImage": "https://pix8.agoda.net/hotelImages/37648767/-1/05481953e41348ed0ef838c50844714a.jpg?ce=0&s=312x",
      "HotelKey": "ZHOuXX13usNfAqFIaBbceWKxtTpuabsmLoJSuYldP2WI3+j9uk2mXl/xeU+oln29Nyzm5LuAx5QO49/ao/4N8P8yyurX9RJouYcIMIoJef94JvVt6JFltWkeFy1TyTIJW7WK1ogt7dYIdc7o6vIkJ8CawdMQKcVPUGqyoMIqOgUYQ=",
      "HotelName": "FabExpress KB Residency OMR",
      "Latitude": "12.91967",
      "Location": "CMWSSB Division 195, Ward 195, Zone 15 Sholinganallur, Sholinganallur, Karapakkam, Chennai - 600119",
      "Longitude": "80.22802",
      "Pincode": "600119",
      "StarCategoryId": "3"
    },
    {
      "Address": "No 5 Vadivel Street, H L Colony, Pammal",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Restaurant"
        },
        {
          "FacilityName": "Bar"
        }
      ],
      "HotelId": "15546784",
      "HotelImage": "http://cdn.smyrooms.com/cloudcontent/fotos/agregadorHotelero/0030/21811/3021811/1.jpg?f=14975335",
      "HotelKey": "ZHalNN8/9zq8XkUxF2aVI45b+U1xkPMU76gLEPPsCJqkqEzDlNVjCGVIWg6bjbPcZkITu/vtbLb4N3+dI1cw2djJvfoKWJDNT2Op25uMje7FBQU3a8l/99eYLl7vCdK2xEn5NaN68OXOci99L3KImSVfk8z+JcwTYe5loYkeQbKwA=",
      "HotelName": "Saibala Inn",
      "Latitude": "12.97794",
      "Location": "No 5 Vadivel Street, H L Colony, Pammal",
      "Longitude": "80.14377",
      "Pincode": "600075",
      "StarCategoryId": "3"
    },
    {
      "Address": "10/4, 1st Street Thiruneermalai, Road, Sripuram, Chromepet, Chennai, Tamil Nadu, 600044",
      "CheckInTime": "",
      "CheckOutTime": "",
      "Distance": "0",
      "HotelFacilities": [
        {
          "FacilityName": "Free bottled water"
        },
        {
          "FacilityName": "Internet"
        },
        {
          "FacilityName": "Internet access – wireless"
        },
        {
          "FacilityName": "WIFI"
        },
        {
          "FacilityName": "Room service"
        },
        {
          "FacilityName": "Wi-Fi in public areas"
        }
      ],
      "HotelId": "55185394",
      "HotelImage": "https://pix8.agoda.net/hotelImages/44510711/-1/f839faa735495d7d29b3dd73c44bc8b0.jpg?ce=0&s=312x",
      "HotelKey": "ZHOuXX13usNfAqFIaBbceWK5yUjGBuCVTopcoGs6ujAVrxWDLY4ZR7XslOdxwxb/DYSIR/7Q745lKuENIZbd0cZFZTISGxKwuF1rVFkaNau/gEXrbwvrf5MS+qTcnSLahsX+NDvvijdOdxOSwUyemL1HSUdDXAdBGnR+CUNuwNgwk=",
      "HotelName": "FabHotel SVR",
      "Latitude": "12.95934",
      "Location": "10/4, 1st Street Thiruneermalai, Road, Sripuram, Chromepet, Chennai, Tamil Nadu, 600044",
      "Longitude": "80.13127",
      "Pincode": "600044",
      "StarCategoryId": "3"
    }
  ],
  "HotelFareDetails": [
    {
      "BasicAmount": 1782.32,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "32373260",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 40.1,
      "TotalAmount": 1822.42
    },
    {
      "BasicAmount": 1784.85,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "31327544",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 40.16,
      "TotalAmount": 1825.01
    },
    {
      "BasicAmount": 1800.81,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "16182263",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 40.52,
      "TotalAmount": 1841.33
    },
    {
      "BasicAmount": 1817.76,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "32433280",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 40.9,
      "TotalAmount": 1858.66
    },
    {
      "BasicAmount": 1684.38,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "41633452",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 202.14,
      "TotalAmount": 1886.52
    },
    {
      "BasicAmount": 1777.8,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "16145881",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 213.33,
      "TotalAmount": 1991.13
    },
    {
      "BasicAmount": 1796.25,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "55254821",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 215.55,
      "TotalAmount": 2011.8
    },
    {
      "BasicAmount": 1828.02,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "54074513",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 219.36,
      "TotalAmount": 2047.38
    },
    {
      "BasicAmount": 1840.26,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "39730241",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 220.83,
      "TotalAmount": 2061.09
    },
    {
      "BasicAmount": 1887.12,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "53600806",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 226.44,
      "TotalAmount": 2113.56
    },
    {
      "BasicAmount": 1909.11,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "55181464",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 229.08,
      "TotalAmount": 2138.19
    },
    {
      "BasicAmount": 1926.9,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "55510193",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 231.21,
      "TotalAmount": 2158.11
    },
    {
      "BasicAmount": 1949.34,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "32344684",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 233.94,
      "TotalAmount": 2183.28
    },
    {
      "BasicAmount": 2086.2,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "41562587",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 250.35,
      "TotalAmount": 2336.55
    },
    {
      "BasicAmount": 2113.65,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "41590050",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 253.62,
      "TotalAmount": 2367.27
    },
    {
      "BasicAmount": 2147.94,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "39425623",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 257.76,
      "TotalAmount": 2405.7
    },
    {
      "BasicAmount": 2184.96,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "50068485",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 262.2,
      "TotalAmount": 2447.16
    },
    {
      "BasicAmount": 2272.05,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "55510203",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 272.67,
      "TotalAmount": 2544.72
    },
    {
      "BasicAmount": 2322.12,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "39613568",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 278.64,
      "TotalAmount": 2600.76
    },
    {
      "BasicAmount": 2374.23,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "16171787",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 284.91,
      "TotalAmount": 2659.14
    },
    {
      "BasicAmount": 2422.26,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "40196035",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 290.7,
      "TotalAmount": 2712.96
    },
    {
      "BasicAmount": 2607.75,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "50124506",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 312.93,
      "TotalAmount": 2920.68
    },
    {
      "BasicAmount": 2893.09,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "15339135",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 65.09,
      "TotalAmount": 2958.18
    },
    {
      "BasicAmount": 2663.07,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "44143286",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 319.56,
      "TotalAmount": 2982.63
    },
    {
      "BasicAmount": 2749.08,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "41472956",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 329.88,
      "TotalAmount": 3078.96
    },
    {
      "BasicAmount": 2766.87,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "41308464",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 332.01,
      "TotalAmount": 3098.88
    },
    {
      "BasicAmount": 2998.89,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "15394053",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 359.88,
      "TotalAmount": 3358.77
    },
    {
      "BasicAmount": 3026.85,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "15701011",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 363.21,
      "TotalAmount": 3390.06
    },
    {
      "BasicAmount": 3129.3,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "15789163",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 375.51,
      "TotalAmount": 3504.81
    },
    {
      "BasicAmount": 3142.11,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "54146344",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 377.07,
      "TotalAmount": 3519.18
    },
    {
      "BasicAmount": 3527.2533,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "15394197",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 0,
      "TotalAmount": 3527.2533
    },
    {
      "BasicAmount": 3460.83,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "15102208",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 77.87,
      "TotalAmount": 3538.7
    },
    {
      "BasicAmount": 3541.8781,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "15394243",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 0,
      "TotalAmount": 3541.8781
    },
    {
      "BasicAmount": 3180.6,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "41412561",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 381.69,
      "TotalAmount": 3562.29
    },
    {
      "BasicAmount": 3488.68,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "1",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "15523672",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 78.5,
      "TotalAmount": 3567.18
    },
    {
      "BasicAmount": 3187.17,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "38781807",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 382.47,
      "TotalAmount": 3569.64
    },
    {
      "BasicAmount": 3529.19,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "39703064",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 79.41,
      "TotalAmount": 3608.6
    },
    {
      "BasicAmount": 3259.68,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "39645965",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 391.17,
      "TotalAmount": 3650.85
    },
    {
      "BasicAmount": 3617.49,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "16284364",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 81.39,
      "TotalAmount": 3698.88
    },
    {
      "BasicAmount": 3694.82,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "38345746",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 83.13,
      "TotalAmount": 3777.95
    },
    {
      "BasicAmount": 3390.06,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "38712902",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 406.8,
      "TotalAmount": 3796.86
    },
    {
      "BasicAmount": 3804.4264,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "1",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "16306923",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 0,
      "TotalAmount": 3804.4264
    },
    {
      "BasicAmount": 3408,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "41630697",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 408.96,
      "TotalAmount": 3816.96
    },
    {
      "BasicAmount": 3435.48,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "55258231",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 412.26,
      "TotalAmount": 3847.74
    },
    {
      "BasicAmount": 3446.64,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "16245565",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 413.58,
      "TotalAmount": 3860.22
    },
    {
      "BasicAmount": 3791.28,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "15136580",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 85.3,
      "TotalAmount": 3876.58
    },
    {
      "BasicAmount": 3520.44,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "54089692",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 422.46,
      "TotalAmount": 3942.9
    },
    {
      "BasicAmount": 3533.37,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "41590183",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 423.99,
      "TotalAmount": 3957.36
    },
    {
      "BasicAmount": 3966.6841,
      "Breakfast": true,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "15546784",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 0,
      "TotalAmount": 3966.6841
    },
    {
      "BasicAmount": 3578.19,
      "Breakfast": false,
      "CommissionTDS": 0,
      "FreeCancellation": "2",
      "GST": 0,
      "GrossCommission": 0,
      "HotelId": "55185394",
      "NetCommission": 0,
      "ServiceFeeAmount": 0,
      "ServiceFeeGST": 0,
      "ServiceFeeMarkupAmount": 0,
      "TaxAmount": 429.39,
      "TotalAmount": 4007.58
    }
  ],

  HotelSeedValue: "",
  MoreHotels: false,

  ResponseHeader: {
    ErrorCode: "0000",
    ErrorDesc: "SUCCESS",
    ErrorInnerException: "",
    StatusId: "11",
  },

  SearchKey:
    "vV0AYHIew6kfw/1LL65Vlc0+9pEqjb5EhZYmxTlivk2bPp6ioYLklxYPLW1gZqg/MSwy4e7q6umcwwJZsCllFt/qjjMbf9sEk9Ur9CCJ9rhFcWaiDKmropVrnl+4sFzn5h3v3bft/5Kpb0PfYqtLbX08P020Q5WEXoPxnnmhfgdik7fltlmQqS6Q6UsfIIUPYZoCFCdO69QShGWFtJg69BqiFxft7ZhCQYCA82rXENHI9nmcJLHmAR1x/WxwMcaTG8Q+8iLK1lfgFbcGmPQmKES85FP8ZbSM5II33+vKHQ9lxyG9mO+q03tpVUhvOcWsoIMh58OUPrad+eaGiCic+iH3e9pfdBy7EjlVgaCg/yoJS4FX3B3e+Fz327wwRMwXmTsivp6lC2cGa2RRrpZ/eaXO4PO2swbOaQoy++33VDAHnwqVx7OKZ9TS3yvBeCyaYj2AUzkUx1ZF1pnbd9m6CkXK5WMXJxYDQZ17P+/6Dg+XJj4E/cijdtscKQJwhyWmdrYo3Rg6N26CKSQdvu1RTIMoqiFOM+HQsPTSlem9HPrzGm/IUHYGvPDGV6y+/mteTVgBKkEK2TSa63eCbjloQVYuT3/qiZsz/qobRMYKPbhqFst87ylqHDEPlbkzgw4bASeBWNiUIVzqJ9otSpspP9eR3rgYykLp0F2f8IDpDt8=",

  TotalHotelCount: 374,
};

const hotels = mergeHotels(data);

cache = {
  searchKey: data.SearchKey,
  isComplete: true,
  hotels,
};

  //   const { data, auth } = await fetchSupplierHotelsWithRetry(body);

  //   // console.log("\n================ SUPPLIER RESPONSE ================");

  //   // console.log(JSON.stringify(data, null, 2));

  //   // console.log("===================================================\n");

  //   const hotels = mergeHotels(data);

  //   // console.log("📦 FIRST PAGE HOTELS:", hotels.length);

  //   if (!hotels || hotels.length === 0) {
  //     throw new Error("No hotels received from supplier");
  //   }

  //   cache = await HotelCache.findOneAndUpdate(
  //     {
  //       cityId: body.cityId,
  //       checkInDate: body.CheckInDate,
  //       checkOutDate: body.CheckOutDate,
  //       roomCount: body.RoomCount,
  //     },
  //     {
  //       $setOnInsert: {
  //         cityId: body.cityId,
  //         cityName: body.cityName,
  //         checkInDate: body.CheckInDate,
  //         checkOutDate: body.CheckOutDate,
  //         roomCount: body.RoomCount,
  //         searchKey: data?.SearchKey,
  //         isComplete: false,
  //         hotels,
  //       },
  //     },
  //     {
  //       new: true,
  //       upsert: true,
  //     },
  //   );

  //   /* =====================================================
  //      🚀 BACKGROUND PAGINATION
  //   ===================================================== */
  //   if (data?.MoreHotels || data?.HotelSeedValue) {
  //     // console.log("🚀 STARTING BACKGROUND PAGINATION");

  //     fetchRemainingHotelsInBackground(body, data, auth);
  //   }
  // }

  /* =====================================================
     🔍 FILTER → SORT → PAGINATION
  ===================================================== */
  let hotelsData = cache.hotels || [];

  const rate = await getCurrencyRate({
    from: "INR",
    to: body.currency,
  });
  // console.log("\n💰 AFTER CURRENCY CONVERSION");
  // console.log({
  //   hotelId: hotelsData?.[0]?.hotelId,
  //   hotelName: hotelsData?.[0]?.hotelName,
  //   originalPrice: hotelsData?.[0]?.originalPrice,
  //   convertedPrice: hotelsData?.[0]?.price,
  //   originalTax: hotelsData?.[0]?.originalTax,
  //   convertedTax: hotelsData?.[0]?.tax,
  //   currency: body.currency,
  //   rate,
  // });

  hotelsData = convertHotelPrices({
    hotels: hotelsData,
    rate,
    currency: body.currency,
  });
  // fetch all markups once
  const allMarkups = await Markup.find({
    isActive: true,
  }).lean();

  const hotelMarkups = allMarkups.filter((m) => m.level === "hotel");

  const cityMarkups = allMarkups.filter((m) => m.level === "city");
   console.log("City markup =>", cityMarkups);

  const stateMarkups = allMarkups.filter((m) => m.level === "state");

  const countryMarkups = allMarkups.filter((m) => m.level === "country");

  const additionalTax = allMarkups.find((m) => m.level === "additional_tax");

  let countryTax = await getCountryTaxRule({
    countryCode: body.countryCode,
  });
  if (!countryTax) {
    countryTax = {
      ruleType: "flat", // ✅ Missing tha
      taxType: "percentage",
      taxValue: 18,
    };
  }
  const worldwideMarkups = allMarkups.filter((m) => m.level === "worldwide");

  // console.log("WORLDWIDE =", worldwideMarkups);
  const pricedHotels = [];

  for (const hotel of hotelsData) {
    const matchedMarkup = resolveMarkupForHotel({
      hotel,
      body,
      hotelMarkups,
      cityMarkups,
      stateMarkups,
      countryMarkups,
      worldwideMarkups,
    });

    const pricedHotel = applyHotelPricing({
      hotel,
      markup: matchedMarkup,

      countryCode: body.countryCode,
      additionalTax,
      countryTax,
    });

    pricedHotels.push({
      ...pricedHotel,

      appliedMarkup: matchedMarkup
        ? {
            level: matchedMarkup.level,
            value: matchedMarkup.markupValue,
          }
        : null,
    });
  }

  hotelsData = pricedHotels;
  // console.log("\n🛏️ AFTER ROOM MULTIPLIER");
  // console.log({
  //   roomCount: body.RoomCount,
  //   hotelId: hotelsData?.[0]?.hotelId,
  //   hotelName: hotelsData?.[0]?.hotelName,
  //   finalPrice: hotelsData?.[0]?.price,
  //   finalTax: hotelsData?.[0]?.tax,
  // });
  // console.log("\n🔍 PIPELINE START");

  // console.log("📦 INPUT HOTELS:", hotelsData.length);

  const filtered = filterHotels(hotelsData, filters);

  // console.log("🎯 AFTER FILTER:", filtered.length);

  const sorted = sortHotels(filtered, sort);

  const page = Number(pagination?.page) || 1;

  const limit = Number(pagination?.limit) || 10;

  const paginated = paginateHotels(sorted, {
    page,
    limit,
  });

  // console.log("📄 PAGE:", page, "| LIMIT:", limit);

  // console.log("📦 RETURNED HOTELS:", paginated.hotels.length);

  // console.log("=================================================\n");

  return {
    currency: body.currency,

    currencySymbol: getCurrencySymbol(body.currency),

    searchKey: cache.searchKey,

    totalHotels: paginated.totalHotels,

    page: paginated.page,

    totalPage: paginated.totalPages,

    limit: paginated.limit,

    hotels: paginated.hotels,

    isComplete: cache.isComplete,
  };
};
