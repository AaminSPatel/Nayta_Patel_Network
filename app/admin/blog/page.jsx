"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Filter } from "lucide-react"
import BlogForm from "../../../components/BlogForm"
import BlogTable from "../../../components/BlogTable"
import { usePatel } from "../../../components/patelContext"
import { redirect } from "next/navigation"
import { useEffect } from "react"
export default function BlogPage() {
  const [showForm, setShowForm] = useState(false)
  const {user} = usePatel()
  
   useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (user?.role !== 'admin') {
redirect('/')      }
    }, 5000); // Wait 1 second before checking (adjust time as needed)

    return () => clearTimeout(redirectTimer); // Cleanup on unmount
  }, [user])
  return (
    <div className="space-y-6 p-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <button className="btn btn-primary flex items-center gap-2" onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Add New Blog
        </button>
      </div>

      {showForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <BlogForm onCancel={() => setShowForm(false)} />
        </motion.div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search blogs..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select className="form-input">
                <option>All Categories</option>
                <option>Technology</option>
                <option>Business</option>
                <option>Lifestyle</option>
              </select>

              <button className="btn btn-outline flex items-center gap-2">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <BlogTable />
          </motion.div>
        </>
      )}
    </div>
  )
}
