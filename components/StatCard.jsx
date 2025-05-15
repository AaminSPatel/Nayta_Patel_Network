"use client"
import { motion } from "framer-motion"
import { ArrowUp, ArrowDown } from "lucide-react"

export default function StatCard({ stat, index }) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  const getColorClass = (color) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-600"
      case "blue":
        return "bg-blue-100 text-blue-600"
      case "orange":
        return "bg-orange-100 text-orange-600"
      case "purple":
        return "bg-purple-100 text-purple-600"
      default:
        return "bg-green-100 text-green-600"
    }
  }

  return (
    <motion.div className="dashboard-card" variants={item}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{stat.title}</p>
          <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
        </div>
        <div className={`h-10 w-10 rounded-lg ${getColorClass(stat.color)} flex items-center justify-center`}>
          <stat.icon size={20} />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {stat.trend === "up" ? (
          <ArrowUp size={16} className="text-green-500" />
        ) : (
          <ArrowDown size={16} className="text-red-500" />
        )}
        <span className={`text-sm ml-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>{stat.change}</span>
        <span className="text-sm text-gray-500 ml-2">vs last month</span>
      </div>
    </motion.div>
  )
}
