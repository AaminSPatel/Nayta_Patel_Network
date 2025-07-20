"use client";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye, Heart, Clock, EyeIcon } from "lucide-react";
import { usePatel } from "./patelContext";
import { useState } from "react";
import PehchanForm from "./PehchanForm";

export default function PehchanTable({pehchan}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPehchan, setSelectedPehchan] = useState(false);
 const { pehchans, formatDate, path ,fetchPehchan} = usePatel();


  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}'s profile?`
    );
    if (!confirmDelete) return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(path + `/api/pehchan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
fetchPehchan();
      if (!res.ok) throw new Error("Failed to delete");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      
        { !isOpen ?  <motion.div
          className="table-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
         

          <table className="admin-table">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Village</th>
                <th scope="col">Profession</th>
                <th scope="col">Category</th>
                <th scope="col">Likes</th>
                <th scope="col">Shares</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pehchan.map((pehchan) => (
                <tr key={pehchan._id}>
                  <td>
                    <img
                      src={pehchan?.image?.url || "/placeholder.svg"}
                      alt={pehchan.name}
                      className="h-10 w-10 object-cover rounded-full overflow-hidden"
                    />
                  </td>
                  <td className="font-medium text-gray-900 max-w-48 overflow-hidden">
                    {pehchan.name}
                  </td>
                  <td>{pehchan.village}</td>
                  <td>{pehchan.profession}</td>
                  <td>{pehchan.category}</td>
                  <td className="flex items-center gap-1">
                    <Heart size={14} className="text-red-400" />
                    {pehchan?.likes?.length || 0}
                  </td>
                  <td>{pehchan.shareCount || 0}</td>
                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusClass(
                        pehchan.status
                      )}`}
                    >
                      {pehchan.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedPehchan(pehchan);
                        }}
                        className="p-1 text-blue-500 hover:text-blue-700"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(pehchan._id, pehchan.name)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </motion.div>
    : <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.3 }}
             >
               <PehchanForm onCancel={() => setIsOpen(false)} pehchanToEdit={selectedPehchan}/>
             </motion.div>}
    </>
  );
}