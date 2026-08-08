"use client";

import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useParams, useRouter } from "next/navigation";
import NewsletterSection from "../../home/components/NewsletterSection";

/* -------------------------------------------------------------------------- */
/*                              BLOG DATA                                     */
/* -------------------------------------------------------------------------- */

const BLOGS = {
  "jaipur-pink-city": {
    title: "Jaipur – The Pink City",
    category: "Destinations",
    description:
      "Discover the royal charm of Jaipur, explore magnificent forts and palaces, colourful markets, rich culture and unforgettable experiences in the Pink City of India.",
    date: "05 Aug 2026",
    readTime: "6 min read",
    location: "Jaipur, Rajasthan",
    author: "Pan Journey",

    /* SAME IMAGE AS BLOG CARD */

    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1800&q=85",

    content: "jaipur",
  },

  "perfect-weekend-getaway": {
    title: "How to Plan the Perfect Weekend Getaway",
    category: "Travel Tips",
    description:
      "A simple guide to planning a relaxing and memorable weekend trip without spending too much.",
    date: "03 Aug 2026",
    readTime: "5 min read",
    location: "India",
    author: "Pan Journey",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85",
    content: "default",
  },

  "top-beach-destinations": {
    title: "Top Beach Destinations for a Relaxing Holiday",
    category: "Destinations",
    description:
      "From peaceful beaches to exciting coastal cities, explore destinations perfect for your next escape.",
    date: "01 Aug 2026",
    readTime: "7 min read",
    location: "Goa",
    author: "Pan Journey",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
    content: "default",
  },

  "travel-on-a-budget": {
    title: "Travel on a Budget: Smart Ways to Save Money",
    category: "Budget Travel",
    description:
      "Learn practical tips that can help you save money on hotels, transport, food, and activities.",
    date: "29 Jul 2026",
    readTime: "5 min read",
    location: "India",
    author: "Pan Journey",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=85",
    content: "default",
  },

  "best-hill-stations": {
    title: "Best Hill Stations to Escape the Summer Heat",
    category: "Destinations",
    description:
      "Planning a cool mountain vacation? These hill stations are perfect for your next summer trip.",
    date: "26 Jul 2026",
    readTime: "6 min read",
    location: "Himachal Pradesh",
    author: "Pan Journey",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85",
    content: "default",
  },

  "hotel-booking-tips": {
    title: "Hotel Booking Tips Every Traveller Should Know",
    category: "Hotels",
    description:
      "Before booking your next hotel, check these important things to get a better stay and better value.",
    date: "24 Jul 2026",
    readTime: "4 min read",
    location: "India",
    author: "Pan Journey",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85",
    content: "default",
  },

  "family-vacation-guide": {
    title: "A Complete Guide to Planning a Family Vacation",
    category: "Travel Tips",
    description:
      "Everything you need to know to plan a comfortable and enjoyable family holiday.",
    date: "20 Jul 2026",
    readTime: "8 min read",
    location: "India",
    author: "Pan Journey",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1800&q=85",
    content: "default",
  },

  "hidden-travel-gems": {
    title: "Hidden Travel Gems You Should Explore",
    category: "Destinations",
    description:
      "Move beyond the usual tourist destinations and discover some beautiful lesser-known places.",
    date: "18 Jul 2026",
    readTime: "6 min read",
    location: "India",
    author: "Pan Journey",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=85",
    content: "default",
  },

  "things-to-pack": {
    title: "Things to Pack Before Every Trip",
    category: "Travel Tips",
    description:
      "A useful packing checklist to make sure you never forget the essentials on your next journey.",
    date: "15 Jul 2026",
    readTime: "4 min read",
    location: "Worldwide",
    author: "Pan Journey",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1800&q=85",
    content: "default",
  },
};

/* -------------------------------------------------------------------------- */
/*                         DEFAULT ARTICLE CONTENT                             */
/* -------------------------------------------------------------------------- */

