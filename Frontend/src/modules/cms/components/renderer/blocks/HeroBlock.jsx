import Link from "next/link";

export default function HeroBlock({ data }) {
  if (!data) return null;

  const imageUrl = data?.image ? encodeURI(data.image) : null;

  const buttonLink = data?.buttonLink?.startsWith("/")
    ? data.buttonLink
    : data?.buttonLink || "#";

  return (
    <section
      className="cms-hero position-relative"
      style={{
        minHeight: "clamp(280px, 60vw, 430px)",
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "clamp(50px, 8vw, 120px) 20px",
        backgroundImage: imageUrl
          ? `
            linear-gradient(
              rgba(255,255,255,0.55),
              rgba(255,255,255,0.55)
            ),
            url(${imageUrl})
          `
          : "linear-gradient(135deg,#f8fafc,#e2e8f0)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 15px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "550px",
          }}
        >
          {data?.title && (
            <h1
              style={{
                fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
                fontWeight: 600,
                color: "#1f1f1f",
                lineHeight: 1.1,
                marginBottom: "4px",
                wordBreak: "break-word",
              }}
            >
              {data.title}
            </h1>
          )}

          {data?.subtitle && (
            <p
              style={{
                fontSize: "clamp(.8rem, 2vw, 1rem)",
                lineHeight: 1.7,
                color: "#232323",
                marginBottom: "20px",
                maxWidth: "500px",
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
                minHeight: "50px",
                minWidth: "160px",
                padding: "12px 30px",
                background: "#000",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "15px",
                transition: "all 0.3s ease",
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