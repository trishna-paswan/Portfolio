import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trishna Paswan | AI Engineer & Full Stack Developer",
  description: "Futuristic interactive developer portfolio of Trishna Paswan, AI Engineer crafting intelligent systems, immersive interfaces, and scalable applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth bg-black text-gray-100">
      <body className="font-sans antialiased overflow-x-hidden min-h-screen bg-black flex flex-col">
        {children}
      </body>
    </html>
  );
}
