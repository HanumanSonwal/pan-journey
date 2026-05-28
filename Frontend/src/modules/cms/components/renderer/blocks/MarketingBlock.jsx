export default function MarketingBlock({ data }) {
  if (!data) return null;

  return (
    <section className="mx-auto mt-8 max-w-7xl rounded-xl bg-white p-6 shadow-sm">
      {data?.bannerTitle && (
        <h2 className="mb-4 text-3xl font-semibold text-[#222]">
          {data.bannerTitle}
        </h2>
      )}

      {data?.bannerImage && (
        <img
          src={data.bannerImage}
          alt={data.bannerTitle || "Banner"}
          className="mb-5 w-full rounded-lg object-cover"
        />
      )}

      {data?.content && (
        <div
          className="cms-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        />
      )}
    </section>
  );
}
