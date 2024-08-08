"use client";

import React from 'react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About HailORide</h1>
      <p className="text-xl mb-4">
        HailORide is the future of ride-hailing services, designed to provide a seamless and efficient transportation experience for our users.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
      <p className="mb-4">
        Our mission is to revolutionize urban transportation by offering a reliable, safe, and eco-friendly ride-hailing service that connects passengers with drivers quickly and efficiently.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Fast and reliable ride-hailing</li>
        <li>Competitive pricing</li>
        <li>Eco-friendly vehicle options</li>
        <li>Advanced safety measures</li>
        <li>24/7 customer support</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Join Us</h2>
      <p className="mb-4">
        Whether you're a passenger looking for convenient transportation or a driver seeking flexible earning opportunities, HailORide is here for you. Join us in shaping the future of urban mobility!
      </p>
    </div>
  );
}
