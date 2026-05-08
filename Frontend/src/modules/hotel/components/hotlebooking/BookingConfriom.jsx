import {
  ArrowRightOutlined,
  ClockCircleOutlined,
  StarFilled,
} from "@ant-design/icons";
import {
  Card,
  Col,
  Divider,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";

const { Title, Text } = Typography;

const BookingConfriom = () => {
  return (
    <div className="w-full min-h-screen bg-[#eaf4fb] py-6 px-3 md:px-6">
      <div className="max-w-[1400px] mx-auto">
        <Row gutter={[24, 24]}>
          {/* LEFT SECTION */}
          <Col xs={24} lg={16}>
            <Card className="rounded-2xl shadow-md overflow-hidden border-0 p-0">
              {/* HOTEL TOP */}
              <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
                {/* IMAGE */}
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
                  alt="hotel"
                  className="w-full md:w-[185px] h-[140px] object-cover rounded-xl"
                />

                {/* HOTEL INFO */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div>
                      <Title
                        level={2}
                        className="!mb-2 !text-[26px] !font-bold !text-[#2f2f2f]"
                      >
                        Valentines Retreat- Near Candolim Beach
                      </Title>

                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className="flex gap-1 text-[#f4b400] text-[15px]">
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                        </div>

                        <Tag className="!rounded-md !px-3 !py-[4px] !text-[15px]">
                          Couple Friendly
                        </Tag>
                      </div>

                      <Text className="!text-[18px] !text-[#9c9c9c]">
                        Sequeira waddo, Candolim, Bardez Goa, Goa, India
                      </Text>
                    </div>

                    <Tag className="!rounded-full !px-4 !py-[5px] !text-[15px] border-[#5ab1f7] text-[#5ab1f7] bg-white">
                      Completed
                    </Tag>
                  </div>
                </div>
              </div>

              <Divider className="!my-0" />

              {/* CHECK-IN SECTION */}
              <div className="px-4 md:px-6 py-6">
                <Row gutter={[20, 20]} align="middle">
                  {/* CHECK-IN */}
                  <Col xs={24} md={8}>
                    <div>
                      <Text className="!text-[20px] !text-[#3c3c3c]">
                        Check-in
                      </Text>

                      <h2 className="text-[34px] font-bold text-[#222] mt-2 leading-tight">
                        18 Feb '25, Tue
                      </h2>

                      <Text className="block text-[18px] text-[#555] mt-1">
                        From 02:00 PM
                      </Text>

                      <Text className="block text-[18px] text-[#444] mt-1">
                        Jaipur, Rajasthan
                      </Text>
                    </div>
                  </Col>

                  {/* CENTER */}
                  <Col xs={24} md={8}>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center w-full max-w-[180px]">
                        <div className="flex-1 h-[1px] bg-gray-300"></div>

                        <ArrowRightOutlined className="mx-3 text-[28px] text-[#444]" />

                        <div className="flex-1 h-[1px] bg-gray-300"></div>
                      </div>

                      <div className="border border-gray-400 rounded-full px-4 py-[4px] mt-3 flex items-center gap-2">
                        <ClockCircleOutlined />
                        <span className="text-[17px] font-medium">
                          3 Nights
                        </span>
                      </div>

                      <Text className="mt-3 text-[18px] text-[#444]">
                        2 Adults | 1 Room
                      </Text>
                    </div>
                  </Col>

                  {/* CHECK-OUT */}
                  <Col xs={24} md={8}>
                    <div className="md:text-right">
                      <Text className="!text-[20px] !text-[#3c3c3c]">
                        Check-out
                      </Text>

                      <h2 className="text-[34px] font-bold text-[#222] mt-2 leading-tight">
                        21 Feb '25, Fri
                      </h2>

                      <Text className="block text-[18px] text-[#555] mt-1">
                        By 11:00 AM
                      </Text>
                    </div>
                  </Col>
                </Row>
              </div>

              <Divider className="!my-0" />

              {/* ROOM DETAILS */}
              <div className="px-4 md:px-6 py-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <button className="border border-[#d89b00] text-[#d89b00] font-semibold px-5 py-2 rounded-xl text-[17px]">
                    Super Package
                  </button>

                  <button className="text-[#59aef7] underline text-[18px] font-medium">
                    See Inclusions
                  </button>
                </div>

                <div className="mt-8">
                  <Title
                    level={3}
                    className="!mb-1 !text-[34px] !font-bold !text-[#2f2f2f]"
                  >
                    Suite with Balcony
                  </Title>

                  <Text className="!text-[20px] !text-[#555]">
                    2 Adults, 1 Child
                  </Text>

                  <ul className="mt-7 space-y-4 pl-5">
                    {[
                      "Free stay for 1 children",
                      "Complimentary INR 300 Hotel Credit redeemable on Food",
                      "10% off on One-way Airport Transfer",
                      "15% Off on Laundry service",
                      "Free Breakfast",
                      "Existing bed(s) can accommodate all the guests",
                      "Non-Refundable",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="text-[19px] text-[#444] leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <Title
                      level={3}
                      className="!mb-2 !text-[34px] !font-bold !text-[#2f2f2f]"
                    >
                      Non-Refundable
                    </Title>

                    <Text className="!text-[20px] !text-[#555]">
                      Refund is not applicable for this booking
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          {/* RIGHT PRICE CARD */}
          <Col xs={24} lg={8}>
            <Card className="rounded-2xl shadow-md border-0 overflow-hidden">
              <Title
                level={2}
                className="!text-[34px] !font-bold !mb-8"
              >
                Price Breakup
              </Title>

              <Text className="!text-[24px] !font-semibold block !mb-8">
                1 Room x 2 Night
              </Text>

              <Space
                direction="vertical"
                size={0}
                className="w-full"
              >
                {[
                  {
                    label: "Base Price",
                    value: "₹ 7,749",
                  },
                  {
                    label: "Total Discount",
                    value: "₹ 5,888",
                    green: true,
                  },
                  {
                    label: "Price after Discount",
                    value: "₹ 1,861",
                  },
                  {
                    label: "Taxes & Service Fees",
                    value: "₹ 576",
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between py-6">
                      <Text
                        className={`text-[22px] ${
                          item.green
                            ? "!text-[#1db954]"
                            : "!text-[#444]"
                        }`}
                      >
                        {item.label}
                      </Text>

                      <Text
                        className={`text-[22px] font-semibold ${
                          item.green
                            ? "!text-[#1db954]"
                            : "!text-[#444]"
                        }`}
                      >
                        {item.value}
                      </Text>
                    </div>

                    <Divider className="!my-0" />
                  </div>
                ))}
              </Space>

              <div className="flex items-center justify-between pt-7">
                <Title
                  level={3}
                  className="!mb-0 !text-[24px] !font-semibold !text-[#333]"
                >
                  Total Amount to be paid
                </Title>

                <Title
                  level={3}
                  className="!mb-0 !text-[28px] !font-bold !text-[#333]"
                >
                  ₹ 2,437
                </Title>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BookingConfriom;