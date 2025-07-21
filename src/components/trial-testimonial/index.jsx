"use client";

import { useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const testimonials = [
  {
    text: "My mum feels safer, and I feel calmer. Since we started using Seenyor’s AI monitoring, I no longer worry about the ‘what ifs’ when I’m not around. The fall detection, sleep insights, and real-time updates give me peace of mind I didn’t know I was missing. It’s like having a silent guardian watching over her—without being intrusive. She’s more independent, and I’m more present in my own life, knowing she’s supported every step of the way..",
    name: "Sarah T.",
    role: "Bank Manager",
    img: "/images/p2.jpg",
  },
  {
    text: "We bought it after the trial. Worth every cent. Seenyor gave us a glimpse of what real peace of mind feels like—and that was enough to convince us. The transition from worry to confidence was immediate. We no longer check in out of fear but out of love. It’s not just smart technology—it’s support you can feel",
    name: "Liam M.",
    role: "Developer",
    img: "/images/p1.jpg",
  },
  {
    text: "We didn’t realize how much stress we were carrying until we tried Seenyor. It felt like someone finally understood what our family needed. After just a few days, it became clear: this wasn’t a luxury, it was a necessity. The insights, the alerts, the ease of use—it all just works. We couldn’t go back now, and we wouldn’t want to.",
    name: "Sara Lee",
    role: "Cabin crew",
    img: "/images/p3.jpg",
  },
];

export default function TrialTestimonial() {
  const [slideIndex, setSlideIndex] = useState(0);

  const plusSlides = (n) => {
    setSlideIndex((prev) => (prev + n + testimonials.length) % testimonials.length);
  };

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          What clients are saying
        </h1>

        <div className="flex  justify-center mx-auto  mt-6">
          <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
        </div>

        <div className="slideshow-container flex items-start max-w-6xl mx-auto mt-16">
          <button
            title="left arrow"
            onClick={() => plusSlides(-1)}
            className="p-2 text-gray-800 transition-colors duration-300 border rounded-full dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
          >
            <MdKeyboardArrowLeft />
          </button>

          <div className="flex-1 flex flex-col items-center justify-between md:h-auto  h-[40dvh]">
            <p className="text-center text-gray-500 lg:mx-8">{testimonials[slideIndex].text}</p>

            <div className=" flex flex-col items-center justify-center mt-8">
              <img
                className="object-cover rounded-full w-14 h-14"
                src={testimonials[slideIndex].img}
                alt={testimonials[slideIndex].name}
              />
              <div className="mt-4 text-center">
                <h1 className="font-semibold text-gray-800 dark:text-white">
                  {testimonials[slideIndex].name}
                </h1>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonials[slideIndex].role}
                </span>
              </div>
            </div>
          </div>

          <button
            title="right arrow"
            onClick={() => plusSlides(1)}
            className="p-2 text-gray-800 transition-colors duration-300 border rounded-full dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
          >
            <MdKeyboardArrowRight />
          </button>
        </div>

        <div className="flex justify-center mt-4">
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              className={`mx-1 w-3 h-3 rounded-full border border-blue-500 cursor-pointer ${
                slideIndex === idx ? "bg-blue-500" : "bg-white"
              }`}
              onClick={() => currentSlide(idx)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}