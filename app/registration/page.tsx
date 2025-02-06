"use client";

import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const handleLogIn = () => {
    router.push("/");
  };


  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setshowRePassword] = useState(false);
  const MontList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DayList = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);
  const GenderList = ['Male', 'Female'];
   
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the form from submitting the default way
  
    const form = e.target as HTMLFormElement; // Cast to HTMLFormElement
    const formData = {
        
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value || "",
      middlename: (form.elements.namedItem("middlename") as HTMLInputElement)?.value || "",
      lastname: (form.elements.namedItem("lastname") as HTMLInputElement)?.value || "",
      month: (form.elements.namedItem("month")as HTMLSelectElement)?.value || "",
      day: (form.elements.namedItem("day")as HTMLSelectElement)?.value || "",
      year: (form.elements.namedItem("year")as HTMLSelectElement)?.value || "",
      gender: (form.elements.namedItem("gender")as HTMLSelectElement)?.value || "",
      address: (form.elements.namedItem("address")as HTMLInputElement)?.value || "",
      contact: (form.elements.namedItem("contact")as HTMLInputElement)?.value || "",
      email: (form.elements.namedItem("email")as HTMLInputElement)?.value || "",
      password: (form.elements.namedItem("password")as HTMLInputElement)?.value || "",

      };
      console.log("form data", formData);
    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("User registered successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Signup error:", error);
      alert("Error registering user");
    }
  };
  


  return (
    <div className="flex flex-col md:flex-row h-screen overflow-auto">
      <div className="hidden md:flex md:w-1/2 relative">
        <Image src="/assets/images/1.jpg" alt="images" layout="fill" objectFit="cover" />
      </div>
      
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form onSubmit={handleSignup} className="w-full max-w-lg p-6 bg-white shadow-2xl rounded-xl">
          <h3 className="text-center font-semibold text-xl">Sign Up</h3>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <input type="text" name="name" placeholder="Name" className="border-2 border-gray-300 p-4 w-full" required />
            <input type="text" name="middlename" placeholder="Middle Name" className="border-2 border-gray-300 p-4 w-full" required />
            <input type="text" name="lastname" placeholder="Lastname" className="border-2 border-gray-300 p-4 w-full" required />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <select name="month" className="border-2 border-gray-300 p-4 w-full">
              <option value="">Month</option>
              {MontList.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
            <select name="day" className="border-2 border-gray-300 p-4 w-full">
              <option value="">Day</option>
              {DayList.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
            <select name="year" className="border-2 border-gray-300 p-4 w-full">
              <option value="">Year</option>
              {years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <select name="gender" className="border-2 border-gray-300 p-4 w-full mt-4">
            <option value="">Gender</option>
            {GenderList.map((gender, index) => (
              <option key={index} value={gender}>{gender}</option>
            ))}
          </select>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <input type="text" name="address" placeholder="Address" className="border-2 border-gray-300 p-4 w-full" required />
            <input type="text" name="contact" placeholder="Contact Number" className="border-2 border-gray-300 p-4 w-full" required />
            <input type="text" name="email" placeholder="Email" className="border-2 border-gray-300 p-4 w-full" required />
          </div>
          
          <div className="relative mt-4">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="border-2 border-gray-300 p-4 w-full" required />
            <span className="absolute right-4 top-4 text-gray-500 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          
          <div className="relative mt-4">
            <input type={showRePassword ? "text" : "password"} name="Password" placeholder="Retype Password" className="border-2 border-gray-300 p-4 w-full pr-10" required />
            <span className="absolute right-4 top-4 text-gray-500 cursor-pointer" onClick={() => setshowRePassword(!showRePassword)}>
              {showRePassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <button className="text-white w-full py-3 bg-blue-700 shadow-lg rounded-md mt-6 cursor-pointer hover:bg-blue-500 font-semibold">
            Sign Up
          </button>
          
          <div className="text-center mt-4">
            <a onClick={handleLogIn} className="text-blue-500 cursor-pointer">Already have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
