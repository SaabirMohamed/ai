import React from 'react';

export default function Contacts() {
  return (
    <div className="relative min-h-screen">
      {/* Google Maps background */}
      <div className="absolute inset-0 z-0">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY_HERE&center=-30.5595,22.9375&zoom=6"
        ></iframe>
      </div>

      {/* Enquiries form */}
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Name</label>
              <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-md" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email</label>
              <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-md" required />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-medium">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border rounded-md" required></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
