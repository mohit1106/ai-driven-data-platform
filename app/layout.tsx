import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bharat Insight — AI-Driven Government Data Analytics",
  description:
    "Explore and analyze Indian government datasets with AI-powered insights. Visualize data from data.gov.in across multiple departments with intelligent analytics.",
  keywords: [
    "India",
    "government data",
    "analytics",
    "data.gov.in",
    "AI insights",
    "open data",
  ],
  openGraph: {
    title: "Bharat Insight — AI-Driven Government Data Analytics",
    description:
      "Explore and analyze Indian government datasets with AI-powered insights.",
    type: "website",
    siteName: "Bharat Insight",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="noise">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
