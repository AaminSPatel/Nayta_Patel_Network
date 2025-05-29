"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Filter, MapPin } from "lucide-react"
import VillageTable from "../../../components/VillageTable"
import VillageForm from "../../../components/VillageForm"
import { useEffect } from "react"
import { redirect } from 'next/navigation';
import { usePatel } from "../../../components/patelContext"
export default function VillagesPage() {
  const [showForm, setShowForm] = useState(false)
const {user} = usePatel();

useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (user?.role !== 'admin') {
redirect('/')      }
    }, 3000); // Wait 1 second before checking (adjust time as needed)

    return () => clearTimeout(redirectTimer); // Cleanup on unmount
  }, [user])
  return (
    <div className="p-2 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Villages Management</h2>
        <button className="btn btn-primary flex items-center gap-2" onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Add New Village
        </button>
      </div>

      {showForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <VillageForm onCancel={() => setShowForm(false)} />
        </motion.div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search villages..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Filter by location"
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              <button className="btn btn-outline flex items-center gap-2">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <VillageTable />
          </motion.div>
        </>
      )}
    </div>
  )
}
