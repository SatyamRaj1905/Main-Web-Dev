import axios from "axios";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../../config";

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const username = usernameRef.current?.value || "";
      const password = passwordRef.current?.value || "";

      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });

      alert("Signed up successfully!");
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Left Side */}
      <div className="w-1/2 bg-purple-600 flex flex-col justify-center items-center p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400 rounded-full opacity-30 -translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-800 rounded-full opacity-30 translate-x-20 translate-y-20"></div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-64 h-64 text-white z-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6M12 13v6"
          />
        </svg>

        <h1 className="text-white text-3xl mt-6 font-bold z-10">
          Second Brain
        </h1>
        <p className="text-white text-center mt-4 z-10 max-w-xs">
          Capture your favorite ideas from YouTube and Twitter posts, take
          notes, and share insights with ease.
        </p>

        <div className="absolute top-10 left-20 w-6 h-6 bg-white rounded shadow animate-bounce"></div>
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-white rounded shadow animate-pulse"></div>
        <div className="absolute bottom-10 left-1/3 w-4 h-4 bg-white rounded shadow animate-bounce"></div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center p-10 relative">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative">
          {/* Form Content */}
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              ref={usernameRef}
              type="text"
              placeholder="Username"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded-3xl border border-purple-600 hover:bg-white hover:text-purple-600 transition-all duration-300 ease-in-out disabled:opacity-50"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Loader Overlay only on form card */}
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 rounded-lg">
              <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
