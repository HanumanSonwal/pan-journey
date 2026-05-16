export default function SectionHeading({ title, description, center = true }) {
  return (
    <div className={`!z-11 mb-0 md:mb-10 lg:mb-12 mb-0 md:mb-10 lg:mb-12 mt-[-20] ${center ? "text-center" : ""} `}>
      <h2 className="text-22xl leading-tight font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-4xl !mt-[-67] ">
        {title}
      </h2>

      {description && (
        <p className="mx-auto max-w-md text-sm text-gray-500 sm:text-base !mb-[-36]">
          {description}
        </p>
      )}
    </div>
  );
}
