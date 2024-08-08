export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-24">
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
    </div>
  );
}
