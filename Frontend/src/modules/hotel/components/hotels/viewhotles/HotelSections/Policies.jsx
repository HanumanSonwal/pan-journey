"use client";

import {
  CalendarOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  FileProtectOutlined,
  InfoCircleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const Policies = ({ ratePlans = [] }) => {
  const details = ratePlans?.[0]?.RatePlanDetails?.[0];
  const essential = details?.EssentialInformation || [];
  const cancellation = details?.CancellationPolicy;

  const getIcon = (type = "") => {
    const key = type.toLowerCase();
    if (key.includes("check-in")) return <CalendarOutlined />;
    if (key.includes("check-out")) return <ClockCircleOutlined />;
    if (key.includes("instruction")) return <InfoCircleOutlined />;
    if (key.includes("know")) return <SafetyCertificateOutlined />;
    if (key.includes("fee")) return <DollarCircleOutlined />;
    return <FileProtectOutlined />;
  };

  const getColor = (type = "") => {
    const key = type.toLowerCase();
    if (key.includes("check")) {
      return {
        bg: "bg-blue-50",
        border: "border-blue-100",
        icon: "text-blue-600",
      };
    }

    if (key.includes("know")) {
      return {
        bg: "bg-green-50",
        border: "border-green-100",
        icon: "text-green-600",
      };
    }

    if (key.includes("fee")) {
      return {
        bg: "bg-orange-50",
        border: "border-orange-100",
        icon: "text-orange-600",
      };
    }

    return {
      bg: "bg-slate-50",
      border: "border-slate-100",
      icon: "text-slate-600",
    };
  };

  return (
    <div className="space-y-6">
      {/* Cancellation */}
      <div className="rounded border border-red-100 bg-red-50 p-6 shadow-sm">
        <div className=" flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-lg text-red-600">
            <FileProtectOutlined />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-700">
              Cancellation Policy
            </h2>

            <p className="text-sm text-red-500">
              Review refund & cancellation terms
            </p>
          </div>
        </div>

        <div
          className="leading-8 text-red-700"
          dangerouslySetInnerHTML={{
            __html: cancellation || "No cancellation policy available",
          }}
        />
      </div>

      {/* Property Policies */}
      <div className="rounded border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Property Policies
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Important stay, check-in and hotel rules
          </p>
        </div>

        <div className="grid gap-4">
          {essential.map((item, i) => {
            const color = getColor(item.type);

            return (
              <div
                key={i}
                className={`rounded border p-4 ${color.bg} ${color.border}`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded bg-white text-lg shadow-sm ${color.icon}`}
                  >
                    {getIcon(item.type)}
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <h4 className="mb-2 text-[15px] font-semibold text-gray-800">
                      {item.type}
                    </h4>

                    <p className="leading-7 text-gray-600">{item.text}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {!essential.length && (
            <div className="rounded border border-dashed p-6 text-center text-gray-500">
              No policy information available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Policies;
