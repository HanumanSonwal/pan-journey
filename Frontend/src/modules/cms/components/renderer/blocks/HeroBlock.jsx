export default function HeroBlock({ data }) {
  if (!data) return null;

  return (
    <section className="cms-hero">
      <div className="container">
        <h1>{data.title}</h1>

        {data.description && (
          <p>{data.description}</p>
        )}
      </div>
    </section>
  );
}