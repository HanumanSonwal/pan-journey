
// // export const mapHotelSearchResponse = (response) => {
// //   const hotels = response?.HotelDetails || [];

// //   return {
// //     // search: {
// //     //   searchId: response?.SearchID || null,
// //     //   searchKey: response?.SearchKey || null,
// //     //   moreHotels: response?.MoreHotels || false,
// //     // },

// //     // response: {
// //     //   status: response?.Response_Header?.StatusId || null,
// //     //   errorCode: response?.Response_Header?.ErrorCode || null,
// //     //   message: response?.Response_Header?.ErrorDesc || null,
// //     // },

// //     hotels: hotels.map((hotel) => ({
// //       id: hotel?.HotelId || null,
// //       // key: hotel?.HotelKey || null,

// //       name: hotel?.HotelName || null,
// //       description: hotel?.HotelDesc || null,

// //       location: {
// //         address: hotel?.Address || null,
// //         city: hotel?.City || null,
// //         state: hotel?.state || null,
// //         country: null,
// //         pincode: hotel?.Pincode || null,

// //         latitude: hotel?.Latitude
// //           ? Number(hotel.Latitude)
// //           : null,

// //         longitude: hotel?.Longitude
// //           ? Number(hotel.Longitude)
// //           : null,
// //       },

// //       contact: {
// //         phone: hotel?.HotelPhone || null,
// //         email: hotel?.HotelEmail || null,
// //       },

// //       rating: {
// //         id: hotel?.StarCategoryId
// //           ? Number(hotel.StarCategoryId)
// //           : null,

// //       },

// //       image: hotel?.HotelImage || null,

// //       facilities: (hotel?.HotelFacilities || []).map(
// //         (facility) => ({
// //           id: facility?.FacilityId || null,
// //           name: facility?.FacilityName?.trim() || null,
// //         })
// //       ),


// //       pricing: {
// //         currency: hotel?.Currencycode || null,

// //         basicAmount: Number(
// //           hotel?.LowestBasicAmount || 0
// //         ),

// //         tax: Number(
// //           hotel?.LowestRateTax || 0
// //         ),

// //         totalAmount: Number(
// //           hotel?.TotalAmount || 0
// //         ),

       

// //         gst: Number(
// //           hotel?.GST || 0
// //         ),

     
      
// //       },

// //       policy: {
// //         applicableCode:
// //           hotel?.ApplicablePolicyCode || null,

// //         state: hotel?.PolicyState || null,

// //         outPolicyReason:
// //           hotel?.OutPolicyReason || null,
// //       },

     
// //     })),
// //   };
// // };

// export const mapHotelSearchResponse = (response) => {
//   // Supplier response:
//   // response.HotelDetails

//   // DB / queryBuilder response:
//   // response.hotels

//   const hotels =
//     response?.HotelDetails ||
//     response?.hotels ||
//     [];

//   return {
//     hotels: hotels.map((hotel) => ({
//       id:
//         hotel?.HotelId ||
//         hotel?.hotelId ||
//         null,

//       name:
//         hotel?.HotelName ||
//         hotel?.name ||
//         null,

//       description:
//         hotel?.HotelDesc ||
//         hotel?.description ||
//         null,

//       location: {
//         address:
//           hotel?.Address ||
//           hotel?.location?.address ||
//           null,

//         city:
//           hotel?.City ||
//           hotel?.location?.city ||
//           null,

//         state:
//           hotel?.state ||
//           hotel?.location?.state ||
//           null,

//         country:
//           hotel?.Country ||
//           hotel?.location?.country ||
//           null,

//         pincode:
//           hotel?.Pincode ||
//           hotel?.location?.pincode ||
//           null,

//         latitude:
//           hotel?.Latitude !== undefined
//             ? Number(hotel.Latitude)
//             : hotel?.location?.latitude ?? null,

//         longitude:
//           hotel?.Longitude !== undefined
//             ? Number(hotel.Longitude)
//             : hotel?.location?.longitude ?? null,
//       },

//       contact: {
//         phone:
//           hotel?.HotelPhone ||
//           hotel?.contact?.phone ||
//           null,

//         email:
//           hotel?.HotelEmail ||
//           hotel?.contact?.email ||
//           null,
//       },

//       rating: {
//         id:
//           hotel?.StarCategoryId !== undefined
//             ? Number(hotel.StarCategoryId)
//             : hotel?.starCategory ??
//               hotel?.rating?.id ??
//               null,
//       },

//       image:
//         hotel?.HotelImage ||
//         hotel?.image ||
//         null,

//       facilities: (
//         hotel?.HotelFacilities ||
//         hotel?.facilities ||
//         []
//       ).map((facility) => ({
//         id:
//           facility?.FacilityId ||
//           facility?.id ||
//           null,

//         name:
//           facility?.FacilityName?.trim?.() ||
//           facility?.name ||
//           null,
//       })),

