import FAQSection from "@/modules/shared/home/components/FAQSection";
import ContentBlock from "./blocks/ContentBlock";
import CTABlock from "./blocks/CTABlock";
import HeroBlock from "./blocks/HeroBlock";
import ImageContentBlock from "./blocks/ImageContentBlock";
import LinksBlock from "./blocks/LinksBlock";
import MarketingBlock from "./blocks/MarketingBlock";

export const BLOCK_REGISTRY = {
  hero: HeroBlock,
  marketing: MarketingBlock,
  cta: CTABlock,
  links: LinksBlock,
  imageContent: ImageContentBlock,
  faq: FAQSection,
  content: ContentBlock,
};
