"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const handleCreateAccount = () => {
    router.push('./registration');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-auto">
      {/* Left Image Section */}
      <div className="hidden md:flex md:w-1/2 relative">
        <Image
          src="/assets/images/1.jpg"
          alt="image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl">
          <h2 className="text-blue-700 text-center font-bold text-xl">Log in</h2>

          <input
            className="focus:outline-none focus:ring-2 focus:ring-blue-300 mt-6 w-full p-4 border border-gray-300 rounded-md"
            type="text"
            name="Username"
            placeholder="Username"
            required
          />

          <input
            className="focus:outline-none focus:ring-2 focus:ring-blue-300 mt-4 w-full p-4 border border-gray-300 rounded-md"
            type="password"
            name="Password"
            placeholder="Password"
            required
          />

          <button
            className="text-white w-full py-3 bg-blue-700 shadow-lg rounded-md mt-6 cursor-pointer hover:bg-blue-500 font-semibold"
          >
            Log in
          </button>

          <div className="text-center mt-4">
            <Link href="" className="text-blue-600 font-semibold hover:underline">Forgot Password?</Link>
          </div>

          <div className="my-6 border-t border-gray-300"></div>

          <div className="w-full flex items-center justify-center">
            <button
              className="text-white w-full py-3 bg-blue-700 shadow-lg rounded-md mt-4 cursor-pointer hover:bg-blue-500 font-semibold"
              onClick={handleCreateAccount}
              type="button"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