//       pricing: {
//         currency:
//           hotel?.Currencycode ||
//           hotel?.pricing?.currency ||
//           null,

//         basicAmount:
//           hotel?.LowestBasicAmount !== undefined
//             ? Number(hotel.LowestBasicAmount)
//             : Number(
//                 hotel?.pricing?.basicAmount || 0
//               ),

//         tax:
//           hotel?.LowestRateTax !== undefined
//             ? Number(hotel.LowestRateTax)
//             : Number(
//                 hotel?.pricing?.tax || 0
//               ),

//         totalAmount:
//           hotel?.TotalAmount !== undefined
//             ? Number(hotel.TotalAmount)
//             : Number(
//                 hotel?.pricing?.totalAmount || 0
//               ),

//         gst:
//           hotel?.GST !== undefined
//             ? Number(hotel.GST)
//             : Number(
//                 hotel?.pricing?.gst || 0
//               ),
//       },

//       policy: {
//         applicableCode:
//           hotel?.ApplicablePolicyCode ||
//           hotel?.policy?.applicableCode ||
//           null,

//         state:
//           hotel?.PolicyState ||
//           hotel?.policy?.state ||
//           null,

//         outPolicyReason:
//           hotel?.OutPolicyReason ||
//           hotel?.policy?.outPolicyReason ||
//           null,
//       },
//     })),
//   };
// };


export const mapHotelSearchResponse = (response) => {
  // Supplier response:
  // response.HotelDetails

  // DB / queryBuilder response:
  // response.hotels

  const hotels =
    response?.HotelDetails ||
    response?.hotels ||
    [];

  return {
    hotels: hotels.map((hotel) => ({
      id:
        hotel?.HotelId ||
        hotel?.hotelId ||
        null,

      name:
        hotel?.HotelName ||
        hotel?.name ||
        null,

      description:
        hotel?.HotelDesc ||
        hotel?.description ||
        null,

      location: {
        address:
          hotel?.Address ||
          hotel?.location?.address ||
          null,

        city:
          hotel?.City ||
          hotel?.location?.city ||
          null,

        state:
          hotel?.state ||
          hotel?.location?.state ||
          null,

        country:
          hotel?.Country ||
          hotel?.location?.country ||
          null,

        pincode:
          hotel?.Pincode ||
          hotel?.location?.pincode ||
          null,

        latitude:
          hotel?.Latitude !== undefined &&
          hotel?.Latitude !== null
            ? Number(hotel.Latitude)
            : hotel?.location?.latitude ?? null,

        longitude:
          hotel?.Longitude !== undefined &&
          hotel?.Longitude !== null
            ? Number(hotel.Longitude)
            : hotel?.location?.longitude ?? null,
      },

      contact: {
        phone:
          hotel?.HotelPhone ||
          hotel?.contact?.phone ||
          null,

        email:
          hotel?.HotelEmail ||
          hotel?.contact?.email ||
          null,
      },

      rating: {
        id:
          hotel?.StarCategoryId !== undefined &&
          hotel?.StarCategoryId !== null
            ? Number(hotel.StarCategoryId)
            : hotel?.starCategory ??
              hotel?.rating?.id ??
              null,
      },

      image:
        hotel?.HotelImage ||
        hotel?.image ||
        null,

      facilities: (
        hotel?.HotelFacilities ||
        hotel?.facilities ||
        []
      ).map((facility) => ({
        id:
          facility?.FacilityId ||
          facility?.id ||
          null,

        name:
          facility?.FacilityName?.trim?.() ||
          facility?.name ||
          null,
      })),

      pricing: {
        currency:
          hotel?.Currencycode ||
          hotel?.pricing?.currency ||
          null,

        basicAmount:
          hotel?.LowestBasicAmount !== undefined
            ? Number(hotel.LowestBasicAmount)
            : Number(
                hotel?.pricing?.basicAmount || 0
              ),

        tax:
          hotel?.LowestRateTax !== undefined
            ? Number(hotel.LowestRateTax)
            : Number(
                hotel?.pricing?.tax || 0
              ),

        totalAmount:
          hotel?.TotalAmount !== undefined
            ? Number(hotel.TotalAmount)
            : Number(
                hotel?.pricing?.totalAmount || 0
              ),

        gst:
          hotel?.GST !== undefined
            ? Number(hotel.GST)
            : Number(
                hotel?.pricing?.gst || 0
              ),
      },

      policy: {
        applicableCode:
          hotel?.ApplicablePolicyCode ||
          hotel?.policy?.applicableCode ||
          null,

        state:
          hotel?.PolicyState ||
          hotel?.policy?.state ||
          null,

        outPolicyReason:
          hotel?.OutPolicyReason ||
          hotel?.policy?.outPolicyReason ||
          null,
      },
    })),
  };
};

