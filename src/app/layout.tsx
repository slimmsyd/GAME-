import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "222 - Date Selector",
  description: "AI-Powered Date Night Generator",
  openGraph: {
    title: "222 - Date Selector",
    description: "AI-Powered Date Night Generator",
    images: [
      {
        url: "/DatePhotos/MAINPHOTO.jpg",
        width: 1200,
        height: 630,
        alt: "222 - Date Selector",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
