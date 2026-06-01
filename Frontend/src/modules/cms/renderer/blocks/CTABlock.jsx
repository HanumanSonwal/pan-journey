import Link from "next/link";

export default function CTABlock({ data }) {
  return (
    <section className="container py-5 text-center">
      {data?.title && <h2>{data.title}</h2>}

      {data?.description && <p>{data.description}</p>}

      {data?.buttonText && (
        <Link href={data?.buttonLink || "#"} className="btn btn-primary">
          {data.buttonText}
        </Link>
      )}
    </section>
  );
}
