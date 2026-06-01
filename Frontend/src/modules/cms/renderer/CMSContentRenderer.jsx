import { BLOCK_REGISTRY } from "./blockRegistry";
import ContentBlock from "./blocks/ContentBlock";

export default function CMSContentRenderer({ cms }) {
  if (!cms) return null;

  const blocks = cms?.data?.blocks || [];

  if (blocks.length) {
    return (
      <>
        {blocks.map((block, index) => {
          const Component = BLOCK_REGISTRY[block?.type] || ContentBlock;

          return (
            <Component
              key={index}
              data={block?.data}
              content={block?.data?.content}
            />
          );
        })}
      </>
    );
  }

  // legacy support
  const template = cms?.template;
  const data = cms?.data || {};

  const LegacyComponent = BLOCK_REGISTRY[template] || ContentBlock;

  return <LegacyComponent data={data} content={data?.content} />;
}
