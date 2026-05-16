import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import QueryProvider from "@/providers/QueryProvider";
import LoaderProvider from "@/providers/LoaderProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "antd/dist/reset.css";
import { Geist, Geist_Mono, Jost, Roboto } from "next/font/google";
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
      </head>
      <body className="flex min-h-full flex-col">
         <LoaderProvider/>
        <AntdRegistry>
          <QueryProvider>
            <Providers>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </Providers>
          </QueryProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
