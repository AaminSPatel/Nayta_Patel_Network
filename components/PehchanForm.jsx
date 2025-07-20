"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Upload, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePatel } from "./patelContext";

export default function PehchanForm({ onCancel, pehchanToEdit }) {
  const [formData, setFormData] = useState({
    name: "",
    village: "",
    profession: "",
    story: "",
    quote: "",
    mobile: "",
    father: "",
    whatsappNumber: "",
    category: "Business",
    image: null,
    existingImage: null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { path ,fetchPehchan} = usePatel();

  // Initialize form with pehchan data if editing
  useEffect(() => {
    if (pehchanToEdit) {
      setFormData({
        name: pehchanToEdit.name || "",
        village: pehchanToEdit.village || "",
        profession: pehchanToEdit.profession || "",
        story: pehchanToEdit.story || "",
        quote: pehchanToEdit.quote || "",
        mobile: pehchanToEdit.mobile || "",
        father: pehchanToEdit.father || "",
        whatsappNumber: pehchanToEdit.whatsappNumber || "",
        category: pehchanToEdit.category || "Business",
        image: null,
        existingImage: pehchanToEdit.image?.url || null
      });
    }
  }, [pehchanToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB");
      return;
    }
    setFormData((prev) => ({ ...prev, image: file }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Authentication required");
      setIsSubmitting(false);
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('village', formData.village);
      formPayload.append('profession', formData.profession);
      formPayload.append('story', formData.story);
      formPayload.append('quote', formData.quote);
      formPayload.append('mobile', formData.mobile);
      formPayload.append('father', formData.father);
      formPayload.append('whatsappNumber', formData.whatsappNumber);
      formPayload.append('category', formData.category);
      
      if (formData.image) {
        formPayload.append('image', formData.image);
      }

      const url = pehchanToEdit 
        ? `${path}/api/pehchan/${pehchanToEdit._id}`
        : `${path}/api/pehchan`;

      const method = pehchanToEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formPayload
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save pehchan');
      }

      const result = await response.json();
      setSuccess(pehchanToEdit ? 'Profile updated successfully!' : 'Profile created successfully!');
      
      // Refresh and close after 1.5 seconds
      setTimeout(() => {
        router.refresh();
        fetchPehchan();
        onCancel();
      }, 1500);

    } catch (err) {
      setError(err.message || 'Failed to save profile');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
const professions = [
  // Construction and Trades
  "Construction Worker",
  "Carpenter",
  "Electrician",
  "Plumber",
  "Mason",
  "Welder",
  "Roofer",
  "Painter",
  "HVAC Technician",
  "Heavy Equipment Operator",
  "Construction Manager",
  "Surveyor",
  "Ironworker",
  "Drywall Installer",
  "Glazier",
  
  // Farming and Agriculture
  "Farmer",
  "Agricultural Worker",
  "Farm Manager",
  "Rancher",
  "Dairy Farmer",
  "Poultry Farmer",
  "Beekeeper",
  "Tractor Operator",
  "Irrigation Specialist",
  "Agricultural Engineer",
  
  // Engineering
  "Civil Engineer",
  "Mechanical Engineer",
  "Electrical Engineer",
  "Chemical Engineer",
  "Software Engineer",
  "Structural Engineer",
  "Environmental Engineer",
  "Industrial Engineer",
  "Mining Engineer",
  "Petroleum Engineer",
  
  // Labor and Manufacturing
  "Factory Worker",
  "Assembly Line Worker",
  "Machine Operator",
  "Warehouse Worker",
  "Forklift Operator",
  "Janitor",
  "Landscaper",
  "Groundskeeper",
  "General Laborer",
  
  // Other Professions
  "Business Owner",
  "Artist",
  "Technician",
  "Driver",
  "Security Guard",
  "Other"
];
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">
          {pehchanToEdit ? 'Edit Profile' : 'Add New Profile'}
        </h3>
        <button 
          onClick={onCancel} 
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          disabled={isSubmitting}
        >
          <X size={20} />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Full name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-1">
              Village *
            </label>
            <input
              id="village"
              name="village"
              value={formData.village}
              onChange={handleChange}
              className="w-full border px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Village name"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
              Profession *
            </label>
            <input
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full border px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Profession"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
           <select
  id="category"
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
  required
  disabled={isSubmitting}
>
  <option value="">Select your profession</option>
  {professions.map((profession) => (
    <option key={profession} value={profession}>
      {profession}
    </option>
  ))}
</select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number *
            </label>
            <input
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Mobile number"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp Number
            </label>
            <input
              id="whatsappNumber"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="w-full border px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="WhatsApp number"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label htmlFor="father" className="block text-sm font-medium text-gray-700 mb-1">
            Father's Name
          </label>
          <input
            id="father"
            name="father"
            value={formData.father}
            onChange={handleChange}
            className="w-full border px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Father's name"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-1">
            Story *
          </label>
          <textarea
            id="story"
            name="story"
            value={formData.story}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[150px]"
            placeholder="Tell your story..."
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="quote" className="block text-sm font-medium text-gray-700 mb-1">
            Quote
          </label>
          <textarea
            id="quote"
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[80px]"
            placeholder="Inspirational quote (optional)"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Image
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
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => document.getElementById("image").click()}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Select Image
              </button>
              
              {formData.existingImage && !formData.image && (
                <div className="mt-2">
                  <img 
                    src={formData.existingImage} 
                    alt="Current profile" 
                    className="h-20 w-20 object-cover rounded-full"
                  />
                </div>
              )}
              
              {formData.image && (
                <p className="mt-2 text-sm text-green-600">
                  New image selected: {formData.image.name}
                </p>
              )}
              
              <p className="text-xs text-gray-500 mt-2">Max size: 5MB</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center min-w-[120px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Saving...
              </>
            ) : pehchanToEdit ? 'Update Profile' : 'Save Profile'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}