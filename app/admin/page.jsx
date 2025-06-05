"use client"
import { motion } from "framer-motion"
import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import StatCard from "../../components/StatCard"
import RecentTable from "../../components/RecentTable"
import Chart from "../../components/Chart"
import "../globals.css"
import { usePatel } from "../../components/patelContext"
import { useEffect, useState } from "react"
import { redirect } from 'next/navigation';
export default function Dashboard() {
    const {users, villages, posts, blogs,user} = usePatel()
    const [selectedType, setSelectedType] = useState('users')
  const stats = [
    {
      title: "Total Villages",
      value: villages.length,
      icon: DollarSign,
      change: "+12",
      trend: null,
      color: "green",
      link:'/admin/villages'
    },
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      change: "+8.2%",
      trend: "up",
      color: "blue",
      link:'/admin/members'

    },
    {
      title: "Total Posts",
      value: posts.length,
      icon: ShoppingCart,
      change: "-3.1%",
      trend: "down",
      color: "orange",
      link:'/admin/posts'

    },
    {
      title: "Total Blogs",
      value: blogs.length,
      icon: TrendingUp,
      change: "+2.3%",
      trend: "up",
      color: "purple",
      link:'/admin/blog'

    },
  ]
useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (user?.role !== 'admin') {
redirect('/')      }
    }, 3000); // Wait 1 second before checking (adjust time as needed)

    return () => clearTimeout(redirectTimer); // Cleanup on unmount
  }, [user])
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="flex flex-col md:flex-row-reverse min-h-screen bg-gray-50">
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-6"
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <button className="btn btn-primary w-full sm:w-auto">
                Generate Report
              </button>
            </div>

            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </motion.div>

            {/* Chart and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 dashboard-card h-[480px]">
                <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
                <select name="type" onChange={(e)=>{setSelectedType(e.target.value)}} className="border-emerald-500 border p-1 px-3 rounded-md bg-emerald-200" id="">
                  <option className="bg-white" value="users">Users</option>
                  <option className="bg-white" value="villages">Villages</option>
                  <option className="bg-white" value="blogs">Blogs</option>
                  <option className="bg-white" value="posts">Posts</option>
                </select>
                <Chart type={selectedType}/>
              </div>

              <div className="dashboard-card">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div
                        className={`h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600`}
                      >
                        {item % 2 === 0 ? (
                          <ArrowUp size={16} />
                        ) : (
                          <ArrowDown size={16} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {item % 2 === 0
                            ? "New post created"
                            : "User feedback received"}
                        </p>
                        <p className="text-sm text-gray-500">{`${item * 10} minutes ago`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Table */}
            <div className="dashboard-card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h3 className="text-lg font-semibold">Recent Entries</h3>
                <button className="btn btn-outline w-full sm:w-auto">View All</button>
              </div>
              <RecentTable />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
