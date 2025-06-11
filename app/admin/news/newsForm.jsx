'use client'
import { useState } from "react"
import { usePatel } from "../../../components/patelContext"
import { motion } from "framer-motion"


// Publish News Form Component
export default function PublishNewsForm({ onSubmit, onCancel }) {
 

  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const {path, user} = usePatel()
 const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    location: "",
    publisher_name: user?.fullname || "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.location || !formData.category) {
      alert("कृपया सभी आवश्यक फील्ड भरें");
      return;
    }

    setIsUploading(true);

    try {
      const token = localStorage.getItem('token');
      const submitFormData = new FormData();
      
      // Append all form fields
      submitFormData.append("title", formData.title);
      submitFormData.append("content", formData.content);
      submitFormData.append("location", formData.location);
      submitFormData.append("publisher_name", formData.publisher_name);
      submitFormData.append("category", formData.category);
      
      // Append image if exists
      if (imageFile) {
        submitFormData.append("image", imageFile);
      }
console.log(submitFormData);

      const response = await fetch(`${path}/api/news`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitFormData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit news");
      }

      // Call onSubmit callback if provided
      if (onSubmit) {
        await onSubmit(data);
      }
      
      // Reset form on success
      setFormData({
        title: "",
        content: "",
        category: "",
        location: "",
        publisher_name: user?.fullname || "",
      });
      setImageFile(null);

    } catch (error) {
      console.error("Error submitting news:", error);
      alert(error.message || "समाचार प्रकाशित करने में त्रुटि हुई");
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Category options matching your schema
  const categories = [
    { value: "Accident", label: "दुर्घटना" },
    { value: "Farming", label: "कृषि" },
    { value: "Weather", label: "मौसम" },
    { value: "Good", label: "अच्छी खबर" },
    { value: "Bad", label: "बुरी खबर" },
    { value: "Samaj", label: "समाज" },
    { value: "Technology", label: "तकनीक" },
    { value: "Market", label: "बाजार" },
    { value: "Education", label: "शिक्षा" },
    { value: "Health", label: "स्वास्थ्य" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Field */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          समाचार शीर्षक *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="समाचार का शीर्षक लिखें..."
        />
      </div>

      {/* Content Field */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          समाचार विवरण *
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="समाचार का पूरा विवरण..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Location Field */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            स्थान *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="शहर, राज्य"
          />
        </div>

        {/* Publisher Name Field */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            प्रकाशक का नाम *
          </label>
          <input
            type="text"
            name="publisher_name"
            value={formData.publisher_name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="आपका नाम"
            readOnly={!!currentUser?.name}
          />
        </div>
      </div>

      {/* Category Field */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          श्रेणी *
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">श्रेणी चुनें</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Image Upload Field */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          समाचार छवि
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
            <span className="text-sm font-medium">
              {imageFile ? imageFile.name : "छवि चुनें"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {imageFile && (
            <button
              type="button"
              onClick={() => setImageFile(null)}
              className="text-red-500 hover:text-red-700"
            >
              हटाएं
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <motion.button
          type="submit"
          disabled={isUploading}
          className={`flex-1 py-3 px-6 rounded-lg font-bold transition-colors ${
            isUploading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
          whileHover={{ scale: isUploading ? 1 : 1.02 }}
          whileTap={{ scale: isUploading ? 1 : 0.98 }}
        >
          {isUploading ? "प्रकाशित हो रहा है..." : "प्रकाशित करें"}
        </motion.button>

        <motion.button
          type="button"
          onClick={onCancel}
          disabled={isUploading}
          className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          रद्द करें
        </motion.button>
      </div>
    </form>
  );
}