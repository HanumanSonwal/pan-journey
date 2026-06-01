export default function FAQBlock({ data }) {
  if (!data?.items?.length) return null;

  return (
    <section className="container py-5">
      {data?.title && <h2 className="mb-4">{data.title}</h2>}

      <div className="d-flex flex-column gap-4">
        {data.items.map((item, index) => (
          <div key={index}>
            <h5>{item?.question}</h5>

            <p>{item?.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
