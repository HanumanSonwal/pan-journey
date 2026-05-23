"use client";

const FeesRules = ({ ratePlans = [] }) => {
  const detail = ratePlans?.[0]?.RatePlanDetails?.[0];
  const essential = detail?.EssentialInformation || [];
  const mandatory = essential.find((i) => i.type === "Mandatory Fee");
  const optional = essential.find((i) => i.type === "Optional Fee");
  const charges = detail?.AdditionalCharges;

  return (
    <div className="space-y-5">
      {/* Additional Charges */}
      {!!charges && (
        <div className="rounded border border-red-100 bg-red-50 p-5">
          <h3 className="mb-2 text-lg font-semibold text-red-700">
            Additional Charges
          </h3>

          <p className="text-sm leading-7 text-red-600">{charges}</p>
        </div>
      )}

      {/* Mandatory */}
      {!!mandatory && (
        <div className="rounded border border-orange-100 bg-orange-50 p-5">
          <h3 className="mb-2 text-lg font-semibold text-orange-700">
            Mandatory Fees
          </h3>

          <p className="leading-7 text-orange-700">{mandatory.text}</p>
        </div>
      )}

      {/* Optional */}
      {!!optional && (
        <div className="rounded border border-blue-100 bg-blue-50 p-5">
          <h3 className="mb-2 text-lg font-semibold text-blue-700">
            Optional Fees
          </h3>

          <p className="leading-7 text-blue-700">{optional.text}</p>
        </div>
      )}

      {!charges && !mandatory && !optional && (
        <div className="rounded border border-dashed p-8 text-center text-gray-500">
          No fees information available
        </div>
      )}
    </div>
  );
};

export default FeesRules;
