import FAQSection from "@/modules/shared/home/components/FAQSection";
import ContentBlock from "./blocks/ContentBlock";
import CTABlock from "./blocks/CTABlock";
import HeroBlock from "./blocks/HeroBlock";
import ImageContentBlock from "./blocks/ImageContentBlock";
import LinksBlock from "./blocks/LinksBlock";
import MarketingBlock from "./blocks/MarketingBlock";
export default function CMSContentRenderer({ cms }) {
  if (!cms) return null;

  const blocks = cms?.data?.blocks || [];

  if (blocks.length) {
    return (
      <>
        {blocks.map((block, index) => {
          switch (block?.type) {
            case "hero":
              return <HeroBlock key={index} data={block?.data} />;

            case "marketing":
              return <MarketingBlock key={index} data={block?.data} />;

            case "cta":
              return <CTABlock key={index} data={block?.data} />;

            case "links":
              return <LinksBlock key={index} data={block?.data} />;

            case "imageContent":
              return <ImageContentBlock key={index} data={block?.data} />;
            case "faq":
              return <FAQSection key={index} data={block?.data} />;

            case "content":
            default:
              return (
                <ContentBlock key={index} content={block?.data?.content} />
              );
          }
        })}
      </>
    );
  }

  /*
    LEGACY TEMPLATE SUPPORT
  */
  const template = cms?.template;
  const data = cms?.data || {};
  switch (template) {
    case "heroContent":
      return <HeroBlock data={data} />;

    case "marketing":
      return <MarketingBlock data={data} />;

    case "content":
    default:
      return <ContentBlock content={data?.content} />;
  }
}
