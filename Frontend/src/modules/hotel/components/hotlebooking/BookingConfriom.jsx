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

import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const BookingConfriom = () => {

  const requests = [
    "Smoking room",
    "Late check-in",
    "Early check-in",
    "Room on a high floor",
    "Large bed",
    "Twin beds",
    "Airport transfer",
  ];
  return (
    <div className="w-full min-h-screen bg- py-6 px-3 md:px-6">
      <div className="max-w-[1400px] mx-auto">
        <Row gutter={[24, 24]}>
          {/* LEFT SECTION */}
          <Col xs={14} lg={16}>
            <Card className="rounded-2xl shadow-md overflow-hidden  p-0">
              {/* HOTEL TOP */}
              <div className="flex flex-col md:flex-row gap-4 p-4 md:p-1">
                {/* IMAGE */}
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
                  alt="hotel"
                  className="w-full md:w-[135px] h-[130px] object-cover rounded-xl"
                />

                {/* HOTEL INFO */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 ">
                    <div>
                      <Title
                        level={2}
                        className="!mb-2 !text-[20px] !font-bold !text-[#2f2f2f]"
                      >
                        Valentines Retreat- Near Candolim Beach
                      </Title>

                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className="flex gap-1 text-[#f4b400] !text-[12px]">
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                        </div>

                        <Tag className="!rounded-md !px-3 !py-[3px] !text-[13px] !bg-white !border-gray-400">
                          Couple Friendly
                        </Tag>
                      </div>

                      <Text className="!text-[16px] !text-[#9c9c9c]">
                        Sequeira waddo, Candolim, Bardez Goa, Goa, India
                      </Text>
                    </div>

                    <Tag className="!rounded-full !px-4 !py-[5px] !text-[15px] !border-blue text-[#5ab1f7] ">
                      Completed
                    </Tag>
                  </div>
                </div>
              </div>

              <Divider className="!my-0 !mt-4" />

              {/* CHECK-IN SECTION */}
              <div className="px-4 md:px-3 py-3">
                <Row gutter={[20, 20]} align="middle">
                  {/* CHECK-IN */}
                  <Col xs={24} md={8}>
                    <div>
                      <Text className="!text-[15px] !text-[#3c3c3c]">
                        Check-in
                      </Text>

                      <h2 className="text-[17px] font-bold text-[#222] !mt-[-2] leading-tight">
                        18 Feb '25, Tue
                      </h2>

                      <Text className="block text-[18px] text-[#555] !mt-[-6]">
                        From 02:00 PM
                      </Text>

                      <Text className="block text-[18px] text-[#444] mt-0">
                        Jaipur, Rajasthan
                      </Text>
                    </div>
                  </Col>

                  {/* CENTER */}
                  <Col xs={24} md={8}>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center w-full max-w-[140px]">
                        <div className="flex-1 h-[1px] bg-gray-300"></div>

                        <ArrowRightOutlined className="mx-3 text-[19px] text-[#444]" />

                        <div className="flex-1 h-[1px] bg-gray-300"></div>
                      </div>

                      <div className="border border-gray-400 rounded-full px-4 py-[4px] mt-3 flex items-center gap-2">
                        <ClockCircleOutlined />
                        <span className="text-[11px] font-medium">
                          3 Nights
                        </span>
                      </div>

                      <Text className="mt-3 !text-[14px] text-[#444]">
                        2 Adults | 1 Room
                      </Text>
                    </div>
                  </Col>

                  {/* CHECK-OUT */}
                  <Col xs={24} md={8}>
                    <div className="md:text-right">
                      <Text className="!text-[14px] !text-[#3c3c3c] pr-9">
                        Check-out
                      </Text>

                      <h2 className="text-[17px] font-bold text-[#222] mt-2 leading-tight">
                        21 Feb '25, Fri
                      </h2>

                      <Text className="block text-[18px] text-[#555] !mt-[-3] pr-6">
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
                  <button className="border border-[#d89b00] !text-[#d89b00] font-semibold px-5 py-2 rounded-xl text-[17px]">
                    Super Package
                  </button>

                  <button className="!text-[#87CEEB] underline text-[18px] font-medium">
                    See Inclusions
                  </button>
                </div>

                <div className="mt-8">
                  <Title
                    level={3}
                    className="!mb-1 !text-[20px] !font-bold !text-[#2f2f2f]"
                  >
                    Suite with Balcony
                  </Title>

                  <Text className="!text-[15px] !text-[#555]">
                    2 Adults, 1 Child
                  </Text>

                  <ul className="!mt-4 space-y-1 pl-5">
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
                        className="text-[15px] text-[#444] leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <Title
                      level={3}
                      className="!mb-2 !text-[20px] !font-bold !text-[#2f2f2f]"
                    >
                      Non-Refundable
                    </Title>

                    <Text className="!text-[16px] !text-[#555]">
                      Refund is not applicable for this booking
                    </Text>
                    
                  </div>
                   <button className="!text-[#87CEEB] underline text-[18px] font-medium">
                    See Inclusions
                  </button>
                </div>
              </div>
              
            </Card>
      
    
        
        {/* IMPORTANT INFO CARD */}
        <Card className="rounded-2xl shadow-sm border-0 !mt-5 ">
          <Title
            level={2}
            className="!text-[19px] !font-bold !text-[#333] !mb-8"
          >
            Important information
          </Title>

          <ul className="space-y-2 pl-5">
            {[
              "Primary Guest should be atleast 18 years of age.",
              "Passport, Aadhaar, Driving License and Govt. ID are accepted as ID proof(s)",
              "Pets are not allowed",
              "Outside food is not allowed",
            ].map((item, index) => (
              <li
                key={index}
                className="text-[14px] text-[#444] leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>

          <button className="mt-8 !text-[#67b7f7] text-[24px] font-semibold hover:underline">
            View More
          </button>
        </Card>

        {/* GUEST DETAILS CARD */}
        <Card className="rounded-2xl shadow-sm border-0 !mt-4">
          <Title
            level={2}
            className="!text-[19px] !font-bold !text-[#333] !mb-8"
          >
            Guest Details
          </Title>

          {/* RADIO BUTTONS */}
          <Radio.Group defaultValue="myself" className="mb-10">
            <div className="flex gap-10 flex-wrap mb-4">
              <Radio value="myself" className="!text-[18px]">
                Myself
              </Radio>

              <Radio value="someone" className="!text-[18px]">
                Someone
              </Radio>
            </div>
          </Radio.Group>

          {/* FORM */}
          <Row gutter={[20, 20]}>
            {/* TITLE */}
            <Col xs={24} md={4}>
              <div>
                <Text className="block text-[10px] text-[#444] mb-2">
                  Title
                </Text>

                <Select
                  defaultValue="Mr"
                  className="w-full h-[30px]"
                  size="large"
                >
                  <Option value="Mr">Mr</Option>
                  <Option value="Mrs">Mrs</Option>
                  <Option value="Miss">Miss</Option>
                </Select>
              </div>
            </Col>

            {/* FIRST NAME */}
            <Col xs={24} md={10}>
              <div>
                <Text className="block text-[18px] text-[#444] mb-2">
                  Full Name
                </Text>

                <Input
                  placeholder="First Name"
                  className="h-[30px] rounded-lg text-[18px]"
                />
              </div>
            </Col>

            {/* LAST NAME */}
            <Col xs={24} md={10}>
              <div className="md:mt-[32px]">
                <Input
                  placeholder="Last Name"
                  className="h-[30px] rounded-lg text-[18px]"
                />
              </div>
            </Col>

            {/* EMAIL */}
            <Col xs={24} md={12}>
              <div>
                <Text className="block text-[18px] text-[#444] mb-2">
                  Email Address
                  <span className="text-[#999] ml-1">
                    (Booking voucher will be sent to this email ID)
                  </span>
                </Text>

                <Input
                  placeholder="example@gmail.com"
                  className="h-[30px] rounded-lg text-[18px]"
                />
              </div>
            </Col>

            {/* MOBILE */}
            <Col xs={24} md={12}>
              <div>
                <Text className="block text-[18px] text-[#444] mb-2">
                  Mobile Number
                </Text>

                <div className="flex gap-3">
                  <Select
                    defaultValue="+91"
                    className="w-[100px]"
                    
                  >
                    <Option value="+91">+91</Option>
                    <Option value="+1">+1</Option>
                    <Option value="+44">+44</Option>
                  </Select>

                  <Input
                    placeholder="0123456789"
                    className="h-[30px] rounded-lg text-[18px]"
                  />
                </div>
              </div>
            </Col>
          </Row>

          {/* ADD GUEST */}
          <button className="mt-10 text-[#67b7f7] text-[24px] font-semibold hover:underline">
            +Add Guest
          </button>
        </Card>
  
        
        {/* CARD */}
        <Card className="rounded-2xl shadow-sm border-0 !mt-4">
          
          {/* TITLE */}
          <Title
            level={2}
            className="!text-[18px] !font-bold !text-[#333] !mb-3"
          >
            Special Request
          </Title>

          {/* SUBTITLE */}
          <Text className="!text-[16px] !text-[#444] leading-relaxed">
            Special requests are subject to each hotel's availability,
            may be chargeable & can't be guaranteed.
          </Text>

          {/* COMMONLY REQUESTED */}
          <div className="mt-5">
            <Title
              level={3}
              className="!text-[18px] !font-bold !text-[#333] !mb-3"
            >
              Commonly Requested
            </Title>

            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {requests.map((item, index) => (
                <Checkbox
                  key={index}
                  className="!text-[16px] !text-[#444]"
                >
                  {item}
                </Checkbox>
              ))}
            </div>
          </div>

          {/* OTHER REQUEST */}
          <div className="mt-5">
            <Title
              level={4}
              className="!text-[19px] !font-semibold !text-[#333] !mb-5"
            >
              Any other request?
            </Title>

            <TextArea
              rows={7}
              placeholder="Enter your special request"
              className="!rounded-2 !text-[14px] !py-3 !h-24" 
            />
          </div>
        </Card>

        {/* AGREEMENT */}
        <div className="mt-5 flex items-start gap-3 px-2">
          <Checkbox />

          <Text className="!text-[14px] !text-[#444] leading-relaxed">
            By proceeding, I agree to PAN’s User Agreement,
            Terms of Service and Cancellation & Property
            Booking Policies.
          </Text>
        </div>

        {/* BUTTON */}
        <div className="mt-6">
          <Button
            type="primary"
            className="!h-[40px] !w-[200px] !rounded-xl !bg-[#64b6f3] hover:!bg-[#4da7eb] !border-0 !text-[14px] !font-medium"
          >
            Pay Now
          </Button>
        </div>
     
    
          </Col>

          {/* RIGHT PRICE CARD */}
          <Col xs={24} lg={8}>
            <Card className="rounded-2xl shadow-md border-0 overflow-hidden">
              <Title
                level={2}
                className="!text-[20px] !font-bold !mb-3"
              >
                Price Breakup
              </Title>

              <Text className="!text-[18px] !font-semibold block !mb-1">
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
                    <div className="flex items-center justify-between py-3">
                      <Text
                        className={`!text-[17px] ${
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

              <div className="flex items-center justify-between pt-6">
                <Title
                  level={3}
                  className="!mb-0 !text-[18px] !font-semibold !text-[#333]"
                >
                  Total Amount to be paid
                </Title>

                <Title
                  level={3}
                  className="!mb-0 !text-[18px] !font-bold !text-[#333]"
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