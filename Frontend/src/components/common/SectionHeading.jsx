export default function SectionHeading({ title, description, center = true }) {
  return (
    <div className={`mb-8 md:mb-10 lg:mb-12 ${center ? "text-center" : ""} `}>
      <h2 className="text-2xl leading-tight font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto max-w-md text-sm text-gray-500 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
