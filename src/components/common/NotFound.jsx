"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound = ({title}) => {
  const router = useRouter();

  return (
    <div className="h-[calc(100dvh-120px)] bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Text */}
        <div className="space-y-4">
          <h1 className="text-8xl sm:text-9xl font-bold text-gray-900 tracking-tight">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">
            {title}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
          >
            Back
          </button>
          
          <Link href="/">
            <button className="w-full inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-primary hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;