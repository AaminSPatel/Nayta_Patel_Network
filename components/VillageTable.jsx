"use client";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye, MapPin, Users, School } from "lucide-react";
import { usePatel } from "./patelContext";
import { FaMosque, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function VillageTable() {
  const { villages, setVillages, path } = usePatel();
  const [selectedVillage, setSelectedVillage] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditClick = (village) => {
    console.log("selected village data", village);
    setSelectedVillage(village);
    setModalOpen(true);
  };
/* 
  const handleUpdate = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${path}/api/villages/${updatedData._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedData, // This should be FormData when sending files
      });

      if (!res.ok) throw new Error("Failed to update");

      const updatedVillage = await res.json();
      const updatedVillages = villages.map((v) =>
        v._id === updatedVillage._id ? updatedVillage : v
      );
      setVillages(updatedVillages);
      setModalOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
 */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this village?"
    );
    if (!confirmDelete) return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(path + `/api/villages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete");

      const updatedVillages = villages.filter((v) => v._id !== id);
      setVillages(updatedVillages);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
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
            <th scope="col">Name</th>
            <th scope="col">Tehsil/PinCode</th>
            <th scope="col">Leaders</th>
            <th scope="col">Location</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {villages.map((village) => (
            <tr key={village._id}>
              <td>
                <img
                  src={village?.images?.[0]?.url || "/placeholder.svg"}
                  alt={village.name}
                  className="h-10 w-16 object-cover rounded"
                />
              </td>
              <td className="font-medium text-gray-900  max-w-56 overflow-hidden bg-amber-50">
                <div className="flex flex-col juctify-center">
                  <span>{village.name}</span>
                  <span className="flex items-center gap-1">
                    <Users size={14} className="text-gray-400" />
                    {village.population}
                  </span>
                </div>
              </td>

              <td className="capitalize">
                <div className="flex flex-col juctify-center">
                  <span>Pin-{village.pin}</span>
                  Teh-{village.tahsil}
                </div>
              </td>
              <td className="capitalize">
                <div className="flex flex-col juctify-center">
                  <span>Sar-{village.headOfVillage}</span>
                  Amb- {village?.ambassador?.fullname}
                </div>
              </td>
              <td>
                <div className="flex flex-col items-start">

                <span className="flex items-center gap-1 max-w-56 overflow-hidden">
                  <MapPin size={14} className="text-gray-400" />
                  {village.name}
                </span>
               <div className="flex "> <span className="flex items-center justify-center gap-2 px-2 py-1 text-xs rounded-full">
                  <School size={16} className="text-yellow-400" />{" "}
                  {village.schools?.length || 0}
                </span>
                
                <span className="flex items-start justify-center gap-2 px-2 py-1 text-xs rounded-full">
                  <FaMosque size={16} className="text-green-400" />{" "}
                  {village.mosque?.length || 0}
                </span></div>
                </div>
              </td>
             
              <td>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Eye size={16} />
                  </button>
                  <button
                    className="p-1 text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditClick(village)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="p-1 text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(village._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <VillageFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
       
        initialData={selectedVillage}
      />
    </motion.div>
  );
}

 function VillageFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const { path, setVillages, villages } = usePatel();
  
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    info: "",
    location: "",
    population: "",
    district: "",
    tahsil: "",
    pin: "",
    headOfVillage: "",
    mosque: [],
    schools: [],
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  useEffect(() => {
    if (initialData) {
      const fixArrayField = (field) => {
        if (!Array.isArray(field)) return [];
        if (field.length === 0) return [];
        if (typeof field[0] === "string" && field[0].startsWith("[")) {
          try {
            return JSON.parse(field[0]).filter((item) => item !== "");
          } catch {
            return field.filter((item) => item !== "");
          }
        }
        return field.filter((item) => item !== "");
      };

      setFormData({
        _id: initialData._id || "",
        name: initialData.name || "",
        info: initialData.info || "",
        location: initialData.location || "",
        tahsil: initialData.tahsil || "",
        population: initialData.population || "",
        pin: initialData.pin || "",
        district: initialData.district || "",
        headOfVillage: initialData.headOfVillage || "",
        mosque: fixArrayField(initialData.mosque || []),
        schools: fixArrayField(initialData.schools || []),
      });
      setExistingImages(initialData.images || []);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    const items = value.split(",").map((item) => item.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, [field]: items }));
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setImages((prev) => [...prev, ...selected]);
  };

  const handleImageDelete = (imageId) => {
    if (imageId) {
      console.log(imageId);
      console.log(existingImages);

      setImagesToDelete((prev) => [...prev, imageId]);
      setExistingImages((prev) => prev.filter((img) => img.public_id !== imageId));
    }
    console.log(existingImages);
    
  };

  const removeNewImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "mosque" || key === "schools") {
          value.forEach(item => formDataToSend.append(key, item));
        } else if (key !== "_id" && key !== "images") {
          formDataToSend.append(key, value);
        }
      });

      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      if (imagesToDelete.length > 0) {
        formDataToSend.append("imagesToDelete", JSON.stringify(imagesToDelete));
      }

      const response = await fetch(`${path}/api/villages/${formData._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      console.log(formDataToSend);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }

      const updatedVillage = await response.json();
      setVillages(villages.map(v => v._id === updatedVillage._id ? updatedVillage : v));

      setImages([]);
      setImagesToDelete([]);
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      alert(`Update failed: ${error.message}`);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Update Village</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            "name", "info", "location", "tahsil", "district", "pin", "population", "headOfVillage",
          ].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={field !== "headOfVillage"}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">Mosque (comma separated)</label>
            <input
              value={formData.mosque.join(", ")}
              onChange={(e) => handleArrayChange(e, "mosque")}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Schools (comma separated)</label>
            <input
              value={formData.schools.join(",")}
              onChange={(e) => handleArrayChange(e, "schools")}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Existing Images</label>
            <div className="flex flex-wrap gap-2">
              {existingImages.map((image) => (
                <div key={image._id} className="relative">
                  <img src={image.url} alt="Village" className="h-16 w-16 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(image.public_id)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs cursor-pointer"
                  >
                    <FaTimes className=""/>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Add New Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full border px-3 py-2 rounded"
            />
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="Preview"
                      className="h-16 w-16 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

