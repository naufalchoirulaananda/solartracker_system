import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interInter_Tight = Inter_Tight({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solar Tracker System",
  description: "Internet of Things",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="https://res.cloudinary.com/dgnmqbglc/image/upload/v1711402930/IoT%20Monitoring/favicon-min_epxmye.png"
          type="image/x-icon"
        />
      </head>
      <body className={interInter_Tight.className}>{children}</body>
    </html>
  );
}
