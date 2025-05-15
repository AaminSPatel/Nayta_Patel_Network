"use client"
import { useState, useEffect } from 'react'
import { X, Calendar, Clock, MapPin, Upload } from 'lucide-react'
import axios from 'axios'
import { usePatel } from './patelContext'

const UpdateEventModal = ({ event, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    time: '',
    type: '',
    content: '',
    location: '',
    organizer: '',
    attendees: [],
    eventStatus: 'Upcoming',
    image: null
  })
  const [previewImage, setPreviewImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {path} = usePatel()

  // Initialize form with event data
  useEffect(() => {
    if (event) {
      setFormData({
        eventName: event.eventName,
        date: event.time?.date ? new Date(event.time.date).toISOString().split('T')[0] : '',
        time: event?.time?.time || '',
        type: event.type,
        content: event.content,
        location: event.location,
        organizer: event.organizer,
        attendees: event.attendees || 0,
        eventStatus: event.eventStatus || 'Upcoming',
        image: null
      })
      setPreviewImage(event.image?.url || '')
    }
  }, [event])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleAttendeesChange = (e) => {
    const value = e.target.value
    const attendees = value.split(',').map(item => parseInt(item.trim())).filter(num => !isNaN(num))
    setFormData(prev => ({ ...prev, attendees }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('eventName', formData.eventName)
      formDataToSend.append('date', formData.date)
      formDataToSend.append('time', formData.time)
      formDataToSend.append('type', formData.type)
      formDataToSend.append('content', formData.content)
      formDataToSend.append('location', formData.location)
      formDataToSend.append('organizer', formData.organizer)
      formDataToSend.append('eventStatus', formData.eventStatus)
      formDataToSend.append('attendees', formData.attendees)
     /*  formData.attendees.forEach(attendee => {
        formDataToSend.append('attendees', attendee)
      }) */

      if (formData.image) {
        formDataToSend.append('image', formData.image)
      } else if (event.image?.public_id) {
        formDataToSend.append('public_id', event.image.public_id)
      }

      const token = localStorage.getItem('token')
      const response = await axios.put(
        `${path}/api/events/${event._id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if (response.status === 200) {
        onUpdate(response.data)
       // onClose()
      }
    } catch (err) {
      console.error('Update error:', err)
      setError(err.response?.data?.message || 'Failed to update event')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Update Event</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name*</label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type*</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded pl-10"
                    required
                  />
                  <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time*</label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded pl-10"
                    required
                  />
                  <Clock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded pl-10"
                    required
                  />
                  <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organizer*</label>
                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attendees (comma separated)</label>
                <input
                  type="num"
                  name='attendees'
                  value={formData.attendees}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="100, 150, 200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="eventStatus"
                  value={formData.eventStatus}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
              <div className="border border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload size={24} className="text-gray-400" />
                  <p className="text-sm text-gray-500">Drag & drop an image or click to browse</p>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    id="event-image-upload"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('event-image-upload').click()}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                  >
                    Select Image
                  </button>
                </div>
              </div>
              {previewImage && (
                <div className="mt-4">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="h-40 object-contain rounded-lg mx-auto"
                  />
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateEventModal