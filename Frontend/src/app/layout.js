import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import BottomNav from "@/components/common/loder/MobileBottomNav ";
import GlobalLoginModal from "@/modules/auth/components/GlobalLoginModal";
import ProfileCompletionHandler from "@/modules/auth/components/ProfileCompletionHandler";
import ScrollToTopButton from "@/modules/hotel/ScrollToTopButton";
import LoaderProvider from "@/providers/LoaderProvider";
import QueryProvider from "@/providers/QueryProvider";
import "@/styles/cms-content.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App } from "antd";
import "antd/dist/reset.css";
import { Jost, Roboto } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import Providers from "./providers";

/* Fonts */

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

/*
ROOT METADATA
*/
export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),

  title: {
    default: "PAN Journey",
    template: "%s",
  },

  description: "Booking platform",

  // robots: {
  //   index: true,
  //   follow: true,
  // },

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

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${roboto.variable} ${jost.variable} h-full antialiased`}
    >
      <head>
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Preload */}
        <link rel="preload" as="image" href="/images/homepage/home.svg" />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DYY7076V0W"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DYY7076V0W');
          `}
        </Script>
      </head>

      <body className="flex min-h-full flex-col">
        <LoaderProvider>
          <AntdRegistry>
            <QueryProvider>
              <Providers>
                <Header />
                <ScrollToTopButton />
                <ProfileCompletionHandler />
                <main className="flex-1">
                  <App>
                    <GlobalLoginModal />
                    {children}
                  </App>
                </main>
                <Suspense fallback={null}>
                  <BottomNav />
                </Suspense>
                <Footer />
              </Providers>
            </QueryProvider>
          </AntdRegistry>
        </LoaderProvider>
      </body>
    </html>
  );
}
