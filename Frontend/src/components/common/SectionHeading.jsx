export default function SectionHeading({
  title,
  description,
  center = true,
}) {
  return (
    <div
      className={`
        z-10 w-full px-4

        mt-[39px]
        min-[375px]:mt-[40px]
        min-[425px]:mt-[2px]
        min-[430px]:mt-[-16px]
        min-[430px]:mt-[-16px]
        md:mt-[-67px]
        lg:mt-[139px]
        min-[1440px]:!mt-[-12px]
        min-[2560px]:mt-[16px]

        mb-4
        sm:mb-2
        md:mb-4
        lg:mb-6
        xl:mb-6
        2xl:mb-8

        ${center ? "text-center mx-auto" : "text-left"}

        max-w-md
        sm:max-w-xl
        md:max-w-2xl
        lg:max-w-3xl
        xl:max-w-4xl
        2xl:max-w-5xl
      `}
    >
      <h2
        className="
          font-bold
          leading-tight
          tracking-tight
          text-gray-900

          text-xl
          min-[375px]:text-2xl
          min-[425px]:text-[30px]
          md:text-3xl
          lg:text-4xl
          min-[1440px]:text-5xl
          min-[2560px]:text-6xl
        "
      >
        {title}
      </h2>

      {description && (
        <p
          className={`
            mt-2
            sm:mt-3
            md:mt-4

            text-gray-500

            text-xs
            min-[375px]:text-sm
            min-[425px]:text-[15px]
            md:text-base
            lg:text-lg
            min-[1440px]:text-xl
            min-[2560px]:text-2xl

            max-w-xs
            sm:max-w-sm
            md:max-w-md
            lg:max-w-xl
            xl:max-w-2xl
            2xl:max-w-3xl

            ${center ? "mx-auto" : ""}
          `}
        >
          {description}
        </p>
      )}
    </div>
  );
}
