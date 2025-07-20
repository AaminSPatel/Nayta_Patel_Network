"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Filter } from "lucide-react"
import PehchanTable from "../../../components/PehchanTable"
import PehchanForm from "../../../components/PehchanForm"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { usePatel } from "../../../components/patelContext"

export default function StoriesPage() {
  const [showForm, setShowForm] = useState(false)
const {user} = usePatel()

/*  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (!(user?.role === 'admin' || user?.role === 'semi-admin')) {
redirect('/')      }
    }, 4000); // Wait 1 second before checking (adjust time as needed)

    return () => clearTimeout(redirectTimer); // Cleanup on unmount
  }, [user]) */
  
   const [selectedPehchan, setSelectedPehchan] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { pehchans, formatDate, path } = usePatel();

  const filteredPehchans = pehchans.filter(pehchan => {
    const matchesSearch = pehchan.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         pehchan.village.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || pehchan.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || pehchan.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="p-2 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="sm:text-2xl text-md font-bold">Stories Management</h2>
        <button className="btn btn-primary flex items-center gap-2 sm:text-md text-sm" onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Add New Story
        </button>
      </div>

      {showForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <PehchanForm onCancel={() => setShowForm(false)} />
        </motion.div>
      ) : (
        <>
           {/* Filters */}
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name or village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            />
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="Business">Business</option>
              <option value="Farmer">Farmer</option>
              <option value="Professional">Professional</option>
              <option value="Artist">Artist</option>
              <option value="Other">Other</option>
            </select>
            
          
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <PehchanTable pehchan={filteredPehchans}/>
          </motion.div>
        </>
      )}
    </div>
  )
}
