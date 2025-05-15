"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Filter } from "lucide-react"
import FeedbackTable from "../../../components/FeedbackTable"
import FeedbackForm from "../../../components/FeedbackForm"
import { usePatel } from "../../../components/patelContext"
import { useEffect } from "react"
import { redirect } from 'next/navigation';
export default function FeedbacksPage() {
  const [showForm, setShowForm] = useState(false)
const {user} = usePatel()
 useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (user?.role !== 'admin') {
redirect('/')      }
    }, 3000); // Wait 1 second before checking (adjust time as needed)

    return () => clearTimeout(redirectTimer); // Cleanup on unmount
  }, [user])
  return (
    <div className="space-y-6 p-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Feedback Management</h2>
        <button className="btn btn-primary flex items-center gap-2" onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Add New Feedback
        </button>
      </div>

      {showForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <FeedbackForm onCancel={() => setShowForm(false)} />
        </motion.div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search feedbacks..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select className="form-input">
                <option>All Types</option>
                <option>Suggestion</option>
                <option>Bug Report</option>
                <option>Complaint</option>
                <option>Praise</option>
              </select>

              <button className="btn btn-outline flex items-center gap-2">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <FeedbackTable />
          </motion.div>
        </>
      )}
    </div>
  )
}
