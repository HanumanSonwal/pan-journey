import ComingSoonModal from "@/components/common/ComingSoonModal";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import GlobalLoginModal from "@/modules/auth/components/GlobalLoginModal";
import ProfileCompletionHandler from "@/modules/auth/components/ProfileCompletionHandler";
import LoaderProvider from "@/providers/LoaderProvider";
import QueryProvider from "@/providers/QueryProvider";
import "@/styles/cms-content.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App } from "antd";
import "antd/dist/reset.css";
import { Geist, Geist_Mono, Jost, Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";

/* Fonts */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),

  title: {
    default: "PAN Journey",
    template: "%s",
  },

  description: "Booking platform",

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${jost.variable} h-full antialiased`}
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
                <ProfileCompletionHandler />
                <main className="flex-1">
                  <App>
                    <ComingSoonModal />
                    <GlobalLoginModal />
                    {children}
                  </App>
                </main>

                <Footer />
              </Providers>
            </QueryProvider>
          </AntdRegistry>
        </LoaderProvider>
      </body>
    </html>
  );
}