const DefaultArticle = ({ blog }) => {
  return (
    <div className="space-y-8">
      <p className="text-[17px] leading-8 font-medium text-[#374151] sm:text-[18px]">
        {blog.description}
      </p>

      <div className="h-px bg-gray-100" />

      <section>
        <h2 className="text-[23px] font-bold text-[#172033] sm:text-[30px]">
          Discover More About Your Next Journey
        </h2>

        <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          Every journey offers something different. From beautiful destinations
          and memorable experiences to local food and culture, travelling allows
          you to discover new places and create unforgettable memories.
        </p>

        <p className="mt-4 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          Before planning your trip, research the destination, choose the right
          time to visit and make sure your itinerary gives you enough time to
          enjoy the experience.
        </p>
      </section>

      <section>
        <h2 className="text-[23px] font-bold text-[#172033] sm:text-[30px]">
          Plan Your Trip Smartly
        </h2>

        <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          A little preparation can make your journey much more comfortable.
          Compare accommodation options, check transportation, prepare the
          essentials and keep some flexibility in your travel plan.
        </p>
      </section>

      <div className="rounded-[16px] border-l-4 border-[#008cff] bg-[#eef7fd] px-5 py-4">
        <p className="text-[14px] leading-7 text-[#31536a]">
          <strong>Travel Tip:</strong> Always check local weather, travel
          conditions and important destination information before starting your
          trip.
        </p>
      </div>

      <section>
        <h2 className="text-[23px] font-bold text-[#172033] sm:text-[30px]">
          Make Your Journey Memorable
        </h2>

        <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          The best trips are not only about visiting famous attractions. Explore
          local places, try traditional food, talk to local people and take time
          to enjoy the destination.
        </p>
      </section>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                           JAIPUR ARTICLE                                   */
/* -------------------------------------------------------------------------- */

const JaipurArticle = () => {
  return (
    <>
      <p className="text-[17px] leading-8 font-medium text-[#374151] sm:text-[18px]">
        Jaipur, popularly known as the Pink City, is one of the most beautiful
        destinations in Rajasthan. The city is famous for its royal palaces,
        magnificent forts, colourful markets, traditional culture and delicious
        Rajasthani cuisine.
      </p>

      <div className="my-8 h-px bg-gray-100" />

      {/* ROYAL HERITAGE */}

      <section>
        <h2 className="text-[23px] leading-tight font-bold text-[#172033] sm:text-[30px]">
          Discover the Royal Heritage of Jaipur
        </h2>

        <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          Jaipur is a perfect destination for travellers who want to experience
          the royal history of Rajasthan. The city was founded by Maharaja Sawai
          Jai Singh II and is known for its impressive architecture and planned
          streets.
        </p>

        <p className="mt-4 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          Walking through the old city, you can see beautiful pink buildings,
          traditional shops, local markets and historic landmarks that tell the
          story of Rajasthan's royal past.
        </p>
      </section>

      {/* AMBER FORT */}

      <section className="mt-10">
        <h2 className="text-[23px] leading-tight font-bold text-[#172033] sm:text-[30px]">
          Amber Fort
        </h2>

        <div className="mt-5 overflow-hidden rounded-[16px]">
          <img
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85"
            alt="Amber Fort Jaipur"
            className="h-[230px] w-full object-cover transition-transform duration-500 hover:scale-[1.02] sm:h-[350px]"
          />
        </div>

        <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          Amber Fort is one of Jaipur's most famous attractions. Located on a
          hilltop, the fort offers spectacular views of the surrounding
          landscape and showcases beautiful Rajput and Mughal architecture.
        </p>

        <p className="mt-4 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          Visitors can explore the grand courtyards, detailed carvings, royal
          rooms and beautiful mirror work inside the fort.
        </p>
      </section>

      {/* TRAVEL TIP */}

      <div className="mt-7 rounded-[14px] border-l-4 border-[#008cff] bg-[#eef7fd] px-5 py-4">
        <p className="text-[14px] leading-7 text-[#31536a]">
          <strong>Travel Tip:</strong> Visit Amber Fort early in the morning to
          avoid large crowds and enjoy the pleasant weather.
        </p>
      </div>

      {/* HAWA MAHAL */}

      <section className="mt-10">
        <h2 className="text-[23px] leading-tight font-bold text-[#172033] sm:text-[30px]">
          Hawa Mahal
        </h2>

        <div className="mt-5 overflow-hidden rounded-[16px]">
          <img
            src="https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=85"
            alt="Hawa Mahal Jaipur"
            className="h-[230px] w-full object-cover transition-transform duration-500 hover:scale-[1.02] sm:h-[350px]"
          />
        </div>

        <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          Hawa Mahal is one of the most recognizable landmarks of Jaipur. Its
          unique five-storey structure features hundreds of small windows
          designed to allow cool air to pass through the building.
        </p>

        <p className="mt-4 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          The beautiful pink and red sandstone facade makes Hawa Mahal one of
          the most photographed places in the city.
        </p>
      </section>

      {/* CITY PALACE */}

      <section className="mt-10">
        <h2 className="text-[23px] leading-tight font-bold text-[#172033] sm:text-[30px]">
          City Palace
        </h2>

        <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          City Palace is another important attraction in Jaipur. The palace
          complex combines traditional Rajput architecture with Mughal
          influences.
        </p>

        <p className="mt-4 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          Visitors can explore beautiful courtyards, museums, royal rooms and
          historic collections while learning more about Jaipur's royal
          heritage.
        </p>
      </section>

      {/* MARKETS */}

      <section className="mt-10">
        <h2 className="text-[23px] leading-tight font-bold text-[#172033] sm:text-[30px]">
          Jaipur Local Markets
        </h2>

        <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          Jaipur is also famous for its colourful markets. Johari Bazaar, Bapu
          Bazaar and Tripolia Bazaar are great places to experience local
          shopping.
        </p>

        <p className="mt-4 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          You can find traditional jewellery, handicrafts, textiles, footwear,
          pottery and many other Rajasthani products.
        </p>
      </section>

      {/* FOOD */}

      <section className="mt-10">
        <h2 className="text-[23px] leading-tight font-bold text-[#172033] sm:text-[30px]">
          Rajasthani Food You Must Try
        </h2>

        <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          A trip to Jaipur is incomplete without trying traditional Rajasthani
          food. Dal Baati Churma, Gatte Ki Sabzi, Ker Sangri and traditional
          sweets are popular choices.
        </p>

        <p className="mt-4 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
          Local restaurants and traditional dining experiences offer a great way
          to enjoy the flavours of Rajasthan.
        </p>
      </section>

      {/* CHECKLIST */}

      <div className="mt-10 rounded-[18px] bg-[#f7fafc] p-5 sm:p-7">
        <h3 className="text-[20px] font-bold text-[#172033]">
          Jaipur Travel Checklist
        </h3>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "Visit Amber Fort",
            "Explore Hawa Mahal",
            "Visit City Palace",
            "Explore local markets",
            "Try traditional Rajasthani food",
            "Enjoy a Jaipur sunset",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-[13px] text-gray-600 shadow-sm"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e9f6ff] text-[11px] font-bold text-[#008cff]">
                ✓
              </span>

              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                              DETAIL PAGE                                   */
/* -------------------------------------------------------------------------- */

const BlogDetailPage = () => {
  const router = useRouter();
  const params = useParams();

  const slug = params?.slug;

  const blog = BLOGS[slug] || BLOGS["jaipur-pink-city"];

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: blog.title,
          text: blog.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // Share cancelled
    }
  };

  return (
    <>
      {/* ================================================================== */}
      {/* HERO                                                               */}
      {/* ================================================================== */}

      <section className="relative overflow-hidden bg-[#092f49]">
        {/* SAME IMAGE AS CARD */}

        <div className="absolute inset-0">
          <img
            src={blog.image}
            alt={blog.title}
            className="h-full w-full object-cover opacity-35"
          />
        </div>

        <div className="absolute inset-0 bg-[#06283d]/80" />

        <div className="relative mx-auto flex min-h-[430px] w-full max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => router.push("/blog")}
            className="mb-8 flex w-fit items-center gap-2 border-0 bg-transparent p-0 text-sm font-semibold text-white/80 transition-all duration-200 hover:text-white"
          >
            <ArrowLeftOutlined />
            Back to Blogs
          </button>

          <span className="w-fit rounded-full bg-white/10 px-4 py-2 text-[11px] font-bold tracking-wider text-white uppercase backdrop-blur-sm">
            {blog.category}
          </span>

          <h1 className="mt-5 max-w-4xl text-[34px] leading-[1.15] font-bold tracking-tight text-white sm:text-[44px] lg:text-[54px]">
            {blog.title}
          </h1>

          <p className="mt-5 max-w-3xl text-[14px] leading-7 text-white/75 sm:text-[16px]">
            {blog.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-[12px] text-white/70">
            <span className="flex items-center gap-1.5">
              <CalendarOutlined />
              {blog.date}
            </span>

            <span className="flex items-center gap-1.5">
              <ClockCircleOutlined />
              {blog.readTime}
            </span>

            <span className="flex items-center gap-1.5">
              <EnvironmentOutlined />
              {blog.location}
            </span>

            <span className="flex items-center gap-1.5">
              <UserOutlined />
              {blog.author}
            </span>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* MAIN                                                               */}
      {/* ================================================================== */}

      <main className="bg-[#f8fafc]">
        <div className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-5 sm:py-10 lg:px-6 xl:px-0">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            {/* ARTICLE */}

            <article className="min-w-0 overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-[0_5px_22px_rgba(0,0,0,0.05)]">
              {/* SAME IMAGE AGAIN */}

              <div className="relative h-[250px] overflow-hidden sm:h-[400px] lg:h-[520px]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* CONTENT */}

              <div className="px-5 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                {blog.content === "jaipur" ? (
                  <JaipurArticle />
                ) : (
                  <DefaultArticle blog={blog} />
                )}

                {/* AUTHOR */}

                <div className="mt-10 flex flex-col gap-4 rounded-[18px] border border-gray-100 bg-[#fafcff] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf6ff] text-lg text-[#008cff]">
                      <UserOutlined />
                    </div>

                    <div>
                      <p className="text-[12px] text-gray-400">Written by</p>

                      <p className="text-[15px] font-bold text-[#172033]">
                        {blog.author}
                      </p>

                      <p className="text-[12px] text-gray-400">
                        Travel & Destination Guide
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleShare}
                    icon={<ShareAltOutlined />}
                    className="!h-[42px] !rounded-lg !border-gray-200 !font-semibold"
                  >
                    Share Article
                  </Button>
                </div>

                {/* BOTTOM NAVIGATION */}

                <div className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.push("/blog")}
                    className="!h-[44px] !rounded-lg !border-gray-200 !font-semibold"
                  >
                    Back to All Articles
                  </Button>

                  <Button
                    type="primary"
                    onClick={() => router.push("/")}
                    className="buttion-background-color !h-[44px] !rounded-lg !border-none !font-semibold !text-white"
                  >
                    Explore Pan Journey
                  </Button>
                </div>
              </div>
            </article>

            {/* SIDEBAR */}

            <aside className="hidden lg:block">
              <div className="sticky top-[100px] space-y-5">
                <div className="rounded-[18px] border border-gray-100 bg-white p-5 shadow-[0_5px_20px_rgba(0,0,0,0.04)]">
                  <p className="most-text-color text-[11px] font-bold tracking-wider uppercase">
                    In This Article
                  </p>

                  <h3 className="mt-1 text-[18px] font-bold text-[#172033]">
                    {blog.title}
                  </h3>

                  <div className="mt-4 space-y-1">
                    {[
                      "Introduction",
                      "Travel Guide",
                      "Important Places",
                      "Local Experience",
                      "Travel Tips",
                    ].map((item) => (
                      <div
                        key={item}
                        className="hover:most-text-color rounded-lg px-3 py-2.5 text-[13px] leading-5 text-gray-500 transition-colors hover:bg-[#f1f8fc]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* PAN JOURNEY CARD */}

                <div className="overflow-hidden rounded-[18px] bg-[#092f49] p-6 text-white">
                  <p className="text-[11px] font-bold tracking-wider text-white/60 uppercase">
                    PAN JOURNEY
                  </p>

                  <h3 className="mt-2 text-[21px] leading-tight font-bold">
                    Plan your next journey with confidence.
                  </h3>

                  <p className="mt-3 text-[13px] leading-6 text-white/70">
                    Discover destinations, compare stays and find travel
                    inspiration for your next trip.
                  </p>

                  <Button
                    onClick={() => router.push("/")}
                    className="mt-5 !h-[42px] !rounded-lg !border-none !bg-white !px-5 !font-semibold !text-[#092f49]"
                  >
                    Explore Pan Journey
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <NewsletterSection />
    </>
  );
};

export default BlogDetailPage;
