"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const features = [
  {
    id: "fall-detection",
    title: "Fall Detection",
    image: "device1.png",
    subtitle:
      "Instant alerts for falls, ensuring timely assistance when it matters most.",
    content: [
      "• Immediate Alerts",
      "• 24/7 Monitoring of Each Move",
      "• Advanced AI algorithms for accurate detection",
      "• Two-Way Communication",
      "• Data Insights",
      "• Exact Fall Location",
    ],
  },
  {
    id: "sleep-analysis",
    title: "Sleep Analysis",
    subtitle:
      "Gain insights into sleep patterns and quality for healthier, restorative rest.",
    image: "device2.png",
    content: [
      "• Sleep Summary & Patterns",
      "• Sleep Events, Duration & Efficiency",
      "• Sleep Statistic",
      "• Sleep Apnea Detection",
      "• Bed Exits Distribution",
      "• Sleep Routine Distribution",
    ],
  },
  {
    id: "wellness-events",
    title: "Wellness Events",
    subtitle:
      "Real-time monitoring of vital signs and alerts for critical health changes.",
    image: "device3.png",
    content: [
      "• Real-Time Heart Rate Monitoring",
      "• Real-Time Respiratory Rate Monitoring",
      "• Sleep Apnea Detection",
      "• Health Insights",
      "• Apnea-Hypopnea Index (AHI)",
      "• Low & High Heart and Respiratory rate detection",
    ],
  },
  {
    id: "activities",
    title: "Activities",
    subtitle:
      "Track daily movements and routines to promote healthy, active living.",
    image: "device4.png",
    content: [
      "• Daytime Activity Data",
      "• Sedentary Time",
      "• Walking Steps and Speed",
      "• Number of Rooms visited",
      "• Body Movement Index",
      "• Daily Activities Distribution",
    ],
  },
];
const featuresMobile = [
  {
    id: "fall-detection",
    title: "Fall Detection",
    image: "1.png",
    subtitle:
      "Instant alerts for falls, ensuring timely assistance when it matters most.",
    content: [
      "• Immediate Alerts",
      "• 24/7 Monitoring of Each Move",
      "• Advanced AI algorithms for accurate detection",
      "• Two-Way Communication",
      "• Data Insights",
      "• Exact Fall Location",
    ],
  },
  {
    id: "sleep-analysis",
    title: "Sleep Analysis",
    subtitle:
      "Gain insights into sleep patterns and quality for healthier, restorative rest.",
    image: "2.png",
    content: [
      "• Sleep Summary & Patterns",
      "• Sleep Events, Duration & Efficiency",
      "• Sleep Statistic",
      "• Sleep Apnea Detection",
      "• Bed Exits Distribution",
      "• Sleep Routine Distribution",
    ],
  },
  {
    id: "wellness-events",
    title: "Wellness Events",
    subtitle:
      "Real-time monitoring of vital signs and alerts for critical health changes.",
    image: "33.png",
    content: [
      "• Real-Time Heart Rate Monitoring",
      "• Real-Time Respiratory Rate Monitoring",
      "• Sleep Apnea Detection",
      "• Health Insights",
      "• Apnea-Hypopnea Index (AHI)",
      "• Low & High Heart and Respiratory rate detection",
    ],
  },
  {
    id: "activities",
    title: "Activities",
    subtitle:
      "Track daily movements and routines to promote healthy, active living.",
    image: "4.png",
    content: [
      "• Daytime Activity Data",
      "• Sedentary Time",
      "• Walking Steps and Speed",
      "• Number of Rooms visited",
      "• Body Movement Index",
      "• Daily Activities Distribution",
    ],
  },
];

