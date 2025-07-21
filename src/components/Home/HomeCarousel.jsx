"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Heart,
  Bed,
  AlertTriangle,
  Brain,
  MapPin,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";

// Sample slide data
const slides = [
  {
    id: 1,
    title: "Peace of Mind",
    subtitle:
      "Gain reassurance with insights into your loved one's movement and rest patterns—helping you stay connected without intruding.",
    image: "/images/slider1/safety.webp",
    color: "7F87FC",
    icon: "/images/icon1.svg",
  },
  {
    id: 2,
    title: "Rest Easy, Night After Night",
    subtitle:
      "Understand sleep patterns and nightly routines with non-intrusive insights—helping to ensure restful nights.",
    image: "/images/slider1/sleeping.webp",
    color: "34CECE",
    icon: "/images/icon2.svg",
  },
  {
    id: 3,
    title: "Every Move, Safely Watched",
    subtitle:
      "Stay informed about daily movement and activity levels—offering a supportive way to encourage independence.",
    image: "/images/slider1/activity.webp",
    color: "9747FF",
    icon: "/images/icon3.svg",
  },
  {
    id: 4,
    title: "Safety, When It Matters Most",
    subtitle:
      "Stay informed about significant movements and unexpected events in the home—helping loved ones stay safe.",
    image: "/images/slider1/falls.webp",
    color: "FF6633",
    icon: "/images/icon4.svg",
  },
  {
    id: 5,
    title: "Smart Insights for Peace of Mind",
    subtitle:
      "Seenyor provides easy-to-understand wellness insights, helping you stay informed about your loved one's daily routines.",
    image: "/images/slider1/ai.webp",
    color: "B9B0CD",
    icon: "/images/icon5.svg",
  },
  {
    id: 6,
    title: "Know Where They Are, When It Matters",
    subtitle:
      "Seenyor provides location awareness, allowing you to check on your loved one's activity throughout the home.",
    image: "/images/slider1/location.webp",
    color: "FF006E",
    icon: "/images/icon6.svg",
  },
  {
    id: 7,
    title: "Stay Connected When They Need You",
    subtitle:
      "Stay connected anytime with real-time voice communication—ideal for check-ins and conversations",
    image: "/images/slider1/communication.webp",
    color: "4285F4",
    icon: "/images/icon7.svg",
  },
];
const mobileSlide = [
  {
    id: 1,
    title: "Peace of Mind",
    subtitle:
      "Gain reassurance with insights into your loved one's movement and rest patterns—helping you stay connected without intruding.",
    image: "/images/mobile/1.webp",
    color: "7F87FC",
    icon: "/images/icon1.svg",
  },
  {
    id: 2,
    title: "Rest Easy, Night After Night",
    subtitle:
      "Understand sleep patterns and nightly routines with non-intrusive insights—helping to ensure restful nights.",
    image: "/images/mobile/2.webp",
    color: "34CECE",
    icon: "/images/icon2.svg",
  },
  {
    id: 3,
    title: "Every Move, Safely Watched",
    subtitle:
      "Stay informed about daily movement and activity levels—offering a supportive way to encourage independence.",
    image: "/images/mobile/3.png",
    color: "9747FF",
    icon: "/images/icon3.svg",
  },
  {
    id: 4,
    title: "Safety, When It Matters Most",
    subtitle:
      "Stay informed about significant movements and unexpected events in the home—helping loved ones stay safe.",
    image: "/images/mobile/4.webp",
    color: "FF6633",
    icon: "/images/icon4.svg",
  },
  {
    id: 5,
    title: "Smart Insights for Peace of Mind",
    subtitle:
      "Seenyor provides easy-to-understand wellness insights, helping you stay informed about your loved one's daily routines.",
    image: "/images/mobile/5.webp",
    color: "B9B0CD",
    icon: "/images/icon5.svg",
  },
  {
    id: 6,
    title: "Know Where They Are, When It Matters",
    subtitle:
      "Seenyor provides location awareness, allowing you to check on your loved one's activity throughout the home.",
    image: "/images/mobile/6.webp",
    color: "FF006E",
    icon: "/images/icon6.svg",
  },
  {
    id: 7,
    title: "Stay Connected When They Need You",
    subtitle:
      "Stay connected anytime with real-time voice communication—ideal for check-ins and conversations",
    image: "/images/mobile/7.png",
    color: "4285F4",
    icon: "/images/icon7.svg",
  },
];

const menuItems = [
  { icon: Activity, label: "Peace of Mind" },
  { icon: Bed, label: "Sleep Insights" },
  { icon: Heart, label: "Activity Insights" },
  { icon: AlertTriangle, label: "Falls Detection" },
  { icon: Brain, label: "AI Analyst" },
  { icon: MapPin, label: "Location" },
  { icon: MessageSquare, label: "Communication" },
];

export default function HomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <>
      <div className="h-screen tab:hidden max-h-[800px] xxl:max-h-[600px] md:!max-h-[470px]">
        <div className="flex flex-row md:flex-col h-auto  max-w-[1720px] my-0 w-full mx-auto  bg-[#F3F4F6]">
          {/* Sidebar */}
          <div className="w-64 md:hidden  border-r border-gray-200 p-4">
            <div className="space-y-2 sm:space-y-1">
              {menuItems.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setCurrentSlide(index % slides.length);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    index % slides.length === currentSlide
                      ? "font-bold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 h-full relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 1, x: -0 }}
                transition={{ duration: 0.5 }} // Added delay of 2 seconds
              >
                <div className="relative h-full ">
                  {/* Header */}
                  <div
                    style={{
                      backgroundColor: `#${slides[currentSlide].color}`,
                    }}
                    className=" h-[180px] xxl:h-[130px] md:md:py-1 tab:py-1 tab:px-2 text-white  z-50 w-full px-12 flex flex-row items-center justify-between"
                  >
                    <div className="space-y-2 md:space-y-0">
                      <h1 className="text-3xl md:text-[16px] font-bold">
                        {slides[currentSlide].title}
                      </h1>
                      <p className="max-w-6xl md:max-w-xl text-xl md:text-sm tab:text-xs">
                        {slides[currentSlide].subtitle}
                      </p>
                    </div>
                    <div className="text-white my-auto">
                      <Image
                        src={slides[currentSlide].icon}
                        height={30}
                        width={30}
                        alt="icons"
                        className="h-12 w-12"
                      />
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex overflow-hidden h-full flex-row gap-8 max-h-[800px]">
                    <motion.img
                      src={slides[currentSlide].image}
                      alt="Monitoring visualization"
                      className="w-full h-full object-cover tab:object-contain"
                      initial={{ scale: 1.5 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* for mobile */}
      <div className="hidden tab:block">
        {mobileSlide?.map((slide, i) => (
          <div
            key={i}
            className="w-full h-[425px] my-5 rounded-xl overflow-hidden"
          >
            {/* Header */}
            <div
              style={{
                backgroundColor: `#${slide?.color}`,
              }}
              className="h-[127px] text-white w-full flex justify-center items-center text-center"
            >
              <div>
                <Image
                  src={slide?.icon}
                  height={30}
                  width={30}
                  alt="icons"
                  className="h-5 w-5 mx-auto"
                />
                <h1 className="text-xl font-bold py-1">{slide?.title}</h1>
                <p className="text-xs px-4">{slide?.subtitle}</p>
              </div>
            </div>

            {/* Main Content Area */}
            <Image
              src={slide?.image}
              alt={slide?.title}
              height={400}
              width={400}
              quality={100}
              className="w-full h-[298px] object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}
