"use client";



import Amenities from "./HotelSections/Amenities";
import LocationSection from "./HotelSections/LocationSection";
import RoomOptions from "./HotelSections/RoomOptions";

// import LocationSection from "./LocationSection";
// import GuestReviews from "./GuestReviews";
// import Policies from "./Policies";
// import SimilarProperties from "./SimilarProperties";

const HotelSectionsContent = ({ activeTab }) => {
  switch (activeTab) {
    case "Room Options":
      return <RoomOptions />;

    case "Amenities":
      return <Amenities />;

    //case "Food & Dining":
      //return <FoodDining />;

     case "Location":
      return <LocationSection />;

    // case "Guest Reviews":
    //   return <GuestReviews />;

    // case "Property Policies":
    //   return <Policies />;

    // case "Similar Properties":
    //   return <SimilarProperties />;

    default:
      return <RoomOptions />;
  }
};

export default HotelSectionsContent;