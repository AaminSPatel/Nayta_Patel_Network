"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa"
import { usePatel } from "../../components/patelContext"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const router = useRouter()

  const {path, setToken, setUser, setError,setShowWelcomeCard} = usePatel()
  //const { setUser, setToken, setError } = usePatel(); // Assuming your context provides these
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
 const [isSignUp,setIsSignUp] = useState(false)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ""))) {
      newErrors.mobile = "Phone number must be 10 digits";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
   /*  if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    } */

    return newErrors;
  };
  const [isLoading, setIsLoading] = useState(false); // Add this state

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  
  // Prevent multiple submissions
  if (isLoading) return;
  
  setIsLoading(true); // Start loading
  
  const trimmedEmail = formData.email.trim();
  const trimmedPassword = formData.password.trim();

  const formErrors = validateForm();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    setIsLoading(false); // Stop loading if validation fails
    return;
  }

  try {
    const { data } = await axios.post(path + '/api/auth/register', {
      ...formData,
      email: trimmedEmail,
      password: trimmedPassword
    });
    
    setUser(data.user[0]);
    setToken(data.token);
    localStorage.setItem('token', data.token);
    setIsSignUp(true);
    
    setTimeout(() => {
      router.push('/profile-update');
      setShowWelcomeCard(true);
    }, 2000);

    console.log('Signup successful:');
  } catch (err) {
    console.error('Signup error:', err.response?.data?.message || err.message);
    setError(err.response?.data?.message || 'Signup failed');
  } finally {
    setIsLoading(false); // Always stop loading
  }
};
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Left Side - Form */}
          <div className="md:w-1/2 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
              <p className="text-gray-600">Join our community of farmers, dairy producers, and rural entrepreneurs.</p>
              <p className="py-3 text-md text-emerald-600">Account created Succesfully!!</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      className={`w-full pl-10 py-1  rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 ${errors.name ? "border-red-500" : ""}`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.fullname && <p className="mt-1 text-sm text-red-600">{errors.fullname}</p>}
                </div>

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
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 py-1  rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 ${errors.email ? "border-red-500" : ""}`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className={`w-full pl-10 py-1  rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 ${errors.phone ? "border-red-500" : ""}`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
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
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 py-1  pr-10 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 ${errors.password ? "border-red-500" : ""}`}
                      placeholder="Create a password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 py-1  pr-10 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 ${errors.confirmPassword ? "border-red-500" : ""}`}
                      placeholder="Confirm your password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>

              {/*   <div className=" items-start hidden">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className={`h-4 w-4 rounded py-1  border-gray-300 text-emerald-600 focus:ring-emerald-500 ${errors.agreeTerms ? "border-red-500" : ""}`}
                    />
                  </div>
                  <div className="ml-3 text-sm hidden">
                    <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                      I agree to the{" "}
                      <Link href="/terms" className="text-emerald-600 hover:text-emerald-500">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-emerald-600 hover:text-emerald-500">
                        Privacy Policy
                      </Link>
                    </label>
                    {errors.agreeTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>}
                  </div>
                </div>
 */}
                <div>
  <motion.button
    initial={{ scale: 1 }}
    whileTap={!isLoading ? { scale: 0.98 } : {}} // Only animate if not loading
    whileHover={!isLoading ? { scale: 1.01 } : {}} // Only animate if not loading
    animate={{ scale: 1 }}
    transition={{ 
      duration: 0.3,
      type: "spring",
      stiffness: 500,
      damping: 15
    }}
    type="submit"
    disabled={isLoading || isSignUp} // Disable when loading or after signup
    className={`w-full ${
      isLoading || isSignUp 
        ? 'bg-emerald-400' 
        : 'bg-emerald-500 hover:bg-emerald-600'
    } text-white py-3 rounded-md transition-colors font-medium relative`}
  >
    {isLoading ? (
      <div className="flex items-center justify-center">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
        />
        Processing...
      </div>
    ) : isSignUp ? (
      'Account Created...'
    ) : (
      'Create Account'
    )}
  </motion.button>
</div>
              </div>
            </form>
{/* 
            <div className="mt-6 hidden">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
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
 */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side - Image and Benefits */}
          <div className="md:w-1/2 bg-emerald-50 p-8 flex flex-col justify-center">
            <div className="mb-8 text-center">
              <div className="mx-auto w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mb-4">
                <span className="text-white text-3xl font-bold">AG</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Apna Gaon Network</h2>
              <p className="text-gray-600">Digital Voice of Our Rural Power</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 text-emerald-600">
                    ✓
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Access Fair Market Prices</h3>
                  <p className="text-gray-600">Get daily updates on fair prices for your agricultural products.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 text-emerald-600">
                    ✓
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Connect with Community</h3>
                  <p className="text-gray-600">Share knowledge, ask questions, and learn from others.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 text-emerald-600">
                    ✓
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Educational Resources</h3>
                  <p className="text-gray-600">
                    Access training materials and learning resources for farming and dairy.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 text-emerald-600">
                    ✓
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Buy and Sell Directly</h3>
                  <p className="text-gray-600">List your products on our marketplace without middlemen.</p>
                </div>
              </div>
            </div>

            <div className="text-center text-gray-600 text-sm">
              <p>
                By joining, you're becoming part of a movement to empower rural communities through digital
                connectivity.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