export default function MonitoringCarousel() {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  const [activeFeatureM, setActiveFeatureM] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeatureM((prev) => (prev + 1) % featuresMobile.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="tab:hidden w-full h-screen md:h-auto max-h-[825px] md:max-h-[1400px] max-w-[1720px] mx-auto py-4">
        <div className="flex !h-full md:flex-col bg-[#6366f1] rounded-xl overflow-hidden">
          {/* Left side - Feature content */}
          <div className="w-[55%] md:h-[650px] tab:h-[650px] relative md:w-full p-8 px-16 md:px-8 tab:px-3 pb-0 text-white">
            {/* Top navigation tabs */}
            <div className="flex justify-start sm:grid sm:grid-cols-2 sm:gap-3 mb-12 xxl:mb-5 tab:mb-5 my-7 ">
              {features.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  onClick={() => setActiveFeature(index)}
                  className={`text-white px-4 xxl:px-2 tab:px-0 py-2 tab:py-0 text-[22px]  xxl:text-[16px] tab:text-[14px] font-medium ${
                    activeFeature === index
                      ? "border-b-2 border-[#FFCB33]"
                      : "hover:text-gray-100"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {feature.title}
                </motion.button>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="tab:px-5"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-[40px] xxl:text-2xl tab:text-xl font-bold mb-4 sm:mb-2">
                    {features[activeFeature].title}
                  </h2>
                  <h2 className="text-3xl xxl:text-2xl tab:text-base mb-10 xxl:mb-6 md:mb-6">
                    {features[activeFeature].subtitle}
                  </h2>
                  {features[activeFeature].content.map((item, index) => (
                    <p
                      key={index}
                      className="mb-5  xxl:mb-3 tab:mb-2 text-xl xxl:text-[16px]"
                    >
                      {item}
                    </p>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            {/* Bottom navigation bars */}
            <div className="flex absolute bottom-6 tab:bottom-3 left-12 tab:left-10 justify-start mt-16 md:mt-10 mb-5 space-x-2">
              {features.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  onClick={() => setActiveFeature(index)}
                  className={`h-2 rounded-full transition-all ${
                    activeFeature === index
                      ? "bg-white w-12"
                      : "bg-gray-400 w-6"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">{feature.title}</span>
                </motion.button>
              ))}
            </div>
          </div>
          {/* Right side - Mobile app mockup */}
          <motion.div
            className="w-[45%] md:w-full md:h-[45%] bg-white  flex items-end justify-center  mx-auto h-full overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src={`/images/${features[activeFeature].image}`}
              height={500}
              className="h-[90%] w-auto"
              width={300}
              alt=""
            />
          </motion.div>
        </div>
      </div>

      {/* for mobile */}

      <div className="w-full hidden tab:block h-auto max-h-[1200px] mx-auto py-4">
        <div className="flex max-h-[1200px] flex-col  bg-[#34CECE] rounded-xl overflow-hidden">
          <div className="flex justify-start gap-3 mb-5 my-6 mx-3 overflow-scroll scrollbar-none ">
            {featuresMobile.map((feature, index) => (
              <motion.button
                key={feature.id}
                onClick={() => setActiveFeature(index)}
                className={`text-white block px-0 py-2 text-[12px] font-medium text-nowrap ${
                  activeFeature === index
                    ? "border-b-2 border-[#FFCB33]"
                    : "hover:text-gray-100"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {feature.title}
              </motion.button>
            ))}
          </div>
          <motion.div
            className="w-full h-[45%]  flex items-end justify-start ps-5 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src={`/images/mobile/${featuresMobile[activeFeatureM].image}`}
              height={500}
              className="h-auto w-[50%]"
              width={300}
              alt=""
            />
          </motion.div>
          <div className="h-[450px] relative w-full p-8 px-3 pb-0 text-white">
            {/* Top navigation tabs */}

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="tab:px-5"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-4 sm:mb-2">
                    {featuresMobile[activeFeatureM].title}
                  </h2>
                  <h2 className="text-lg mb-10 xxl:mb-6 md:mb-6">
                    {featuresMobile[activeFeatureM].subtitle}
                  </h2>
                  {featuresMobile[activeFeatureM].content.map((item, index) => (
                    <p
                      key={index}
                      className="mb-5  xxl:mb-3 tab:mb-2 text-[12px]"
                    >
                      {item}
                    </p>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            {/* Bottom navigation bars */}
            <div className="flex absolute bottom-6 tab:bottom-3 left-12 tab:left-10 justify-start mt-16 md:mt-10 mb-5 space-x-2">
              {featuresMobile.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  onClick={() => setActiveFeatureM(index)}
                  className={`h-2 rounded-full transition-all ${
                    activeFeatureM === index
                      ? "bg-white w-12"
                      : "bg-gray-400 w-6"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">{feature.title}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
