"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Edit, Trash2, Eye, MapPin, Clock } from "lucide-react"
import { usePatel } from "./patelContext"
import { useState } from "react"
import UpdateEventModal from "./UpdateEventModal" // Import the modal

export default function EventTable() {
  const { events, path } = usePatel()
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)


  const handleUpdate = (updatedEvent) => {
    // Handle the updated event in your context
    console.log("Event updated:", updatedEvent)
    setShowUpdateModal(false)
  }

  async function deleteEvent(id) {
    try {
      const token = localStorage.getItem('token')
      await fetch(path + `/api/events/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <motion.div
        className="table-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <table className="admin-table">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Event</th>
            <th scope="col">Location</th>
            <th scope="col">Date & Time</th>
            <th scope="col">Organizer</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event._id}>
<td>
                <img
                  src={event?.image?.url || "/placeholder.svg"}
                  alt={event.eventName}
                  className="h-10 w-16 object-cover rounded overflow-hidden"
                />
              </td>
              <td className="font-medium text-gray-900">{event.eventName}</td>
              <td className="flex items-center gap-1">
                <MapPin size={14} className="text-gray-400" />
                {event.location}
              </td>
              <td>
                <div className="flex flex-col">
                  <span>{event.formattedDate}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} />
                    {event.formattedTime}
                  </span>
                </div>
              </td>
              <td>
                <span className={`px-2 py-1 text-xs rounded-full`}>{event.organizer}</span>
              </td>                <td>
                  <div className="flex space-x-2">
                    <button className="p-1 cursor-pointer text-gray-500 hover:text-gray-700">
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedEvent(event)
                        setShowUpdateModal(true)
                      }}
                      className="p-1 cursor-pointer text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => deleteEvent(event._id)} 
                      className="p-1 cursor-pointer text-red-500 hover:text-red-700"
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

      <AnimatePresence>
        {showUpdateModal && selectedEvent && (
          <UpdateEventModal
            event={selectedEvent}
            onClose={() => setShowUpdateModal(false)}
            onUpdate={handleUpdate}
          />
        )}
      </AnimatePresence>
    </>
  )
}

