export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold mb-4">HailORide</h1>
      <p className="text-xl text-center max-w-2xl mb-8">
        Empowering app developers and companies with access to vetted drivers for seamless ride-hailing and delivery services integration.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">For Developers</h2>
          <p>Integrate our API to add ride-hailing features to your applications.</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">For Companies</h2>
          <p>Access our network of vetted drivers to enhance your service offerings.</p>
        </div>
      </div>
    </main>
  );
}
