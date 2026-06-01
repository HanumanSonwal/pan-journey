import Link from "next/link";

export default function HeroBlock({ data }) {
  if (!data) return null;

  const imageUrl = data?.image ? encodeURI(data.image) : null;

  const buttonLink = data?.buttonLink?.startsWith("/")
    ? data.buttonLink
    : data?.buttonLink || "#";

  return (
    <section className="px-4 py-8">
      <div
        className="cms-hero relative mx-auto overflow-hidden rounded border border-[#dbe8f1]"
        style={{
          maxWidth: 1200,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          backgroundImage: imageUrl
            ? `
              linear-gradient(
                rgba(15,23,42,.45),
                rgba(15,23,42,.55)
              ),
              url(${imageUrl})
            `
            : "linear-gradient(135deg,#0f172a,#1e293b)",

          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",

          color: "#fff",
          padding: "72px 24px",
        }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: 820,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            {/* TITLE */}
            {data?.title && (
              <h2
                style={{
                  fontSize: "clamp(2rem,4vw,3.2rem)",
                  lineHeight: 1.15,
                  fontWeight: 700,
                  marginBottom: 18,
                  letterSpacing: "-0.5px",
                  textShadow: "0 3px 12px rgba(0,0,0,.25)",
                }}
              >
                {data.title}
              </h2>
            )}

            {/* SUBTITLE */}
            {data?.subtitle && (
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.9,
                  opacity: 0.96,
                  marginBottom: 30,
                  maxWidth: 700,
                  marginInline: "auto",
                  textShadow: "0 2px 10px rgba(0,0,0,.18)",
                }}
              >
                {data.subtitle}
              </p>
            )}

            {/* BUTTON */}
            {data?.buttonText && (
              <Link
                href={buttonLink}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",

                  minWidth: 165,
                  height: 48,

                  padding: "0 26px",

                  borderRadius: 8,

                  background: "#5bb7ec",

                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",

                  boxShadow: "0 8px 20px rgba(91,183,236,.22)",

                  transition: "all .25s ease",
                }}
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
