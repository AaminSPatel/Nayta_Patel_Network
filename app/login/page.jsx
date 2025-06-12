"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaCheckCircle,
} from "react-icons/fa";
import { usePatel } from "../../components/patelContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    form: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const { path, setToken, setUser, setError , setShowWelcomeCard} = usePatel();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({ form: "", email: "", password: "" });
    setError(null);

    // Client-side validation
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const validationErrors = {};

    if (!trimmedEmail) validationErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(trimmedEmail))
      validationErrors.email = "Email is invalid";
    if (!trimmedPassword) validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...validationErrors }));
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(path + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");
console.log('Data after login');

      // Success case
      setUser(data.user[0]);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setIsSuccess(true);
      setShowWelcomeCard(true)
      // Navigate to home after 2 seconds
      setTimeout(() => {
        router.push("/");
        
      }, 2000);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        form: err.message || "Login failed. Please try again.",
      }));
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");

    if (!forgotEmail.trim()) {
      setForgotError("Email is required");
      return;
    }

    try {
      const response = await fetch(path + "/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotEmail.trim() }),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to send reset email");

      setForgotSuccess("Password reset link sent to your email");
      setForgotEmail("");

      // Hide the forgot password form after 3 seconds
      setTimeout(() => {
        setShowForgotPassword(false);
      }, 3000);
    } catch (err) {
      setForgotError(err.message || "Failed to process request");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">AG</span>
              </div>
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-600">
                Sign in to access your Apna Gaon account
              </p>

              {/* Success message */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center"
                  >
                    <FaCheckCircle className="mr-2" />
                    Login successful! Redirecting...
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error message */}
              {errors.form && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {errors.form}
                </div>
              )}
            </div>

            {!showForgotPassword ? (
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full py-2 pl-10 rounded-md border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200`}
                        placeholder="Enter your email"
                        disabled={isSubmitting || isSuccess}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full py-2 pl-10 pr-10 rounded-md border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200`}
                        placeholder="Enter your password"
                        disabled={isSubmitting || isSuccess}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-500"
                          disabled={isSubmitting || isSuccess}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="font-medium text-emerald-600 hover:text-emerald-500"
                        disabled={isSubmitting || isSuccess}
                      >
                        Forgot your password?
                      </button>
                    </div>
                  </div>

                  <div>
                    <motion.button
                      initial={{ scale: 1 }}
                      whileTap={{ scale: 0.98 }} // Shrink effect when pressed
                      whileHover={{ scale: 1.01 }} // Slight grow on hover
                      animate={{ scale: 1 }} // Default state
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-md transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                      disabled={isSubmitting || isSuccess}
                    >
                      {isSubmitting
                        ? "Signing In..."
                        : isSuccess
                        ? "Success!"
                        : "Sign In"}
                    </motion.button>
                  </div>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-bold mb-4">Reset Password</h2>

                {forgotError && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {forgotError}
                  </div>
                )}

                {forgotSuccess && (
                  <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    {forgotSuccess}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="forgot-email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="forgot-email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full py-2 pl-10 rounded-md border border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleForgotPassword}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-md transition-colors font-medium"
                  >
                    Send Reset Link
                  </button>
                  <button
                    onClick={() => setShowForgotPassword(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md transition-colors font-medium"
                  >
                    Back to Login
                  </button>
                </div>
              </motion.div>
            )}

            {!showForgotPassword && (
              <>
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      disabled={isSubmitting || isSuccess}
                    >
                      <FaGoogle className="mr-2" /> Google
                    </button>
                    <button
                      type="button"
                      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      disabled={isSubmitting || isSuccess}
                    >
                      <FaFacebook className="mr-2" /> Facebook
                    </button>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      href="/signup"
                      className="font-medium text-emerald-600 hover:text-emerald-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
