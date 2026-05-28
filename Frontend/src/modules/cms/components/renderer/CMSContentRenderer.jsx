import HeroBlock from "./blocks/HeroBlock";
import FAQBlock from "./blocks/FAQBlock";
import ContentBlock from "./blocks/ContentBlock";

export default function CMSContentRenderer({
  cms,
}) {
  if (!cms) return null;

  return (
    <>
      <HeroBlock
        data={cms.heroSection}
      />

      <ContentBlock
        content={cms.content}
      />

      <FAQBlock
        faq={cms.faq}
      />
    </>
  );
}