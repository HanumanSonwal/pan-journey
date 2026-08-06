"use client";

import {
  ArrowRightOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import NewsletterSection from "../../home/components/NewsletterSection";

/* -------------------------------------------------------------------------- */
/*                              BLOG DATA                                     */
/* -------------------------------------------------------------------------- */

const BLOGS = [
  {
    id: 1,
    title: "10 Best Places to Visit in India for Your Next Vacation",
    description:
      "Discover beautiful destinations, unforgettable experiences, and the best places to explore across India.",
    category: "Destinations",
    author: "Pan Journey",
    date: "05 Aug 2026",
    readTime: "6 min read",
    location: "India",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "How to Plan the Perfect Weekend Getaway",
    description:
      "A simple guide to planning a relaxing and memorable weekend trip without spending too much.",
    category: "Travel Tips",
    author: "Pan Journey",
    date: "03 Aug 2026",
    readTime: "5 min read",
    location: "India",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Top Beach Destinations for a Relaxing Holiday",
    description:
      "From peaceful beaches to exciting coastal cities, explore destinations perfect for your next escape.",
    category: "Destinations",
    author: "Pan Journey",
    date: "01 Aug 2026",
    readTime: "7 min read",
    location: "Goa",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    title: "Travel on a Budget: Smart Ways to Save Money",
    description:
      "Learn practical tips that can help you save money on hotels, transport, food, and activities.",
    category: "Budget Travel",
    author: "Pan Journey",
    date: "29 Jul 2026",
    readTime: "5 min read",
    location: "India",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    title: "Best Hill Stations to Escape the Summer Heat",
    description:
      "Planning a cool mountain vacation? These hill stations are perfect for your next summer trip.",
    category: "Destinations",
    author: "Pan Journey",
    date: "26 Jul 2026",
    readTime: "6 min read",
    location: "Himachal Pradesh",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    title: "Hotel Booking Tips Every Traveller Should Know",
    description:
      "Before booking your next hotel, check these important things to get a better stay and better value.",
    category: "Hotels",
    author: "Pan Journey",
    date: "24 Jul 2026",
    readTime: "4 min read",
    location: "India",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 7,
    title: "A Complete Guide to Planning a Family Vacation",
    description:
      "Everything you need to know to plan a comfortable and enjoyable family holiday.",
    category: "Travel Tips",
    author: "Pan Journey",
    date: "20 Jul 2026",
    readTime: "8 min read",
    location: "India",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 8,
    title: "Hidden Travel Gems You Should Explore",
    description:
      "Move beyond the usual tourist destinations and discover some beautiful lesser-known places.",
    category: "Destinations",
    author: "Pan Journey",
    date: "18 Jul 2026",
    readTime: "6 min read",
    location: "India",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 9,
    title: "Things to Pack Before Every Trip",
    description:
      "A useful packing checklist to make sure you never forget the essentials on your next journey.",
    category: "Travel Tips",
    author: "Pan Journey",
    date: "15 Jul 2026",
    readTime: "4 min read",
    location: "Worldwide",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
  },
];

/* -------------------------------------------------------------------------- */
/*                              CATEGORIES                                    */
/* -------------------------------------------------------------------------- */

const CATEGORIES = [
  "All",
  "Destinations",
  "Travel Tips",
  "Hotels",
  "Budget Travel",
];

/* -------------------------------------------------------------------------- */
/*                              BLOG CARD                                     */
/* -------------------------------------------------------------------------- */

const BlogCard = ({ blog, onClick }) => {
  return (
    <article className="group overflow-hidden rounded-[18px] border border-gray-100 bg-white shadow-[0_4px_18px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.10)]">
      {/* IMAGE */}
      <div className="relative h-[210px] w-full overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />

        {/* CATEGORY */}
        <span className="most-text-color absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold shadow-sm">
          {blog.category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* META */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-gray-400">
          <span className="flex items-center gap-1">
            <CalendarOutlined />
            {blog.date}
          </span>

          <span className="flex items-center gap-1">
            <ClockCircleOutlined />
            {blog.readTime}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="group-hover:most-text-color mt-3 line-clamp-2 min-h-[52px] text-[19px] leading-[1.35] font-bold transition-colors duration-200">
          {blog.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-gray-500">
          {blog.description}
        </p>

        {/* FOOTER */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="most-text-color flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef6fb] text-[13px]">
              <UserOutlined />
            </span>

            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-[#555]">
                {blog.author}
              </p>

              <p className="flex items-center gap-1 text-[11px] text-gray-400">
                <EnvironmentOutlined />
                {blog.location}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onClick(blog)}
            className="most-text-color flex shrink-0 items-center gap-1.5 border-0 bg-transparent p-0 text-[13px] font-bold transition-all duration-200 hover:gap-2.5"
          >
            Read More
            <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </article>
  );
};

/* -------------------------------------------------------------------------- */
/*                              BLOG PAGE                                      */
/* -------------------------------------------------------------------------- */

const BlogPage = () => {
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState("All");

  const [search, setSearch] = useState("");

  /* ------------------------------------------------------------------------ */
  /*                            FILTER BLOGS                                  */
  /* ------------------------------------------------------------------------ */

  const filteredBlogs = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return BLOGS.filter((blog) => {
      const categoryMatch =
        activeCategory === "All" || blog.category === activeCategory;

      const searchMatch =
        !searchValue ||
        blog.title.toLowerCase().includes(searchValue) ||
        blog.description.toLowerCase().includes(searchValue) ||
        blog.category.toLowerCase().includes(searchValue) ||
        blog.location.toLowerCase().includes(searchValue);

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const featuredBlog = BLOGS.find((blog) => blog.featured) || BLOGS[0];

  /* ------------------------------------------------------------------------ */
  /*                           BLOG OPEN                                      */
  /* ------------------------------------------------------------------------ */

  const handleBlogClick = (blog) => {
    /*
     * If you already have a dynamic blog route,
     * replace this with:
     *
     * router.push(`/blog/${blog.id}`);
     */

    router.push(`/blog/${blog.id}`);
  };

  return (
    <>
      <main className="min-h-screen w-full bg-[#f6f9fb]">
        {/* ==================================================================== */}
        {/* HERO                                                                 */}
        {/* ==================================================================== */}

        <section className="relative overflow-hidden bg-[#092f49]">
          {/* BACKGROUND IMAGE */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80"
              alt="Travel"
              className="h-full w-full object-cover opacity-25"
            />
          </div>

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-[#06283d]/75" />

          {/* HERO CONTENT */}
          <div className="relative mx-auto flex min-h-[390px] w-full max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
            <span className="rounded-full bg-white/10 px-4 py-2 text-[12px] font-semibold tracking-wider text-white uppercase backdrop-blur-sm">
              PAN JOURNEY TRAVEL BLOG
            </span>

            <h1 className="mt-5 max-w-4xl text-[34px] leading-[1.12] font-bold tracking-tight text-white sm:text-[44px] lg:text-[52px]">
              Explore. Discover.
              <span className="most-text-color block">Travel More.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-[14px] leading-6 text-white/80 sm:text-[16px]">
              Discover travel inspiration, destination guides, hotel tips and
              useful ideas to make your next journey unforgettable.
            </p>

            {/* SEARCH */}
            <div className="mt-7 flex w-full max-w-[650px] flex-col gap-2 rounded-[14px] bg-white p-2 shadow-[0_12px_35px_rgba(0,0,0,0.18)] sm:flex-row">
              <Input
                allowClear
                size="large"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="Search travel articles..."
                className="!h-[46px] !border-none !shadow-none sm:flex-1"
              />

              <Button
                type="primary"
                size="large"
                icon={<SearchOutlined />}
                onClick={() => {
                  document.getElementById("latest-articles")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="buttion-background-color !h-[46px] !rounded-[10px] !border-none !px-6 !font-semibold !text-white"
              >
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* MAIN                                                                  */}
        {/* ==================================================================== */}

        <div className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-5 md:py-10 lg:px-6 xl:px-0">
          <section className="mt-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="most-text-color text-[12px] font-bold tracking-wider uppercase">
                  Explore
                </p>

                <h2 className="mt-1 text-[25px] font-bold text-[#172033]">
                  Browse by Category
                </h2>
              </div>

              <Select
                value={activeCategory}
                onChange={setActiveCategory}
                className="w-full sm:w-[190px]"
                size="large"
                options={CATEGORIES.map((category) => ({
                  value: category,
                  label: category,
                }))}
              />
            </div>

            {/* DESKTOP CATEGORY BUTTONS */}
            <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
              {CATEGORIES.map((category) => {
                const active = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-5 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                      active
                        ? "buttion-background-color border-transparent !text-white shadow-sm"
                        : "hover:most-text-color border-gray-200 bg-white text-[#555] hover:border-[#008cff]"
                    } `}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ================================================================== */}
          {/* LATEST ARTICLES                                                    */}
          {/* ================================================================== */}

          <section id="latest-articles" className="mt-10 scroll-mt-24">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="most-text-color text-[12px] font-bold tracking-wider uppercase">
                  Latest
                </p>

                <h2 className="mt-1 text-[25px] font-bold text-[#172033] sm:text-[30px]">
                  Latest Articles
                </h2>
              </div>

              <span className="hidden text-sm text-gray-400 sm:block">
                {filteredBlogs.length} articles
              </span>
            </div>

            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    onClick={handleBlogClick}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[18px] bg-white px-5 py-16 text-center shadow-sm">
                <div className="most-text-color mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef6fb] text-xl">
                  <SearchOutlined />
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#172033]">
                  No articles found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Try another search or choose a different category.
                </p>

                <Button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="mt-4 !rounded-lg"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </section>

          {/* ================================================================== */}
          {/* POPULAR DESTINATIONS                                               */}
          {/* ================================================================== */}

          <section className="mt-12">
            <div className="mb-5">
              <p className="most-text-color text-[12px] font-bold tracking-wider uppercase">
                Inspiration
              </p>

              <h2 className="mt-1 text-[25px] font-bold text-[#172033] sm:text-[30px]">
                Popular Destinations
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[
                {
                  name: "Goa",
                  image:
                    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Manali",
                  image:
                    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Jaipur",
                  image:
                    "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Kerala",
                  image:
                    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Kashmir",
                  image:
                    "https://images.unsplash.com/photo-1595815771614-ade9d0c6b8a4?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Udaipur",
                  image:
                    "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=600&q=80",
                },
              ].map((destination) => (
                <button
                  key={destination.name}
                  type="button"
                  className="group relative h-[145px] overflow-hidden rounded-[15px] border-0 bg-gray-200 text-left"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                  <span className="absolute bottom-3 left-3 text-[15px] font-bold text-white">
                    {destination.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* ================================================================== */}
          {/* NEWSLETTER                                                         */}
          {/* ================================================================== */}
        </div>
      </main>
      <NewsletterSection />
    </>
  );
};

export default BlogPage;
