"use client";

import {
  CreditCardOutlined,
  FileProtectOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const Policies = ({ ratePlans = [] }) => {
  const rooms = Array.isArray(ratePlans) ? ratePlans : [];

  const getCancellationText = (policy) => {
    if (!policy) {
      return "";
    }

    if (typeof policy === "string") {
      return policy;
    }

    if (Array.isArray(policy)) {
      return policy
        .map((item) => {
          if (typeof item === "string") {
            return item;
          }

          return item?.description || item?.text || item?.value || "";
        })
        .filter(Boolean)
        .join("<br />");
    }

    if (typeof policy === "object") {
      return policy?.description || policy?.text || policy?.value || "";
    }

    return "";
  };

  const roomsWithPolicies = rooms.filter((room) => {
    const cancellationPolicy = getCancellationText(room?.cancellationPolicy);

    const creditCardRequired = room?.payment?.creditCardRequired === true;

    const panMandatory = room?.payment?.panMandatory === true;

    return Boolean(cancellationPolicy) || creditCardRequired || panMandatory;
  });

  return (
    <div className="space-y-6">
      {roomsWithPolicies.map((room, index) => {
        const cancellationPolicy = getCancellationText(
          room?.cancellationPolicy,
        );

        const creditCardRequired = room?.payment?.creditCardRequired === true;

        const panMandatory = room?.payment?.panMandatory === true;

        return (
          <div
            key={room?.ratePlanId || room?.roomTypeId || `policy-${index}`}
            className="rounded border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-gray-800">
                {room?.roomType || "Room Policy"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Room-specific policies and booking requirements
              </p>
            </div>

            {cancellationPolicy && (
              <div className="rounded border border-red-100 bg-red-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-red-100 text-red-600">
                    <FileProtectOutlined />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-red-700">
                      Cancellation Policy
                    </h3>

                    <p className="text-sm text-red-500">
                      Cancellation terms for this room
                    </p>
                  </div>
                </div>

                <div
                  className="mt-4 leading-7 text-red-700"
                  dangerouslySetInnerHTML={{
                    __html: cancellationPolicy,
                  }}
                />
              </div>
            )}

            {(creditCardRequired || panMandatory) && (
              <div className="mt-4 rounded border border-blue-100 bg-blue-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-blue-100 text-blue-600">
                    <CreditCardOutlined />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-700">
                      Payment Requirements
                    </h3>

                    <p className="text-sm text-blue-500">
                      Requirements for booking this room
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {creditCardRequired && (
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <SafetyCertificateOutlined />
                      <span>Credit card is required for booking.</span>
                    </div>
                  )}

                  {panMandatory && (
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <SafetyCertificateOutlined />
                      <span>PAN is mandatory for booking.</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {!roomsWithPolicies.length && (
        <div className="rounded border border-dashed p-8 text-center text-gray-500">
          No room policy information available
        </div>
      )}
    </div>
  );
};

export default Policies;
