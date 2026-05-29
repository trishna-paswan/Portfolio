import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Trishna Paswan | AI Engineer & Full Stack Developer",
  description: "Futuristic interactive developer portfolio of Trishna Paswan, AI Engineer crafting intelligent systems, immersive interfaces, and scalable applications.",
  openGraph: {
    title: "Trishna Paswan | AI Engineer & Full Stack Developer",
    description: "Futuristic interactive developer portfolio of Trishna Paswan.",
    url: "https://trishnapaswan.dev",
    siteName: "Trishna Paswan Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trishna Paswan | AI Engineer & Full Stack Developer",
    description: "Futuristic interactive developer portfolio of Trishna Paswan.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth bg-black text-gray-100">
      <body className="font-sans antialiased overflow-x-hidden min-h-screen bg-black flex flex-col selection:bg-neon-cyan/20 selection:text-neon-cyan">
        {/* Laser glow lines decor */}
        <div className="fixed top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-neon-cyan/10 via-transparent to-transparent pointer-events-none z-0" />
        <div className="fixed top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-neon-purple/10 via-transparent to-transparent pointer-events-none z-0" />
        
        <CustomCursor />
        <Navbar />
        
        <main className="relative z-10 flex-grow pt-24">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
