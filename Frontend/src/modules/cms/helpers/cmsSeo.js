export const buildCmsMetadata = (cms) => {
  if (!cms) return {};

  return {
    title: cms.metaTitle || cms.name,
    description: cms.metaDescription || "",
    openGraph: {
      title: cms.metaTitle,
      description: cms.metaDescription,
    },
  };
};