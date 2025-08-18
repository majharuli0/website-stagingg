import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <svg
          className="mx-auto mb-8 w-40 h-40 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"
          />
        </svg>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Sorry, we couldn&#39;t find the page you&#39;re looking for.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
