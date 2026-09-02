
export const mapHotelSearchResponse = (response) => {
  const hotels = response?.HotelDetails || [];

  return {
    // search: {
    //   searchId: response?.SearchID || null,
    //   searchKey: response?.SearchKey || null,
    //   moreHotels: response?.MoreHotels || false,
    // },

    // response: {
    //   status: response?.Response_Header?.StatusId || null,
    //   errorCode: response?.Response_Header?.ErrorCode || null,
    //   message: response?.Response_Header?.ErrorDesc || null,
    // },

    hotels: hotels.map((hotel) => ({
      id: hotel?.HotelId || null,
      // key: hotel?.HotelKey || null,

      name: hotel?.HotelName || null,
      description: hotel?.HotelDesc || null,

      location: {
        address: hotel?.Address || null,
        city: hotel?.City || null,
        state: hotel?.state || null,
        country: null,
        pincode: hotel?.Pincode || null,

        latitude: hotel?.Latitude
          ? Number(hotel.Latitude)
          : null,

        longitude: hotel?.Longitude
          ? Number(hotel.Longitude)
          : null,
      },

      contact: {
        phone: hotel?.HotelPhone || null,
        email: hotel?.HotelEmail || null,
      },

      rating: {
        id: hotel?.StarCategoryId
          ? Number(hotel.StarCategoryId)
          : null,

      },

      image: hotel?.HotelImage || null,

      facilities: (hotel?.HotelFacilities || []).map(
        (facility) => ({
          id: facility?.FacilityId || null,
          name: facility?.FacilityName?.trim() || null,
        })
      ),


      pricing: {
        currency: hotel?.Currencycode || null,

        basicAmount: Number(
          hotel?.LowestBasicAmount || 0
        ),

        tax: Number(
          hotel?.LowestRateTax || 0
        ),

        totalAmount: Number(
          hotel?.TotalAmount || 0
        ),

       

        gst: Number(
          hotel?.GST || 0
        ),

     
      
      },

      policy: {
        applicableCode:
          hotel?.ApplicablePolicyCode || null,

        state: hotel?.PolicyState || null,

        outPolicyReason:
          hotel?.OutPolicyReason || null,
      },

     
    })),
  };
};

