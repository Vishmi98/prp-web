import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";

import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Aura PRP Clinic | Hair & Skin Rejuvenation",
  description: "Premium Platelet-Rich Plasma (PRP) treatments for natural hair restoration and skin rejuvenation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${poppins.variable}`}>
      <body
        className={`antialiased bg-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
