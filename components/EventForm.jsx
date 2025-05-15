"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { X, Upload, Calendar, Clock, MapPin } from "lucide-react"
import axios from "axios"
import { usePatel } from "./patelContext"

export default function EventForm({ onCancel, onSuccess }) {
  const [formData, setFormData] = useState({
    eventName: "",
    location: "",
    date: "",
    time: "", // Combined time field instead of start/end time
    type: "",
    content: "",
    organizer: "",
    attendees: 0,
    eventStatus: "Upcoming",
    image: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {path} = usePatel()
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
  console.log('image is selected');
  
    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, etc.)');
      return;
    }
  
    // Validate file size (e.g., 5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB');
      return;
    }
  console.log('image ois set to formdata');
  
    setFormData(prev => ({ ...prev, image: file }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      // Verify image is selected if required
      if (!formData.image) {
        throw new Error('Please select an image');
      }
  
      // Create FormData object
      const formDataToSend = new FormData();
  
      // Append all fields including the image file
      formDataToSend.append('eventName', formData.eventName);
      formDataToSend.append('date', new Date(formData.date).toISOString());
      formDataToSend.append('time', formData.time);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('organizer', formData.organizer);
      formDataToSend.append('eventStatus', formData.eventStatus);
      formDataToSend.append('attendees', formData.attendees);

     /*  // Append attendees array
      formData.attendees.forEach(attendee => {
        formDataToSend.append('attendees', attendee);
      }); */
  console.log(formData.image);
  
      // Append the image file
      formDataToSend.append('image', formData.image);
      
      for (let pair of formDataToSend.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      
      const token = localStorage.getItem('token');
  //console.log(formDataToSend,'data to send is here');
  
    
      const response = await fetch(path + '/api/events', {
        method: "POST",
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${token}`
          // DO NOT set Content-Type here for FormData!
        }
      });
      
       if (response.status === 201) {
       // onCancel();
      } 
    } catch (err) {
      console.error('Error creating event:', err);
      setError(err.response?.data?.message || err.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Add New Event</h3>
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="eventName" className="form-label">
              Event Name *
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter event name"
              required
            />
          </div>

          <div>
            <label htmlFor="type" className="form-label">
              Event Type *
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Conference, Workshop"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className="form-label">
              Location *
            </label>
            <div className="relative">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-input pl-10"
                placeholder="Enter event location"
                required
              />
              <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label htmlFor="organizer" className="form-label">
              Organizer *
            </label>
            <input
              type="text"
              id="organizer"
              name="organizer"
              value={formData.organizer}
              onChange={handleChange}
              className="form-input"
              placeholder="Event organizer"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="form-label">
              Date *
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input pl-10"
                required
              />
              <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label htmlFor="time" className="form-label">
              Time *
            </label>
            <div className="relative">
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="form-input pl-10"
                required
              />
              <Clock className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="content" className="form-label">
            Event Description *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-input min-h-[150px]"
            placeholder="Detailed description of the event"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="attendees" className="form-label">
              Expected Attendees (comma separated)
            </label>
            <input
              type="num"
              id="attendees"
              name="attendees"
              value={formData.attendees}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., 100, 150, 200"
            />
          </div>

          <div>
            <label htmlFor="eventStatus" className="form-label">
              Status
            </label>
            <select
              id="eventStatus"
              name="eventStatus"
              value={formData.eventStatus}
              onChange={handleChange}
              className="form-input"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div>
        {formData.image && (
  <div className="mt-2">
    <img 
      src={URL.createObjectURL(formData.image)} 
      alt="Preview" 
      className="h-32 object-cover rounded"
    />
    <p className="text-sm text-green-600 mt-1">
      {formData.image.name} ({(formData.image.size / 1024).toFixed(1)} KB)
    </p>
  </div>
)}
          <label htmlFor="image" className="form-label">
            Event Image
          </label>
          <div className="border border-dashed border-gray-300 rounded-lg p-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload size={24} className="text-gray-400" />
              <p className="text-sm text-gray-500">Drag & drop an image or click to browse</p>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <button
                type="button"
                onClick={() => document.getElementById("image").click()}
                className="btn btn-outline text-sm py-1"
              >
                Select Image
              </button>
              {formData.image && (
                <p className="text-sm text-green-600">
                  {formData.image.name || "Image selected"}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </motion.div>
  )
}