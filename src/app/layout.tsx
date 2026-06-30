import type { Metadata } from "next";
import { Italiana, Montserrat } from "next/font/google"; // Import fonts
import "./globals.css";

// Configure Italiana (Display Font)
const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

// Configure Montserrat (Body Font)
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Brown Beans Cafe | Premium Experience",
  description: "More than just a Cafe. Located at IGBT Bypass, Thurakkal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${italiana.variable} ${montserrat.variable} antialiased bg-bg text-text font-body overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
