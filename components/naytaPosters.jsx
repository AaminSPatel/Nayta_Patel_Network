"use client"

import Image from "next/image"
import {  GiWheat } from "react-icons/gi"
import { IoIosPeople } from "react-icons/io";
import { TbBulb, TbBulbFilled } from "react-icons/tb";
import { PiMapPinAreaFill, PiMapPinAreaLight ,PiShareNetworkBold,PiShareNetwork, PiMedalLight  } from "react-icons/pi";
import { FaMedal } from "react-icons/fa";
export default function NayataPatelPosters() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">नायता पटेल समाज - प्रमोशनल कार्ड्स</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* First Poster - With Illustration */}
          <div className="bg-white  shadow-2xl overflow-hidden max-w-md mx-auto">
            {/* Header */}
            <div className="bg-green-700 text-white p-3">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="text-white text-xl"><GiWheat size={20}/></div>
                </div>
                <h1 className="text-2xl font-bold">नायता पटेल समाज</h1>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-2 bg-white">
              <h2 className="text-2xl font-bold text-green-800 text-center mb-2 ">
                आइए जुड़ें, जानें और आगे बढ़ें!
              </h2>
              <p className="text-center text-gray-700 font-semibold mb-3 text-lg">
                हमारी वेबसाइट पर आपका स्वागत है!
              </p>

              {/* Illustration Section */}
              <div className="bg-gradient-to-b from-green-100 to-green-50 rounded-2xl mb-3 relative overflow-hidden">
              <Image src={'/farmer.avif'} height={'200'} width={'400'} className="h-32 w-full scale-125" alt='Name' />
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-4">
                <h3 className="text-xl font-bold text-green-800 mb-4">हम क्या करते हैं ?</h3>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm"> <TbBulbFilled size={20}/></div>
                  <div>
                    <h4 className="font-bold text-gray-800">सफल कहानियाँ:</h4>
                    <p className="text-gray-600 text-sm">हमारे समाज के सफल व्यक्तियों की कहानियाँ</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm"> <PiMapPinAreaFill size={20}/></div>
                  <div>
                    <h4 className="font-bold text-gray-800">ग्राम जानकारी:</h4>
                    <p className="text-gray-600 text-sm">हर गाँव की जानकारी, जनसंख्या, सरपंच का विवरण</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm"> <IoIosPeople size={20}/></div>
                  <div>
                    <h4 className="font-bold text-gray-800">Village Ambassador:</h4>
                    <p className="text-gray-600 text-sm">हर गाँव से एक समाज एंबेसडर की नियुक्ति</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm"> <PiShareNetworkBold size={20}/></div>
                  <div>
                    <h4 className="font-bold text-gray-800">समाज निर्माण:</h4>
                    <p className="text-gray-600 text-sm">समाज के लोगों को जोड़ने के लिए एक मजबूत नेटवर्क</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mb-3">
                <p className="text-green-800 font-bold text-lg mb-2">
                  आइए जुड़िए - अपने गाँव, अपने समाज, और अपने भविष्य से!
                </p>
              </div>

              {/* Website URL */}
              <div className="bg-green-700 text-white text-center py-2 rounded-2xl">
                <span className="font-bold text-lg">naytapatelnetwork.vercel.app</span>
              </div>
            </div>
          </div>

          {/* Second Poster - Simple Green Design */}
          <div className="bg-green-700 shadow-2xl overflow-hidden max-w-md mx-auto text-white">
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-5">
                <h1 className="text-4xl font-black whitespace-nowrap scale-80 -translate-x-7 mb-3 text-green-200 opacity-90">NAYTA PATEL NETWORK</h1>                
                <h2 className="text-2xl font-bold mb-2">आइए जुड़ें, जानें और आगे बढ़ें!</h2>
                <p className="text-lg opacity-90">हमारी वेबसाइट पर आपका स्वागत है!</p>
              </div>

              {/* What We Do Section */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-5 text-center border-b-2 border-white pb-2">हम क्या करते हैं?</h3>
                
                <div className="space-y-3">
                  <div className="bg-green-800 bg-opacity-50 rounded-xl p-2 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-700 text-xl font-bold"> <TbBulb size={20}/></div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Inspirational Stories:</h4>
                      <p className="text-sm opacity-90">हमारे समाज के सफलव्यक्तियों की कहानियाँ</p>
                    </div>
                  </div>

                  <div className="bg-green-800 bg-opacity-50 rounded-xl p-2 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-700 text-xl font-bold"><PiMapPinAreaLight size={20} /></div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">ग्राम विवरण:</h4>
                      <p className="text-sm opacity-90">हर गाँव की जानकारी, जनसंख्या, सरपंच का विवरण</p>
                    </div>
                  </div>

                  <div className="bg-green-800 bg-opacity-50 rounded-xl p-2 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-700 text-xl font-bold"><PiMedalLight size={20}/></div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Society Ambassador:</h4>
                      <p className="text-sm opacity-90">हर गाँव से एक समाज एंबेसडर की नियुक्ति</p>
                    </div>
                  </div>

                  <div className="bg-green-800 bg-opacity-50 rounded-xl p-2 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-700 text-xl font-bold"><PiShareNetwork  /></div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">समूह निर्माण:</h4>
                      <p className="text-sm opacity-90">समाज के लोगों को जोड़ने के लिए एक मजबूत नेटवर्क</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <p className="text-xl font-bold mb-6">
                  आइए जुड़िए - अपने गाँव, अपने समाज और अपने भविष्य से!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>
    </div>
  )
}
