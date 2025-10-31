import { Link } from "react-router-dom"; // make sure it's react-router-dom

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white px-6">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl text-center max-w-lg">
        <h1 className="text-6xl font-extrabold mb-6">🚫 401</h1>
        <h2 className="text-2xl font-semibold mb-4">Unauthorized Access</h2>
        <p className="mb-6 text-gray-200">
          Sorry! You are not authorized to view this page.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl shadow hover:bg-gray-100 transition duration-300"
        >
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}
