"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Filter, List, LayoutGrid, LayoutGridIcon } from "lucide-react"
import MemberTable from "../../../components/MemberTable"
import MemberForm from "../../../components/MemberForm"
import { usePatel } from "../../../components/patelContext"
import { useEffect } from "react"
import { redirect } from 'next/navigation';

import { Suspense } from 'react';

export default function MembersPage() {
  return (
    <Suspense fallback={<Loader/>}>
      <MembersContent />
    </Suspense>
  );
}

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="relative w-24 h-24 mb-6">
        {/* Emerald and yellow spinner */}
        <div className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-spin border-t-yellow-400 border-r-yellow-400"></div>
        <div className="absolute inset-2 border-4 border-emerald-500 rounded-full animate-spin border-b-yellow-400 border-l-yellow-400 animation-delay-200"></div>
      </div>
      <h1 className="text-3xl font-semibold text-black">Nayta Patel Network</h1>
            <p className="text-3xl font-semibold text-black">Loading Members...</p>

    </div>
  );
}

 function MembersContent() {


  const [showForm, setShowForm] = useState(false)
const {user , users, villages} = usePatel()

  const [search, setSearch] = useState("")
  const [filterVillage, setFilterVillage] = useState("")
  const [filterRole, setFilterRole] = useState("")
  const [view, setView] = useState("grid") // or "grid"
  const [showControls, setShowControls] = useState(false)
  const [allUsers, setAllUsers] = useState([])
 useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (user?.role !== 'admin') {
redirect('/')      }
    }, 6000); // Wait 1 second before checking (adjust time as needed)

    return () => clearTimeout(redirectTimer); // Cleanup on unmount
  }, [user])

  useEffect(()=>{
    if(users){
      setAllUsers(users)
    }
  },[users])
  
  const filteredUsers = allUsers?.filter(user => {
    const matchesSearch = user.fullname.toLowerCase().includes(search.toLowerCase())
    const matchesVillage = filterVillage ? user.village === filterVillage : true
    const matchesRole = filterRole ? user.role === filterRole : true

    //console.log('matchesSearch',matchesSearch,'matchesVillage',matchesVillage,'matchesRole',matchesRole);
    
    return matchesSearch && matchesVillage && matchesRole
  }) || []

  console.log('filteredUsers',filteredUsers);
  

  return (
    <div className=" p-2 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="sm:text-2xl text-md font-bold">Members Management</h2>
        <button className="sm:text-md text-sm btn btn-primary flex items-center gap-2" onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Add New Member
        </button>
      </div>

      {showForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <MemberForm onCancel={() => setShowForm(false)} />
        </motion.div>
      ) : (
        <div className="relative">
          <div className="fixed top-30 left-4 md:left-70 z-50 space-y-2">
        <button onClick={() => setShowControls(!showControls)} className="bg-emerald-600 p-2 rounded-full text-white shadow hover:bg-emerald-700">
          <Filter size={20} />
        </button>
        {showControls && (
          <div className="p-4 bg-white rounded-xl shadow space-y-2 w-64">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border px-3 py-1 rounded"
            />
            <select value={filterVillage} onChange={(e) => setFilterVillage(e.target.value)} className="w-full border px-3 py-1 rounded">
              <option value="">All Villages</option>
              {[...new Set(villages.map(u => u.name))].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="w-full border px-3 py-1 rounded">
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="ambassador">Ambassador</option>
            </select>
            <div className="flex justify-between">
              <button onClick={() => setView("table")} className={`p-2 rounded ${view === "table" ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}><List size={18} /></button>
              <button onClick={() => setView("grid")} className={`p-2 rounded ${view === "grid" ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}><LayoutGridIcon size={18} /></button>
            </div>
          </div>
        )}
      </div>


          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <MemberTable users={filteredUsers} view = {view}/>
          </motion.div>
        </div>
      )}
    </div>
  )
}
