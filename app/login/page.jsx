"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa"
import { usePatel } from "../../components/patelContext"
import axios from "axios"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  //const { signIn } = usePatel();
  const {path, setToken, setUser, setError} = usePatel()

 /*  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  }; */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setErrors({});
    
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    
    console.log('Login attempt:', { trimmedEmail, trimmedPassword });
  
    // Validation
    const formErrors = {};
    if (!trimmedEmail) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) formErrors.email = "Email is invalid";
    if (!trimmedPassword) formErrors.password = "Password is required";
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    try {
      const response = await axios.post(path + '/api/auth/login', {
        email: trimmedEmail,
        password: trimmedPassword
      });
      
      console.log(response.data.user, 'login hone par aya data');
      
      // Update state and storage
      setUser(response.data.user);
      setToken(response.data.token);
      //document.cookie = `token=${response.data.token}; path=/`;
      localStorage.setItem('token', response.data.token);
      
      // Optional: Clear form
      setEmail('');
      setPassword('');
      setErrors({});
      
    } catch (err) {
      // Error handling
      if (err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('Network error or server unavailable');
      }
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
              <p className="text-gray-600">Sign in to access your Apna Gaon account</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                      onChange={(e)=>{setEmail(e.target.value)}}
                      className={`w-full py-1 pl-10 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 ${errors.email ? "border-red-500" : ""}`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e)=>{setPassword(e.target.value)}}
                      className={`w-full py-1  pl-10 pr-10 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 ${errors.password ? "border-red-500" : ""}`}
                      placeholder="Enter your password"
                    />
                  {/*   <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div> */}
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                 {/*  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
/*                       checked={rememberMe}
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div> */}
                  <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-emerald-600 hover:text-emerald-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleLogin}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-md transition-colors font-medium"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <FaGoogle className="mr-2" /> Google
                </button>
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <FaFacebook className="mr-2" /> Facebook
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="font-medium text-emerald-600 hover:text-emerald-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
