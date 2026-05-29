import CMSPageLayout from "@/modules/cms/components/CMSPageLayout";
import CMSContentRenderer from "@/modules/cms/components/renderer/CMSContentRenderer";
import { buildCmsMetadata } from "@/modules/cms/helpers/cmsSeo";
import { fetchCmsBySlug } from "@/modules/cms/services/cmsFetch";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cms = await fetchCmsBySlug(slug);
  if (!cms) return {};
  return buildCmsMetadata(cms);
}
export default async function CMSPage({ params }) {
  const { slug } = await params;
  const cms = await fetchCmsBySlug(slug);
  if (!cms) {
    notFound();
  }

return (
  <CMSPageLayout cms={cms}>
    <CMSContentRenderer cms={cms} />
  </CMSPageLayout>
);
}
