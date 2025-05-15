"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiUser, FiMapPin, FiPhone, FiArrowRight, FiCheck } from "react-icons/fi"
import { useRouter } from "next/navigation"

export default function ProfileSetup() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [profileData, setProfileData] = useState({
    profilePic: null,
    village: "",
    mobile: "",
  })
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileData({
        ...profileData,
        profilePic: file,
      })

      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const skipStep = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      finishSetup()
    }
  }

  const finishSetup = () => {
    // Here you would typically send the data to your backend
    console.log("Profile setup complete with data:", profileData)
    // Redirect to the dashboard
    router.push("/")
  }

  const stepVariants = {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Complete Your Profile</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Let's set up your profile so others can get to know you better
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step === i
                      ? "bg-emerald-600 text-white"
                      : step > i
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step > i ? <FiCheck /> : i}
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-between">
                <span className="bg-white px-2 text-xs text-gray-500">Profile Picture</span>
                <span className="bg-white px-2 text-xs text-gray-500">Village</span>
                <span className="bg-white px-2 text-xs text-gray-500">Contact</span>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Add a Profile Picture</h3>
                  <p className="text-sm text-gray-500">Choose a profile picture to personalize your account</p>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-32 h-32 mb-4">
                    {previewUrl ? (
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Profile preview"
                        className="w-full h-full rounded-full object-cover border-4 border-emerald-100"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center">
                        <FiUser className="text-emerald-500 text-4xl" />
                      </div>
                    )}
                    <label
                      htmlFor="profile-pic"
                      className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-700 transition-colors"
                    >
                      <FiUser size={16} />
                    </label>
                    <input
                      id="profile-pic"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  <p className="text-sm text-gray-500 mb-4">Click the button to upload a photo</p>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={skipStep}
                    className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    Skip for now
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Next <FiArrowRight className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select Your Village</h3>
                  <p className="text-sm text-gray-500">Choose the village you belong to</p>
                </div>

                <div>
                  <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-1">
                    Village
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMapPin className="text-gray-400" />
                    </div>
                    <select
                      id="village"
                      name="village"
                      value={profileData.village}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select a village</option>
                      <option value="Green Valley">Green Valley</option>
                      <option value="Blue Ridge">Blue Ridge</option>
                      <option value="Sunny Hills">Sunny Hills</option>
                      <option value="Maple Woods">Maple Woods</option>
                    </select>
                  </div>
                </div>

                <div className="bg-emerald-50 p-4 rounded-md">
                  <h4 className="font-medium text-emerald-800 mb-2">About Green Valley</h4>
                  <p className="text-sm text-emerald-700 mb-2">
                    Green Valley is a thriving agricultural community known for its fertile lands and community spirit.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                      Population: 5,240
                    </span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                      Established: 1967
                    </span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                      Main Crops: Wheat, Corn
                    </span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700"
                  >
                    Back
                  </button>
                  <button
                    onClick={skipStep}
                    className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    Skip for now
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                    disabled={!profileData.village}
                  >
                    Next <FiArrowRight className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Add Contact Information</h3>
                  <p className="text-sm text-gray-500">Add your mobile number so others can contact you</p>
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      value={profileData.mobile}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Your number will only be visible to people you choose in privacy settings
                  </p>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700"
                  >
                    Back
                  </button>
                  <button
                    onClick={skipStep}
                    className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    Skip for now
                  </button>
                  <button
                    onClick={finishSetup}
                    className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Complete Setup <FiCheck className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
