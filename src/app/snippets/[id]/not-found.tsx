import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center max-w-3xl w-full p-8 sm:p-12 bg-white rounded-3xl shadow-xl border border-gray-200">
        <div className="relative inline-block mb-10">
          <div className="absolute -inset-4 bg-blue-400 rounded-full filter blur-xl opacity-50 animate-pulse"></div>

          <div className="relative z-10 inline-flex items-center justify-center w-28 h-28 rounded-full bg-blue-500 text-white text-5xl font-extrabold shadow-lg">
            <svg
              className="w-14 h-14"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
        </div>

        <h1 className="text-6xl font-extrabold text-gray-900 mb-4 break-words">
          404
        </h1>
        <h2 className="text-4xl font-bold text-gray-800 mb-6 break-words">
          Looks like you're lost in space!
        </h2>

        <p className="text-xl text-gray-600 mb-10 leading-relaxed break-words">
          The page you're searching for seems to have wandered off. Don't worry,
          we can help you find your way back.
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Return to Safety (Homepage)
        </Link>
      </div>
    </div>
  );
}
