"use client"

import {
  FaUsers,
  FaLeaf,
  FaHandshake,
  FaGlobe,
  FaRocket,
  FaHeart,
  FaStar,
  FaShieldAlt,
  FaLightbulb,
  FaConnectdevelop,
  FaUserFriends,
  FaSeedling,
  FaAward,
  FaComments,
  FaBullhorn,
} from "react-icons/fa"

export default function PromotionalPosters() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">नायता पटेल नेटवर्क - प्रमोशनल पोस्टर्स</h1>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Poster 1 - Community Focus */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-orange-400">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 text-white">
              <div className="flex items-center justify-center mb-6">
                <FaUsers className="text-6xl" />
              </div>
              <h2 className="text-3xl font-bold text-center mb-4">समुदाय से जुड़ें</h2>
              <p className="text-center text-lg opacity-90">अपने गाँव के विकास में भागीदार बनें</p>
            </div>
            <div className="p-6 bg-white">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaHeart className="text-orange-400 text-xl" />
                  <span className="text-gray-800 font-medium">सामुदायिक सेवा</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaHandshake className="text-orange-400 text-xl" />
                  <span className="text-gray-800 font-medium">सहयोग और मदद</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaGlobe className="text-orange-400 text-xl" />
                  <span className="text-gray-800 font-medium">डिजिटल कनेक्शन</span>
                </div>
              </div>
              <div className="mt-6 bg-orange-400 text-white text-center py-3 rounded-lg">
                <span className="font-bold">nayatapatalnetwork.com</span>
              </div>
            </div>
          </div>

          {/* Poster 2 - Success Stories */}
          <div className="bg-black rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
            <div className="p-8">
              <div className="text-center mb-6">
                <FaStar className="text-6xl text-emerald-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">सफलता की कहानियाँ</h2>
                <p className="text-emerald-400 text-lg">प्रेरणादायक अनुभव साझा करें</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-500 p-4 rounded-lg text-center">
                  <FaAward className="text-3xl text-white mx-auto mb-2" />
                  <span className="text-white font-bold">उपलब्धियाँ</span>
                </div>
                <div className="bg-emerald-500 p-4 rounded-lg text-center">
                  <FaLightbulb className="text-3xl text-white mx-auto mb-2" />
                  <span className="text-white font-bold">नवाचार</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-white text-xl font-bold mb-4">आज ही अपनी कहानी साझा करें!</p>
                <div className="bg-white text-black py-3 px-6 rounded-full inline-block">
                  <span className="font-bold">nayatapatalnetwork.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Poster 3 - Digital Platform */}
          <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-2xl overflow-hidden border-4 border-emerald-600">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="bg-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaRocket className="text-4xl text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">डिजिटल क्रांति</h2>
                <p className="text-emerald-600 text-xl font-semibold">नायता पटेल नेटवर्क</p>
              </div>

              <div className="space-y-6">
                <div className="bg-black text-white p-4 rounded-lg flex items-center space-x-4">
                  <FaConnectdevelop className="text-3xl text-emerald-400" />
                  <div>
                    <h3 className="font-bold text-lg">तकनीकी समाधान</h3>
                    <p className="text-sm opacity-80">आधुनिक डिजिटल प्लेटफॉर्म</p>
                  </div>
                </div>

                <div className="bg-emerald-500 text-white p-4 rounded-lg flex items-center space-x-4">
                  <FaUserFriends className="text-3xl" />
                  <div>
                    <h3 className="font-bold text-lg">सामुदायिक नेटवर्क</h3>
                    <p className="text-sm opacity-80">सभी को जोड़ने का माध्यम</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center bg-black text-emerald-400 py-4 rounded-xl">
                <span className="text-xl font-bold">nayatapatalnetwork.com</span>
              </div>
            </div>
          </div>

          {/* Poster 4 - Agriculture Focus */}
          <div className="bg-emerald-600 rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
            <div className="p-8 text-white">
              <div className="text-center mb-6">
                <FaSeedling className="text-6xl mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">कृषि विकास</h2>
                <p className="text-xl opacity-90">किसानों के लिए डिजिटल प्लेटफॉर्म</p>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="bg-white text-emerald-600 p-4 rounded-lg flex items-center space-x-3">
                  <FaLeaf className="text-2xl" />
                  <span className="font-bold">मंडी भाव की जानकारी</span>
                </div>
                <div className="bg-black text-white p-4 rounded-lg flex items-center space-x-3">
                  <FaShieldAlt className="text-2xl text-emerald-400" />
                  <span className="font-bold">फसल सुरक्षा सलाह</span>
                </div>
                <div className="bg-white text-emerald-600 p-4 rounded-lg flex items-center space-x-3">
                  <FaComments className="text-2xl" />
                  <span className="font-bold">किसान चर्चा मंच</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold mb-4">आज ही जुड़ें!</p>
                <div className="bg-black text-emerald-400 py-3 px-6 rounded-full inline-block">
                  <span className="font-bold text-lg">nayatapatalnetwork.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Poster 5 - Call to Action */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-black">
            <div className="bg-black p-6">
              <div className="text-center">
                <FaBullhorn className="text-5xl text-emerald-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white">अभी रजिस्टर करें!</h2>
              </div>
            </div>

            <div className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">नायता पटेल नेटवर्क</h3>
                <p className="text-emerald-600 text-xl font-semibold mb-6">समाज को जोड़ने का डिजिटल मंच</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-lg">
                  <span className="text-gray-800 font-medium">✓ निःशुल्क सदस्यता</span>
                  <FaHeart className="text-emerald-500" />
                </div>
                <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-lg">
                  <span className="text-gray-800 font-medium">✓ तुरंत कनेक्शन</span>
                  <FaConnectdevelop className="text-emerald-500" />
                </div>
                <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-lg">
                  <span className="text-gray-800 font-medium">✓ सामुदायिक लाभ</span>
                  <FaUsers className="text-emerald-500" />
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white py-4 px-8 rounded-xl">
                  <span className="text-xl font-bold">nayatapatalnetwork.com</span>
                </div>
                <p className="text-black font-bold text-lg mt-4">आज ही जुड़ें और पंजीकरण करें!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
