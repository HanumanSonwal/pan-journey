import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import BottomNav from "@/components/common/loder/MobileBottomNav ";
import GlobalLoginModal from "@/modules/auth/components/GlobalLoginModal";
import ProfileCompletionHandler from "@/modules/auth/components/ProfileCompletionHandler";
import ScrollToTopButton from "@/modules/hotel/ScrollToTopButton";

import { getThemeServer } from "@/modules/theme/api/theme.service";
import { getThemeCSSVariables } from "@/modules/theme/theme.variables";

import "@/styles/cms-content.css";

import { App as AntdApp } from "antd";
import "antd/dist/reset.css";

import { Jost, Roboto } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";

import "./globals.css";
import AppProviders from "./providers";

/* -------------------------------------------------------------------------- */
/* Fonts                                                                      */
/* -------------------------------------------------------------------------- */

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

/* -------------------------------------------------------------------------- */
/* IMPORTANT: Always fetch latest theme on server                             */
/* -------------------------------------------------------------------------- */

export const dynamic = "force-dynamic";

/* -------------------------------------------------------------------------- */
/* Metadata                                                                   */
/* -------------------------------------------------------------------------- */

export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),

  title: {
    default: "PAN Journey",
    template: "%s",
  },

  description: "Booking platform",

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

    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Root Layout                                                                */
/* -------------------------------------------------------------------------- */

export default async function RootLayout({ children }) {
  /*
   * Fetch theme on the server BEFORE rendering the page.
   */
  const theme = await getThemeServer();

  /*
   * Convert API theme object into CSS variables.
   */
  const themeVariables = getThemeCSSVariables(theme);

  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${roboto.variable} ${jost.variable} h-full antialiased`}
      style={themeVariables}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preload" as="image" href="/images/homepage/home.svg" />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DYY7076V0W"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        dataLayer.push(arguments);
      }

      gtag('js', new Date());
      gtag('config', 'G-DYY7076V0W');
    `}
        </Script>
      </head>

      <body className="flex min-h-full flex-col">
        <AppProviders>
          <Header />

          <ScrollToTopButton />

          <ProfileCompletionHandler />

          <main className="flex-1">
            <AntdApp>
              <GlobalLoginModal />
              {children}
            </AntdApp>
          </main>

          <Suspense fallback={null}>
            <BottomNav />
          </Suspense>

          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
