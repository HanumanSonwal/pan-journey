import Link from "next/link";

export default function CTABlock({ data }) {
  if (!data) return null;

  const backgroundImage = data?.background || "";

  return (
    <section
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
      style={{
        background: backgroundImage
          ? `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url("${backgroundImage}") center/cover no-repeat`
          : "linear-gradient(135deg,#0f172a,#1e293b)",
      }}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          {data?.title && (
            <h2
              className="
                mb-5
                text-[28px]
                font-bold
                leading-tight
                text-white
                md:text-[38px]
                lg:text-[48px]
              "
            >
              {data.title}
            </h2>
          )}

          {data?.description && (
            <p
              className="
                mx-auto
                mb-8
                max-w-[750px]
                text-[15px]
                leading-[1.9]
                text-white/90
                md:text-[17px]
              "
            >
              {data.description}
            </p>
          )}

          {data?.buttonText && (
            <Link
              href={data?.buttonLink || "#"}
              className="
                inline-flex
                items-center
                justify-center
                rounded-lg
                bg-[#67a8e8]
                px-8
                py-3.5
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:bg-[#4f97dd]
              "
            >
              {data.buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}