import Link from "next/link";

export default function LinksBlock({ data }) {
  if (!data?.groups?.length) return null;

  return (
    <section
      style={{
        background: "#fff",
        padding: "70px 0",
        borderTop: "1px solid #E5E7EB",
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
                  fontSize: 15,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: 14,
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
                      fontSize: 15,
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
