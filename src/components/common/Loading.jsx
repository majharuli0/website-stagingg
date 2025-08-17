"use client";
import { useEffect, useState } from "react";

const Loading = ({ message = "Loading...", showProgress = false }) => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Animated dots effect
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    // Progress animation (if enabled)
    let progressInterval;
    if (showProgress) {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + Math.random() * 10;
        });
      }, 200);
    }

    return () => {
      clearInterval(dotsInterval);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [showProgress]);

  return (
    <div className="h-[calc(100dvh-120px)] flex items-center justify-center px-4  sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Main Loading Animation */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto relative">
            <div className="absolute inset-0 border-4 border-text/40 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-text rounded-full animate-spin"></div>
            
            {/* Inner Ring */}
            <div className="absolute inset-2 border-2 border-gray/40 rounded-full"></div>
            <div className="absolute inset-2 border-2 border-transparent border-t-gray rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            
            {/* Center Dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-gradient-to-r from-text to-gray rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-text-400 rounded-full opacity-60 animate-bounce"
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${30 + (i % 2) * 40}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {message}{dots}
          </h2>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;