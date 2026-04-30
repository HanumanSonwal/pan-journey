// import { searchHotelsService } from "./hotel.service.js";

// export const searchHotels = async (req, res) => {
//   try {
//     const params = {
//       city: req.query.city,
//       checkIn: req.query.checkIn,
//       checkOut: req.query.checkOut,
//       adults: Number(req.query.adults),
//       children: Number(req.query.children),
//       rooms: Number(req.query.rooms)
//     };

//     const data = await searchHotelsService(params);

//     res.json({ success: true, data });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };