// Signin.tsx

import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const username = usernameRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        if (!/^[A-Za-z]{3,10}$/.test(username)) {
            setError("Username must be 3-10 letters (A-Z, a-z).");
            setLoading(false);
            return;
        }

        if (
            !/^.*(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/.test(
                password
            )
        ) {
            setError(
                "Password must be 8-20 characters with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character."
            );
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password,
            });

            const token = response.data.token;
            if (!token) throw new Error("Token missing from response");

            localStorage.setItem("token", token); // ✅ Save token
            navigate("/dashboard"); // Navigate to dashboard
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Signin failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen relative">
            {/* Left Side */}
            <div className="w-1/2 bg-purple-600 flex flex-col justify-center items-center p-10 relative overflow-hidden">
                {/* Left background graphics */}
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
                    MindVault
                </h1>
                <p className="text-white text-center mt-4 z-10 max-w-xs">
                    Capture your favorite ideas from YouTube and Twitter posts,
                    take notes, and share insights with ease.
                </p>
            </div>

            {/* Right Side */}
            <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center p-10 relative">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Sign In
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4"
                    >
                        <div>
                            <input
                                ref={usernameRef}
                                type="text"
                                placeholder="Username"
                                className={`border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 ${
                                    error.includes("Username")
                                        ? "border-red-600 focus:ring-red-600"
                                        : "border-gray-300 focus:ring-purple-600"
                                }`}
                            />
                            {error.includes("Username") && (
                                <p className="text-red-600 text-sm mt-1">
                                    {error}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <input
                                ref={passwordRef}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                disabled={loading}
                                className={`border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 ${
                                    error.includes("Password")
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-purple-600"
                                }`}
                            />
                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-800"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                            {error.includes("Password") && (
                                <p className="text-red-500 text-sm mt-1">
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-purple-600 text-white px-4 py-2 rounded-3xl border border-purple-600 hover:bg-white hover:text-purple-600 transition-all duration-300 ease-in-out disabled:opacity-50"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
