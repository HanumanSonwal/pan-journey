import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import ProfileCompletionHandler from "@/modules/auth/components/ProfileCompletionHandler";
import LoaderProvider from "@/providers/LoaderProvider";
import QueryProvider from "@/providers/QueryProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
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
  weight: ["400", "500", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Pan Journey",
  description: "Booking platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={` ${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${jost.variable} h-full antialiased`}
    >
      <head>
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

                <main className="flex-1">{children}</main>

                <Footer />
              </Providers>
            </QueryProvider>
          </AntdRegistry>
        </LoaderProvider>
      </body>
    </html>
  );
}
