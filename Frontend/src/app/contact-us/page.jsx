import CMSContentRenderer from "@/modules/cms/renderer/CMSContentRenderer";
import { fetchCmsBySlug } from "@/modules/cms/services/cmsFetch";
import NewsletterSection from "@/modules/shared/home/components/NewsletterSection";
import ContactFormSection from "@/modules/shared/pages/contact-us/contactcontant";
import ContactSection from "@/modules/shared/pages/contact-us/contacthero";
import ContactMapSection from "@/modules/shared/pages/contact-us/ContactMapSection";

export default async function ContactSectionPages() {
  const homeCms = await fetchCmsBySlug("home");

  const faqBlock = homeCms?.data?.blocks?.find((block) => block.type === "faq");

  const faqCms = faqBlock
    ? {
        ...homeCms,
        data: {
          ...homeCms.data,
          blocks: [faqBlock],
        },
      }
    : null;

  return (
    <>
      <ContactSection />
      <section className="bg-[#eef5fa] pt-21 lg:pt-28">
        {faqCms && <CMSContentRenderer cms={faqCms} />}
      </section>
      <ContactFormSection />

      <ContactMapSection />

      <NewsletterSection />
    </>
  );
}
