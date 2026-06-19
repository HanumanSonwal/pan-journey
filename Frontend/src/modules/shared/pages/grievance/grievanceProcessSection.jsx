
"use client";
import {
  AuditOutlined,
  CheckCircleOutlined,
  CustomerServiceOutlined,
  ExclamationCircleOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";

const steps = [
  {
    icon: CustomerServiceOutlined,
    title: "Contact Support",
    desc: "Reach out to our support team and create a support request.",
  },
  {
    icon: FileSearchOutlined,
    title: "Support Review",
    desc: "Our team reviews your issue and attempts resolution.",
  },
  {
    icon: ExclamationCircleOutlined,
    title: "Raise Grievance",
    desc: "If unresolved, submit a grievance with supporting details.",
  },
  {
    icon: AuditOutlined,
    title: "Officer Review",
    desc: "The grievance officer investigates and reviews the case.",
  },
  {
    icon: CheckCircleOutlined,
    title: "Resolution",
    desc: "Final resolution is shared via email and support updates.",
  },
];

export default function GrievanceProcessSection() {
  return (
    <section className="bg-[#eef5fa] pt-12 lg:pt-16">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="mb-10 text-center">
          <h2 className="text-[28px] font-bold text-black md:text-[36px]">
            Grievance Resolution Process
          </h2>

          <p className="mx-auto mt-3 max-w-[700px] text-[15px] text-gray-600">
            Follow the escalation process below to ensure your concern is
            reviewed and resolved efficiently.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="relative rounded-xl bg-white p-7 text-center shadow-[0_8px_30px_rgba(0,0,0,0.08)] lg:p-8"
              >
                <div className="mb-4 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eef5fa]">
                    <Icon className="text-[24px] text-[#0f6b78]" />
                  </div>
                </div>

                <h3 className="mb-2 text-[18px] font-semibold text-black">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-600">
                  {step.desc}
                </p>

                <div className="mt-4 text-sm font-semibold text-[#0f6b78]">
                  Step {index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
