import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DisplayRecipeProvider } from "@/services/providers/DisplayRecipeProvider";
import { FavoriteProvider } from "@/services/providers/FavoriteProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Recipes",
  icons: {
    icon: "/foodicon.ico",
  },
  description: "Delicious food recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DisplayRecipeProvider>
        <FavoriteProvider >
          {children}
        </FavoriteProvider>
        </DisplayRecipeProvider>
      </body>
    </html>
  );
}
