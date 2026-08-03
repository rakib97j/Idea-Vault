import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/Navbar/NavBar";
import Footer from "@/components/Footer";

const geistSans = {
  variable: "--font-geist-sans",
};

const geistMono = {
  variable: "--font-geist-mono",
};

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
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
