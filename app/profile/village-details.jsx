"use client"

import { motion } from "framer-motion"
import { FaCrown } from "react-icons/fa"
import { FiMapPin, FiUsers, FiCalendar, FiMap, FiSun } from "react-icons/fi"
import { GiCrown, GiKing, GiPerson } from "react-icons/gi"

const VillageDetails = ({ villageData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-emerald-100 rounded-full">
          <FiMapPin className="text-emerald-600 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{villageData.name}</h2>
          <p className="text-gray-600">{villageData?.dist}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-4">Village Information</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <FiUsers className="text-emerald-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Population</p>
                <p className="font-medium">{villageData.population} residents</p>
              </div>
            </div>
            <div className="flex items-center">
              <FiCalendar className="text-emerald-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Established</p>
                <p className="font-medium">{villageData.established}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FiMap className="text-emerald-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{villageData.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <GiKing className="text-emerald-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Sarpanch</p>
                <p className="font-medium">{villageData?.headOfVillage ||'-'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCrown className="text-emerald-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Ambessador</p>
                <p className="font-medium">{villageData?.ambassador?.fullname ||'-'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-4">Agricultural Information</h3>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Main Crops</p>
            <div className="flex flex-wrap gap-2">
              {villageData.mainCrops.map((crop, index) => (
                <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                  {crop}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">Seasonal Calendar</p>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                    Spring
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-emerald-600">Planting Season</span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-200">
                <div
                  style={{ width: "30%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                ></div>
              </div>

              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                    Summer
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-emerald-600">Growing Season</span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-200">
                <div
                  style={{ width: "70%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                ></div>
              </div>

              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                    Fall
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-emerald-600">Harvest Season</span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-200">
                <div
                  style={{ width: "90%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                ></div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="text-lg font-semibold mb-4">Village Map</h3>
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FiMap className="mx-auto text-4xl text-gray-400 mb-2" />
            <p className="text-gray-500">Village map visualization would appear here</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default VillageDetails
