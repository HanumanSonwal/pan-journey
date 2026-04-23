"use client";

import {
  BuildOutlined,
  CarOutlined,
  HomeOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Badge, Card, Button } from "antd";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const modules = [
    {
      name: "Hotels",
      icon: <HomeOutlined style={{ fontSize: 32 }} />,
      active: true,
      path: "/hotels",
    },
    {
      name: "Flights",
      icon: <RocketOutlined style={{ fontSize: 32 }} />,
      active: false,
    },
    {
      name: "Bus",
      icon: <CarOutlined style={{ fontSize: 32 }} />,
      active: false,
    },
    {
      name: "More",
      icon: <BuildOutlined style={{ fontSize: 32 }} />,
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold leading-tight">
          Plan Your Perfect Trip ✈️
        </h1>

        <p className="mt-4 text-lg opacity-90">
          Book hotels, flights & more — all in one place
        </p>

        <div className="mt-6">
          <Button
            size="large"
            type="primary"
            className="bg-white text-blue-600 font-semibold"
            onClick={() => router.push("/hotels")}
          >
            Explore Hotels
          </Button>
        </div>
      </div>

      <div className="px-6 -mt-12">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">
            Explore Services
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {modules.map((mod, i) => (
              <div key={i}>
                {mod.active ? (
                  <Card
                    hoverable
                    onClick={() => router.push(mod.path)}
                    className="text-center rounded-xl hover:shadow-xl transition"
                  >
                    <div className="flex flex-col items-center gap-3">
                      {mod.icon}
                      <span className="font-medium">{mod.name}</span>
                    </div>
                  </Card>
                ) : (
                  <Badge.Ribbon text="Coming Soon" color="blue">
                    <Card className="text-center rounded-xl opacity-70 cursor-not-allowed">
                      <div className="flex flex-col items-center gap-3">
                        {mod.icon}
                        <span className="font-medium">{mod.name}</span>
                      </div>
                    </Card>
                  </Badge.Ribbon>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-20 mb-10 px-6">
        <h3 className="text-xl font-semibold text-gray-800">
          More features coming soon 🚀
        </h3>
        <p className="text-gray-500 mt-2">
          Flights, Bus & more will be available shortly
        </p>
      </div>
    </div>
  );
}