
import { supplierAPI } from "../../config/supplierApi.js";
import { getAuthHeader } from "../../config/supplierAuth.service.js";
import HotelCache from "../hotel/hotelCache.model.js";

/* ♻️ SAME PAYLOAD BUILDER (reuse) */
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

/* ♻️ SAME MERGE FUNCTION (reuse) */
const mergeHotels = (data) => {
  if (!data?.HotelContents) return [];

  return data.HotelContents.map((hotel) => {
    const price = (data.HotelFareDetails || []).find(
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
      facilities: hotel.HotelFacilities?.map(f => f.FacilityName) || [],
      price: price?.TotalAmount || 0,
      tax: price?.TaxAmount || 0,
      freeCancellation: price?.FreeCancellation === "2",
    };
  });
};

/* =====================================================
   🚀 BACKGROUND PAGINATION WORKER (UPDATED)
===================================================== */
export const fetchRemainingHotelsInBackground = async (
  normalizedBody,
  firstResponse
) => {
  try {
    console.log("🚀 BACKGROUND PAGINATION STARTED");

 
    let seedValue = firstResponse.HotelSeedValue;
let moreHotels = firstResponse.MoreHotels;
let previousSeed = ""; 
let allHotels = [];
let page = 1;

/* 🆕 empty page safety counter */
let emptyPageCount = 0;



while (seedValue && seedValue !== previousSeed) {
  page++;
  console.log(`📡 Background Supplier Call #${page}`);

  previousSeed = seedValue;

  const payload = buildPayload(normalizedBody, seedValue);

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

  const mergedHotels = mergeHotels(data);
  console.log(`➡️ Received ${mergedHotels.length} hotels`);

  if (mergedHotels.length === 0) {
    emptyPageCount++;
    if (emptyPageCount >= 2) {
      console.log("🛑 STOP: empty pages");
      break;
    }
  } else {
    emptyPageCount = 0;
    allHotels.push(...mergedHotels);
  }

  seedValue = data.HotelSeedValue; // ⭐ pagination cursor update
}
     

    /* 💾 PUSH REMAINING HOTELS INTO CACHE */
    if (allHotels.length) {
      await HotelCache.updateOne(
        { cityId: normalizedBody.cityId },
        { $push: { hotels: { $each: allHotels } } }
      );
    }

    console.log("🎉 BACKGROUND CACHE COMPLETE");
  } catch (err) {
    console.log("❌ Background fetch failed:", err.message);
  }
};
