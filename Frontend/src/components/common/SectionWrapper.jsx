export default function SectionWrapper({ children, className = "" }) {
  return (
    <section className={`py-8 sm:py-10 md:py-12 lg:py-2 xl:py-2 ${className} `}>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {children}
      </div>
    </section>
  );
}
