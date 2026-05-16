import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Roni Sarkar — Software Engineer",
  description:
    "Software Engineer specializing in backend systems, blockchain/Web3, and AI-powered applications. Currently building at Nagorik Technologies Ltd.",
  keywords: [
    "Roni Sarkar",
    "Software Engineer",
    "Full Stack Developer",
    "NestJS",
    "Web3",
    "Blockchain",
    "React",
    "Next.js",
    "TypeScript",
    "Dhaka",
  ],
  authors: [{ name: "Roni Sarkar" }],
  openGraph: {
    title: "Roni Sarkar — Software Engineer",
    description:
      "Software Engineer specializing in backend systems, blockchain/Web3, and AI-powered applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
