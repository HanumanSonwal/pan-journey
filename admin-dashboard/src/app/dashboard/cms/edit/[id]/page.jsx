import CMSFormPage from "@/modules/cms/pages/CMSFormPage";

export default function Page({ params }) {
  return <CMSFormPage id={params.id} />;
}
