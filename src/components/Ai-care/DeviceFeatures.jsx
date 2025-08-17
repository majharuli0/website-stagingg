import React from "react";
import { FaRunning, FaToilet, FaBed, FaUserClock } from "react-icons/fa";

export default function DeviceFeatures() {
  const features = [
    {
      icon: <FaRunning className="text-pink-600 text-2xl" />,
      title: "Fall Alarm",
      description: "An instant notification in case of a fall detection.",
    },
    {
      icon: <FaToilet className="text-pink-600 text-2xl" />,
      title: "Extended Stay in Bathroom",
      description: "If the user spends more time in the bathroom than usual.",
    },
    {
      icon: <FaUserClock className="text-pink-600 text-2xl" />,
      title: "Inactivity Notification",
      description:
        "If there’s no activity detected for longer than selected threshold.",
    },
    {
      icon: <FaBed className="text-pink-600 text-2xl" />,
      title: "No Return Notification",
      description:
        "If the user doesn’t return to bed within the selected time frame.",
    },
  ];

  return (
    <div className="flex flex-col items-center p-4 max-w-screen-lg mx-auto">
      <div className="md:grid hidden grid-cols-2 grid-rows-2  gap-4 mt-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex items-start gap-3 bg-white rounded-xl shadow p-3"
          >
            {f.icon}
            <div>
              <h3 className="font-bold text-lg text-text">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
