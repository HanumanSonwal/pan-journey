export default function ContactFormSection() {
  return (
    <section className="bg-[#eef5fa] py-30 lg:py-42">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">

          {/* Left Content */}
          <div>
            <h2 className="text-[22px] sm:text-[24px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-bold text-black leading-[1.2] mb-6">
              We’re Always Here To
              <br />
              Help You
            </h2>

            <p className="text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-black leading-[1.8] max-w-[700px] mb-12 lg:mb-20">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is.
            </p>

            <h3 className="text-[28px] md:text-[32px] lg:text-[40px] font-semibold text-[#0f6b78] mb-8 lg:mb-10">
              Business Hours
            </h3>

            <div className="space-y-6 lg:space-y-10">
              <div className="border-b border-gray-300 pb-3 flex justify-between items-center">
                <span className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-black">
                  Monday - Sunday
                </span>

                <span className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-semibold text-black">
                  10 AM - 6 PM
                </span>
              </div>

              <div className="border-b border-gray-300 pb-3 flex justify-between items-center">
                <span className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-black">
                  Online
                </span>

                <span className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-semibold text-black">
                  24 Hrs.
                </span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-5 sm:p-6 md:p-8 lg:p-10">
            <h3 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold text-black mb-5 md:mb-8">
              Fill this form
            </h3>

            <form className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-[14px] sm:text-[16px] md:text-[18px] mb-2 text-black">
                  Full Name*
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full h-[42px] sm:h-[48px] md:h-[52px] border border-gray-300 rounded-md px-3 md:px-4 outline-none text-[14px] md:text-[16px]"
                />
              </div>

              <div>
                <label className="block text-[14px] sm:text-[16px] md:text-[18px] mb-2 text-black">
                  Email*
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-[42px] sm:h-[48px] md:h-[52px] border border-gray-300 rounded-md px-3 md:px-4 outline-none text-[14px] md:text-[16px]"
                />
              </div>

              <div>
                <label className="block text-[14px] sm:text-[16px] md:text-[18px] mb-2 text-black">
                  Subject*
                </label>

                <input
                  type="text"
                  placeholder="Enter your subject"
                  className="w-full h-[42px] sm:h-[48px] md:h-[52px] border border-gray-300 rounded-md px-3 md:px-4 outline-none text-[14px] md:text-[16px]"
                />
              </div>

              <div>
                <label className="block text-[14px] sm:text-[16px] md:text-[18px] mb-2 text-black">
                  Message
                </label>

                <textarea
                  rows={5}
                  placeholder="Enter your message"
                  className="w-full border border-gray-300 rounded-md p-3 md:p-4 outline-none resize-none text-[14px] md:text-[16px]"
                />
              </div>

              <button
                type="submit"
                className="px-6 sm:px-8 py-2.5 md:py-3 rounded-md text-white text-[14px] sm:text-[16px] md:text-[18px] bg-gradient-to-b from-[#67b5e2] to-[#006c7a]"
              >
                Submit
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}