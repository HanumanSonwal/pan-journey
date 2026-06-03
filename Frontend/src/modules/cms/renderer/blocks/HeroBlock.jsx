import Link from "next/link";

export default function HeroBlock({ data }) {
  if (!data) return null;

  const imageUrl = data?.image ? encodeURI(data.image) : null;

  const buttonLink = data?.buttonLink?.startsWith("/")
    ? data.buttonLink
    : data?.buttonLink || "#";

  const hasButton = !!data?.buttonText;

  return (
    <section className="w-full  py-0">
      <div
        className="
          relative
          mx-auto
          w-full
          overflow-hidden
          rounded
          h-[220px]
          sm:h-[300px]
          md:h-[400px]
          lg:h-[420px]
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: imageUrl
            ? `
              linear-gradient(
                rgba(15,23,42,.45),
                rgba(15,23,42,.55)
              ),
              url(${imageUrl})
            `
            : "linear-gradient(135deg,#0f172a,#1e293b)",
        }}
      >
        <div className="absolute inset-0 bg-black/10" />

        <div
          className={`
            relative
            z-10
            h-full
            flex
            px-6
            md:px-10
            ${hasButton
              ? "items-center justify-center text-center"
              : "items-center justify-start text-left"
            }
          `}
        >
          <div
            className={`${hasButton
              ? "max-w-[820px]"
              : "max-w-[650px]"
              }`}
          >
            {/* TITLE */}
            {data?.title && (
              <h2
                className="
                  text-white
                  font-bold
                  leading-tight
                  
                  text-[25px]
                  sm:text-[30px]
                  md:text-[40px]
                "
                style={{
                  textShadow: "0 3px 12px rgba(0,0,0,.25)",
                }}
              >
                {data.title}
              </h2>
            )}

            {/* SUBTITLE */}
            {data?.subtitle && (
              <p
                className="
                  text-white/95
                  text-sm
                  sm:text-base
                  leading-7
                  mb-6
                "
                style={{
                  textShadow: "0 2px 10px rgba(0,0,0,.18)",
                }}
              >
                {data.subtitle}
              </p>
            )}

            {/* BUTTON */}
            {hasButton && (
              <Link
                href={buttonLink}
                className="
                  inline-flex
                  items-center
                  justify-center
                  min-w-[165px]
                  h-12
                  px-6
                  rounded-lg
                  bg-[#5bb7ec]
                  text-white
                  font-semibold
                  text-sm
                  shadow-lg
                  hover:opacity-90
                  transition-all
                  duration-300
                "
              >
                {data.buttonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
