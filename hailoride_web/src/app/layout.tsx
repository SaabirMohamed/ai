import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from 'next/link';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HailORide",
  description: "The Future of Ride-Hailing Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-700 text-white">
          <header className="w-full p-4 bg-gray-800">
            <nav className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">HailORide</Link>
              <div className="space-x-4">
                <Link href="/login" className="hover:text-blue-300">Login</Link>
                <Link href="/signup" className="hover:text-blue-300">Signup</Link>
                <Link href="/" className="hover:text-blue-300">Home</Link>
                <Link href="/contacts" className="hover:text-blue-300">Contacts</Link>
                <Link href="/about" className="hover:text-blue-300">About</Link>
                <Link href="/app" className="hover:text-blue-300">App</Link>
              </div>
            </nav>
          </header>
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
