export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Dashboard</h1>
      <p className="text-xl mb-4">Welcome to your HailORide dashboard!</p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Recent Rides</h2>
        <ul className="list-disc list-inside">
          <li>Ride to Downtown - 2023-08-07</li>
          <li>Airport Transfer - 2023-08-05</li>
          <li>City Tour - 2023-08-03</li>
        </ul>
      </div>
    </div>
  );
}
