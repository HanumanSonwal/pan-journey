import Link from "next/link";

export default function LinksBlock({ data }) {
  if (!data?.groups?.length) return null;

  return (
    <section
      style={{
        background: "#EDF7FF",
        padding: "40px 10%",

      }}
    >
      <div className="container">
        {data.groups.map((group, index) => (
          <div
            key={index}
            style={{
              marginBottom: 32,
            }}
          >
            {group?.title && (
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: 9,
                  color: "#111827",
                }}
              >
                {group.title}
              </h3>
            )}

            <div
              style={{
                lineHeight: 2.1,
              }}
            >
              {group?.links?.map((item, i) => (
                <span key={i}>
                  <Link
                    href={item?.url || "#"}
                    style={{
                      color: "#374151",
                      textDecoration: "none",
                      fontSize: 14,
                    }}
                  >
                    {item?.label}
                  </Link>

                  {i !== group.links.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
