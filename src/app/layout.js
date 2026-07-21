import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/Navbar/NavBar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Idea-Vault || BD",
  description: "Share and explore innovative ideas",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full  flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Providers>
          <NavBar />
          <main className="flex-1 ">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
