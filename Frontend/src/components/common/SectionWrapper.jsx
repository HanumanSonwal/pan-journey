export default function SectionWrapper({ children, className = "" }) {
  return (
    <section className={`${className} `}>
      <div className="!lg:px-8 !xl:px-4 !2xl:px-4 mx-auto w-full max-w-[96%] px-0 sm:px-5 md:px-6">
        {children}
      </div>
    </section>
  );
}
