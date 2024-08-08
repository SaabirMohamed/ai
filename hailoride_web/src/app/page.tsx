import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
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
      <main className="flex-grow flex flex-col items-center justify-center p-24">
        <div className="text-center">
        <h1 className="text-8xl font-bold mb-6 animate-pulse">
          HailORide
        </h1>
        <p className="text-2xl mb-12">
          The Future of Ride-Hailing Services
        </p>
        <div className="flex justify-center space-x-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
            Get Started
          </button>
          <button className="bg-transparent hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-6 rounded-full border-2 border-white transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}
