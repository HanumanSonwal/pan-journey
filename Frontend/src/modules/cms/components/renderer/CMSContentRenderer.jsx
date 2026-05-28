import ContentBlock from "./blocks/ContentBlock";
import HeroBlock from "./blocks/HeroBlock";
import MarketingBlock from "./blocks/MarketingBlock";

export default function CMSContentRenderer({
  cms,
}) {
  if (!cms) return null;

  const template =
    cms?.template;

  const data =
    cms?.data || {};

  switch (
    template
  ) {
    case "heroContent":
      return (
        <HeroBlock
          data={data}
        />
      );

    case "marketing":
      return (
        <MarketingBlock
          data={data}
        />
      );

    case "content":
    default:
      return (
        <ContentBlock
          content={
            data?.content
          }
        />
      );
  }
}