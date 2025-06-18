"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Upload, MapPin, Users, Calendar } from "lucide-react"
import { usePatel } from "./patelContext"

export default function VillageForm({ onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    info: "",
    location: "",
    population: "",
    mosque: [],
    schools: [],
    headOfVillage: "",
    district: "",
    tahsil: "",
    pin: "",
    images: [],
  })
   const {path,fetchVillages }  = usePatel()
  const [imageFiles, setImageFiles] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (e, fieldName) => {
    const values = e.target.value.split(",").map((v) => v.trim())
    setFormData((prev) => ({ ...prev, [fieldName]: values }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles(files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    imageFiles.forEach((file) => data.append("images", file))

    // Add non-file fields
    data.append("name", formData.name)
    data.append("info", formData.info)
    data.append("location", formData.location)
    data.append("population", formData.population)
    data.append("headOfVillage", formData.headOfVillage)
    data.append("district", formData.district)
    data.append("tahsil", formData.tahsil)
    data.append("pin", formData.pin)
    formData.mosque.forEach((m) => data.append("mosque", m))
    formData.schools.forEach((s) => data.append("schools", s))
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(path + "/api/villages", {
        method: "POST",
        body: data,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      //if (!res.ok) throw new Error("Failed to save village")
console.log('sending this data');

       await res.json()
      //console.log("Saved village:", result)
      onCancel()
      fetchVillages()
    } catch (err) {
      console.error("Error submitting form:", err)
    }
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Add New Village</h3>
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Village Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
 
          <div>
            <label className="form-label">Location</label>
            <div className="relative">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-input pl-10"
                required
              />
              <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
          <div>
            <label className="form-label">PinCode</label>
            <div className="relative">
              <input
                type="text"
                name="pin"
                value={formData.pin}
                onChange={handleChange}
                className="form-input pl-10"
                required
              />
            </div>
          </div>  <div>
            <label className="form-label">Tahsil</label>
            <div className="relative">
              <input
                type="text"
                name="tahsil"
                value={formData.tahsil}
                onChange={handleChange}
                className="form-input pl-10"
                required
              />
            </div>
          </div>
          <div>
            <label className="form-label">District</label>
            <div className="relative">
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="form-input pl-10"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="form-label">Population</label>
            <div className="relative">
              <input
                type="number"
                name="population"
                value={formData.population}
                onChange={handleChange}
                className="form-input pl-10"
                required
              />
              <Users className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label className="form-label">Mosques (comma separated)</label>
            <input
              type="text"
              onChange={(e) => handleArrayChange(e, "mosque")}
              className="form-input"
              placeholder="e.g. Jamia Masjid, Badi Masjid"
            />
          </div>

          <div>
            <label className="form-label">Schools (comma separated)</label>
            <input
              type="text"
              onChange={(e) => handleArrayChange(e, "schools")}
              className="form-input"
              placeholder="e.g. Govt School, Private School"
            />
          </div>
        </div>

        <div>
          <label className="form-label">Head of Village</label>
          <input
            type="text"
            name="headOfVillage"
            value={formData.headOfVillage}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div>
          <label className="form-label">Village Information</label>
          <textarea
            name="info"
            value={formData.info}
            onChange={handleChange}
            className="form-input min-h-[120px]"
            placeholder="Detailed village description"
            required
          />
        </div>

        <div>
          <label className="form-label">Upload Images</label>
          <div className="border border-dashed border-gray-300 rounded-lg p-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload size={24} className="text-gray-400" />
              <p className="text-sm text-gray-500">You can select multiple images</p>
              <input
                type="file"
                multiple
                name="images"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                id="images"
              />
              <button
                type="button"
                onClick={() => document.getElementById("images").click()}
                className="btn btn-outline text-sm py-1"
              >
                Select Images
              </button>
              {imageFiles.length > 0 && (
                <ul className="text-sm text-green-600">
                  {imageFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onCancel} className="btn btn-outline">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Village
          </button>
        </div>
      </form>
    </motion.div>
  )
}
