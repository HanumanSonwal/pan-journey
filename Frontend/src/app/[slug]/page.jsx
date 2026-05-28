import CMSContentRenderer from "@/modules/cms/components/renderer/CMSContentRenderer";
import { buildCmsMetadata } from "@/modules/cms/helpers/cmsSeo";
import { fetchCmsBySlug } from "@/modules/cms/services/cmsFetch";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const cms = await fetchCmsBySlug({
    slug,
    type: "hotel",
  });

  return buildCmsMetadata(cms);
}

export default async function CMSPage({ params }) {
  const { slug } = await params;

  const cms = await fetchCmsBySlug({
    slug,
    type: "hotel",
  });

  if (!cms) {
    notFound();
  }

  return <CMSContentRenderer cms={cms} />;
}
