import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

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
  title: "Review & Rate",
  description: "Company Review Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        {/* TOASTER */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,

            style: {
              borderRadius: "10px",
              background: "#fff",
              color: "#111",
              fontSize: "14px",
            },

            success: {
              style: {
                border: "1px solid #7B2EFF",
              },
            },

            error: {
              style: {
                border: "1px solid #ff4d4f",
              },
            },
          }}
        />

        {children}

      </body>
    </html>
  );
}
