import { Button } from "antd";

const ViewHotelPriceCard = () => {
  return (
    <div className="border border-gray-200  p-5 bg-gray-50 min-h-[320px] flex flex-col justify-between mb-[-65]">
      
      <div>
        <h3 className="text-lg font-semibold">
          Suite with Balcony
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Fits 2 Adults & 1 Child
        </p>

        <ul className="text-green-600 text-sm my-3 space-y-1">
          <li>• Free stay for 1 children</li>
          <li>• Existing bed(s) can accommodate all guests</li>
          <li>• Non-Refundable</li>
        </ul>

        <p className="line-through text-gray-400">
          ₹ 7,503
        </p>

        <div className="text-xl font-bold mt-1">
          ₹ 1,801{" "}
          <span className="text-sm text-gray-500">
            + ₹ 558 taxes & fees
          </span>
        </div>
      </div>

      {/* Buttons Bottom me fix */}
      <div className="flex gap-2 mt-4">
        <Button type="primary" className="flex-1">
          Book this Now
        </Button>
        <Button className="flex-1">
          2 More Room Options
        </Button>
      </div>

    </div>
  );
};

export default ViewHotelPriceCard;