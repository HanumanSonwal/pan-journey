export const metadata = {
  metadataBase: new URL(
    process.env.NEXTAUTH_URL || "http://localhost:3000"
  ),

  title: {
    default: "PAN Journey",
    template: "%s | PAN Journey",
  },

  description:
    "Book hotels, flights and buses easily with PAN Journey. Find the best travel deals and destinations.",

  openGraph: {
    title: "PAN Journey - Travel & Booking",
    description:
      "Book hotels, flights and travel packages with PAN Journey.",
    url: "/",
    siteName: "PAN Journey",

    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "PAN Journey - Travel & Booking",
      },
    ],

    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PAN Journey - Travel & Booking",
    description:
      "Book hotels, flights and travel packages with PAN Journey.",
    images: ["/images/og-image.png"],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/icon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  manifest: "/manifest.webmanifest",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};
