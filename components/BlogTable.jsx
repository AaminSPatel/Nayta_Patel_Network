"use client"
import { useState } from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import { usePatel } from "./patelContext";
import { motion } from "framer-motion";

const UpdateBlogModal = ({ blog, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: blog.title,
    content: blog.content,
    tags: blog.tags.join(','), // Convert array to comma-separated string for input
    category: blog.category || '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(blog.image?.url || '');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('tags', formData.tags.split(',').map(tag => tag.trim()).join(','));
      formDataToSend.append('category', formData.category);
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      } else if (blog.image?.public_id) {
        // Keep existing image if no new file is selected
        formDataToSend.append('public_id', blog.image.public_id);
      }

      await onUpdate(blog._id, formDataToSend);
      onClose();
    } catch (error) {
      console.error('Update failed:', error);
      setErrors({ submit: 'Failed to update blog. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Update Blog</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content*</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full p-2 border rounded ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {(previewUrl || blog.image?.url) && (
                  <div className="mt-2">
                    <img 
                      src={previewUrl || blog.image?.url} 
                      alt="Preview" 
                      className="h-20 object-cover rounded" 
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {imageFile ? 'New image selected' : 'Current image'}
                    </p>
                  </div>
                )}
              </div>

              {errors.submit && (
                <p className="text-red-500 text-sm">{errors.submit}</p>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update Blog'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function BlogTable() {
  const { blogs, formatDate, updateBlog ,path,setBlogs,timeAgo } = usePatel();
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
  };
  const handleBlogDelete = async (id) => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch(`${path}/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }
  
      const updatedBlogs = await response.json(); // This is the updated blog list
      setBlogs(updatedBlogs); // Update blog state with new list
      console.log('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  };
  
  const handleUpdate = async (id, updatedData) => {
    // Call your API to update the blog
    await updateBlog(id, updatedData);
  };

  return (
    <>
<motion.div
      className="table-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >        <table className="admin-table">
      <thead className="bg-gray-50">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Author</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>        <tbody className="bg-white divide-y divide-gray-200">
          {blogs.map((blog) => (
            <tr key={blog._id}>
              {/* ... other table cells ... */}
              <td>
                <img
                  src={blog.image?.url || "/placeholder.svg"}
                  alt={blog?.title}
                  className="h-10 w-16 object-cover rounded"
                />
              </td>
              <td className="font-medium text-gray-900">{blog?.title}</td>
              <td>{blog?.tags[0]}</td>
              <td>{blog?.author._id}</td>
              <td>{timeAgo(blog?.date)}</td>
              
              <td>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => handleEditClick(blog)} 
                    className="p-1 text-blue-500 hover:text-blue-700"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                  onClick={()=> handleBlogDelete(blog._id)}
                  className="p-1 text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </motion.div>

      {selectedBlog && (
        <UpdateBlogModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}



