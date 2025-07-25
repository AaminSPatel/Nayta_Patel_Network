"use client";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye, Heart, Clock, EyeIcon } from "lucide-react";
import { usePatel } from "./patelContext";
import { useState } from "react";
import StoryForm from "./StoryForm";

export default function StoryTable() {
 const [isOpen, setIsOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(false);
  const { stories, formatDate, path } = usePatel();
  console.log(stories, "Stories");

  const getStatusClass = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete story of ${title}?`
    );
    if (!confirmDelete) return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(path + `/api/stories/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {" "}
          <StoryForm
            onCancel={() => setIsOpen(false)}
            storyToEdit={selectedStory}
          />
        </motion.div>
      ) : (
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
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">Location</th>
                <th scope="col">Date</th>
                <th scope="col">Likes</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stories.map((story) => (
                <tr key={story._id}>
                  <td>
                    <img
                      src={story?.image?.url || "/placeholder.svg"}
                      alt={story.title}
                      className="h-10 w-16 object-cover rounded overflow-hidden"
                    />
                  </td>
                  <td className="font-medium text-gray-900 max-w-48 overflow-hidden">
                    {story.title}
                  </td>
                  <td>{story.category}</td>
                  <td>{story?.location}</td>
                  <td>{formatDate(story.date)}</td>
                  <td className="flex items-center gap-1">
                    <EyeIcon size={14} className="text-gray-400" />
                    {story.views}
                  </td>
                  <td className="flex items-center gap-1">
                    <Heart size={14} className="text-red-400" />
                    {story?.likes?.length}
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusClass(
                        story.status
                      )}`}
                    >
                      {story.status}
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
                          setSelectedStory(story);
                        }}
                        className="p-1 text-blue-500 hover:text-blue-700"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(story._id, story.title)}
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
      )}
    </>
  );
}
