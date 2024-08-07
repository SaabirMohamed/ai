import Link from 'next/link'
export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold mb-2 text-blue-600">HailORide</h1>
      <p className="text-xl mb-8 text-gray-600 italic">"Life's a Journey, Negotiate the Ride"</p>
      <p className="text-lg mb-6 text-center max-w-md">
        No commission fees, keep all your ride fares, low monthly subscriptions
      </p>
      <input
        type="text"
        placeholder="Type your query here...who is HailORide?"
        className="px-4 py-2 w-64 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <Link href="/dashboard" className="text-blue-600 hover:underline mt-4">
        Go to Dashboard
      </Link>
    </div>
  );
}
