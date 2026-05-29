import Link from "next/link";

export default function HeroBlock({ data }) {
  if (!data) return null;

  const imageUrl = data?.image ? encodeURI(data.image) : null;

  const buttonLink = data?.buttonLink?.startsWith("/")
    ? data.buttonLink
    : data?.buttonLink || "#";

  return (
    <section
      className="cms-hero position-relative overflow-hidden"
      style={{
        // minHeight: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundImage: imageUrl
          ? `
            linear-gradient(
              rgba(15,23,42,.35),
              rgba(15,23,42,.45)
            ),
            url(${imageUrl})
          `
          : "linear-gradient(135deg,#0f172a,#1e293b)",

        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",

        color: "#fff",
        padding: "110px 20px",
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
          {data?.title && (
            <h1
              style={{
                fontSize: "clamp(2.4rem,5vw,4rem)",
                lineHeight: 1.1,
                fontWeight: 800,
                marginBottom: 20,
                letterSpacing: "-1px",
                textShadow: "0 4px 18px rgba(0,0,0,.25)",
              }}
            >
              {data.title}
            </h1>
          )}

          {data?.subtitle && (
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.8,
                opacity: 0.96,
                marginBottom: 34,
                maxWidth: 680,
                marginInline: "auto",
                textShadow: "0 2px 10px rgba(0,0,0,.18)",
              }}
            >
              {data.subtitle}
            </p>
          )}

          {data?.buttonText && (
            <Link
              href={buttonLink}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",

                minWidth: 170,
                height: 52,

                padding: "0 28px",

                borderRadius: 14,

                background: "linear-gradient(90deg,#2563eb,#1d4ed8)",

                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",

                boxShadow: "0 12px 28px rgba(37,99,235,.28)",

                transition: "all .25s ease",
              }}
            >
              {data.buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
