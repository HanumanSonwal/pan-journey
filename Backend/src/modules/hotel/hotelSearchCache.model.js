// import mongoose from "mongoose";

// const hotelSearchCacheSchema = new mongoose.Schema(
//   {
//     searchKey: { type: String, index: true }, // unique search hash
//     city: String,
//     checkIn: String,
//     checkOut: String,
//     rooms: Number,
//     adults: Number,
//     children: Number,

//     supplierResponse: Object,

//     createdAt: {
//       type: Date,
//       default: Date.now,
//       expires: 60 * 60 * 24 // 🔥 Auto delete after 24 hours (TTL index)
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("HotelSearchCache", hotelSearchCacheSchema);