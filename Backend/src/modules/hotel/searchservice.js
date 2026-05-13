
import { supplierAPI } from "../../config/supplierApi.js";
import { getAuthHeader } from "../../config/supplierAuth.service.js";
import HotelCache from "../hotel/hotelCache.model.js";

import { filterHotels } from "../hotel/hotel.filters.js";
import { sortHotels } from "../hotel/hotel.sort.js";
import { paginateHotels } from "../hotel/hotelPagination.js";

import { fetchRemainingHotelsInBackground } from "./supplierPagination.service.js";

/* 🔁 normalize */
const normalizeBody = (body) => ({
  cityId: body.cityId || body.id,
  cityName: body.cityName || body.fullName,
  CheckInDate: body.CheckInDate,
  CheckOutDate: body.CheckOutDate,
  RoomCount: body.RoomCount || 1,
  filters: body.filters || {},
  sort: body.sort || "",
  pagination: body.pagination || { page: 1, limit: 10 },
});

/* 🔨 build payload */
const buildPayload = (body, seedValue = "") => ({
  AuthHeader: getAuthHeader().AuthHeader,
  HotelSeedValue: seedValue,
  CheckInDate: body.CheckInDate,
  CheckOutDate: body.CheckOutDate,
  HotelRoomDetail: [
    { AdultCount: 1, ChildCount: 0, Child1Age: 0, Child2Age: 0 },
  ],
  fullName: body.cityName,
  id: body.cityId,
  RoomCount: body.RoomCount,
});

/* 🧠 merge */
const mergeHotels = (data) => {
  if (!data?.HotelContents) return [];
  return data.HotelContents.map((hotel) => {
    const price = data.HotelFareDetails.find(
      (fare) => fare.HotelId === hotel.HotelId
    );

    return {
      hotelId: hotel.HotelId,
      hotelName: hotel.HotelName,
      address: hotel.Address,
      location: hotel.Location,
      starRating: hotel.StarCategoryId,
      latitude: hotel.Latitude,
      longitude: hotel.Longitude,
      image: hotel.HotelImage,
      hotelkey: hotel.HotelKey,
      facilities: hotel.HotelFacilities?.map(f => f.FacilityName) || [],
      price: price?.TotalAmount || 0,
      tax: price?.TaxAmount || 0,
      freeCancellation: price?.FreeCancellation === "2",
    };
  });
};

/* =====================================================
   🏨 MAIN SEARCH SERVICE (HYBRID)
===================================================== */
export const searchHotelsFromSupplier = async (reqBody) => {
  const body = normalizeBody(reqBody);
  const { filters, sort, pagination } = body;

  /* 1️⃣ CACHE CHECK */
  const existingCache = await HotelCache.findOne({ cityId: body.cityId });

  let hotelsData;

  if (existingCache) {
    console.log("⚡ SERVING FROM CACHE");
    hotelsData = existingCache.hotels;
  }

  /* 2️⃣ FIRST TIME CITY */
  else {
    console.log("🌐 FIRST TIME → CALL SUPPLIER FIRST PAGE");

    const payload = buildPayload(body);

    const { data } = await supplierAPI.post(
      "/JSONService/HotelSearch",
      payload,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
        },
      }
    );

    const firstPageHotels = mergeHotels(data);

    /* 💾 SAVE FIRST PAGE */
    await HotelCache.create({
      cityId: body.cityId,
      cityName: body.cityName,
      hotels: firstPageHotels,
    });

    hotelsData = firstPageHotels;

    /* 🚀 TRIGGER BACKGROUND JOB (NO AWAIT) */
    if (data.MoreHotels) {
      fetchRemainingHotelsInBackground(body, data);
    }
  }

  /* 🎯 FILTER → SORT → PAGINATE */
  let filtered = filterHotels(hotelsData, filters);
  let sorted = sortHotels(filtered, sort);

  const page = pagination.page || 1;
  const limit = pagination.limit || 10;
  const paginated = paginateHotels(sorted, page, limit);

  return {
    totalHotels: sorted.length,
    currentPage: page,
    totalPages: Math.ceil(sorted.length / limit),
    hotels: paginated,
  };
};