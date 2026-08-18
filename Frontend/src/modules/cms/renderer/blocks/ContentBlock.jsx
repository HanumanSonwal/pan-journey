import "./ContentBlock.css";

export default function ContentBlock({ content }) {
  if (!content) return null;

  return (
    <section className="cms-content-block">
      <div
        className="cms-content-wrapper"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
}
