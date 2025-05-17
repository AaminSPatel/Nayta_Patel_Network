"use client";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye, Heart, Clock, EyeIcon } from "lucide-react";
import { usePatel } from "./patelContext";
import { useState } from "react";
import StoryForm from "./StoryForm";

export default function StoryTable() {
  /*  const stories = [
    {
      id: 1,
      title: "From Struggle to Success: My Journey",
      category: "Success Stories",
      author: "John Doe",
      date: "2023-06-15",
      duration: "5 min read",
      likes: 45,
      status: "Published",
      image: "/placeholder.svg?height=40&width=60",
    },
    {
      id: 2,
      title: "How Our Community Changed My Life",
      category: "Community Stories",
      author: "Jane Smith",
      date: "2023-06-14",
      duration: "8 min read",
      likes: 32,
      status: "Published",
      image: "/placeholder.svg?height=40&width=60",
    },
    {
      id: 3,
      title: "Building a Sustainable Village Together",
      category: "Community Stories",
      author: "Mike Johnson",
      date: "2023-06-13",
      duration: "6 min read",
      likes: 28,
      status: "Draft",
      image: "/placeholder.svg?height=40&width=60",
    },
    {
      id: 4,
      title: "My First Year as a Member",
      category: "Member Stories",
      author: "Sarah Williams",
      date: "2023-06-12",
      duration: "4 min read",
      likes: 67,
      status: "Published",
      image: "/placeholder.svg?height=40&width=60",
    },
    {
      id: 5,
      title: "Transforming Challenges into Opportunities",
      category: "Success Stories",
      author: "Robert Brown",
      date: "2023-06-11",
      duration: "7 min read",
      likes: 42,
      status: "Draft",
      image: "/placeholder.svg?height=40&width=60",
    },
  ] */
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
