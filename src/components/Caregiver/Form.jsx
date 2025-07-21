"use client";

import { useState } from "react";
import Image from "next/image";
import Doctorimg from "@/assets/caregiver/imgs/doctor.png";
import Starshape from "@/assets/caregiver/imgs/bigStarShape.png";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="w-full flex justify-center items-center bg-[#1E275E] text-[#ffffff] mt-14 py-10 px-4 md:px-6 tab:px-4 sm:px-3">
      <div className="w-full max-w-[1920px] flex justify-between px-28 relative md:px-16 tab:px-10 sm:flex-col sm:px-6">
        <div className="max-w-[800px] w-full flex flex-col justify-start">
          <h1 className="text-[40px] font-bold mb-4 leading-[120%] xxl:text-center md:text-[32px] sm:text-[28px]">
            Become a Certified Seenyor Ambassador
          </h1>
          <p className="text-[20px] mb-8 md:text-[18px] sm:text-[16px]">
            Take the Leap and Initiate Your Adventure with Us Today – Begin the
            Journey Toward Achieving Your Dreams and Ambitions!
          </p>
          <div>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-4 sm:grid-cols-1"
            >
              <div>
                <label className="text-xl">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border bg-[#F0F2FF]/20 border-[#ffffff]/50 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="text-xl">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border bg-[#F0F2FF]/20 border-[#ffffff]/50 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="text-xl">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border bg-[#F0F2FF]/20 border-[#ffffff]/50 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="text-xl">Phone Number</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border bg-[#F0F2FF]/20 border-[#ffffff]/50 rounded-lg"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xl">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border bg-[#F0F2FF]/20 border-[#ffffff]/50 rounded-lg"
                  required
                />
              </div>
              <div className="col-span-2 flex justify-center sm:col-span-1">
                <button
                  type="submit"
                  className="w-[218px] h-[65px] bg-[#ffffff] text-[24px] text-[#1E275E] py-3 rounded-lg hover:bg-blue-600 transition md:w-[180px] md:h-[55px] sm:w-full"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="h-[653px] w-full absolute top-[-65px] right-0 overflow-hidden md:h-[500px] sm:h-[400px] xss:hidden">
          <Image
            src={Starshape}
            width={900}
            height={850}
            alt="background shape"
            className="absolute top-[-265px] right-0 xxl:hidden"
          />
        </div>
        <Image
          src={Doctorimg}
          width={900}
          height={850}
          alt="doctor"
          className="absolute top-[-173px] right-0 xxl:hidden z-10 "
        />
      </div>
    </div>
  );
};

export default Form;
