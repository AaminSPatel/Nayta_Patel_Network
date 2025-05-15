'use client'

import { useState } from "react";
import { FaQuoteLeft, FaSearch, FaFilter } from "react-icons/fa";
import { usePatel } from "../../components/patelContext";
import Head from "next/head"

// Sample data
const successStories = [
  {
    id: 1,
    name: "Imran Ali",
    age: 45,
    village: "Chandpur",
    category: "Farming",
    image: "/p5.avif",
    story:
      "I used to struggle with traditional farming methods, barely making enough to feed my family. After joining the Apna Gaon Network, I learned about organic farming techniques and government subsidies for solar irrigation. Today, I'm the district's top organic producer, supplying vegetables to three nearby cities. My income has tripled, and I've been able to send my children to college. The training from Apna Gaon changed my life.",
    quote:
      "From struggling farmer to district's top organic producer - all thanks to the knowledge shared in our community.",
  },
  // Add other stories similarly
];


export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedStory, setExpandedStory] = useState(null);
 const {stories,siteUrl}  = usePatel()
   const categories = [...new Set(stories.map((story) => story.category))];
const villages = [...new Set(stories.map((story) => story.location))];

  const filteredStories = stories.filter((story) => {
    return (
      (selectedCategory === "" || story.category === selectedCategory) &&
      (selectedVillage === "" || story.location === selectedVillage) &&
      (searchTerm === "" ||
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <Head>
  <title>Success Stories | Farmers & Villages Transforming Together</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="theme-color" content="#4CAF50" />
  <meta name="description" content="Read real stories from farmers and villages empowered through better farming, milk production, and samaj unity in MP." />
  <meta name="keywords" content="success stories, farmer progress, village case studies, kisano ki kahani, gaon ki safalta, Nayta Patel Samaj" />
  <meta name="author" content="Nayta Patel Network" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={`${siteUrl}/success-stories`} />
  <meta property="og:title" content="Success Stories | Empowering Villages Through Agriculture" />
  <meta property="og:description" content="Stories of transformation from the fields of Madhya Pradesh." />
  <meta property="og:image" content={`${siteUrl}/success.jpg`} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={`${siteUrl}/success-stories`} />
  <meta name="twitter:title" content="Real Success Stories | Farming & Rural Growth" />
  <meta name="twitter:description" content="Learn how farmers changed their lives through our platform." />
  <meta name="twitter:image" content={`${siteUrl}/success.jpg`} />

  <link rel="canonical" href={`${siteUrl}/success-stories`} />
  <link rel="icon" href={`${siteUrl}/favicon.ico`} />
</Head>

      <h1 className="text-3xl font-bold mb-2">Success Stories</h1>
      <p className="text-gray-600 mb-8">
        Real stories of transformation and progress from our community members. These stories inspire and show the
        power of community-driven change.
      </p>
{/* Filters */}
<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
  <div className="flex items-center mb-6">
    <FaFilter className="text-emerald-500 mr-3 text-2xl" />
    <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 p-3"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
      <select
        value={selectedVillage}
        onChange={(e) => setSelectedVillage(e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 p-3"
      >
        <option value="">All Villages</option>
        {villages.map((village) => (
          <option key={village} value={village}>
            {village}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search stories..."
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 pl-10 p-3"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  </div>
</div>

      {/* Stories Grid */}
      {filteredStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, index) => (
            <div
              key={story._id}
              className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-all transform"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={story.image?.url || "/placeholder.svg"}
                  alt={story.title}
                  className="object-cover w-full h-full hover:scale-105 transition duration-500"
                />
                <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {story.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  {/* <div className="flex items-start mb-4">
                    <FaQuoteLeft className="text-emerald-500 text-2xl mr-2 mt-1" />
                    <p className="italic text-gray-700">{story.quote}</p>
                  </div> */}
                  <h3 className="font-bold text-xl mb-1">{story.title}</h3>
                </div>
                <div className="flex justify-between mt-4">
                
                  <p className="text-gray-500 text-sm hidden">Age: {story.age}</p>
                </div>
                {expandedStory === story._id ? (
                  <div className="mt-4 p-4 border-t border-gray-200">
                    <p>{story.content}</p>
                  </div>
                ): (
                  <div classname='flex items-center justify-center h-full'><p className="text-gray-700 line-clamp-6">{story.content}</p></div>
                )}  
                <button
                    onClick={() =>
                      setExpandedStory(expandedStory === story._id ? null : story._id)
                    }
                    className="text-emerald-500 hover:underline"
                  >
                    {expandedStory === story._id ? "Collapse" : "Read more"}
                  </button>
              </div>
              
            </div>
            
          ))}
          
        </div>
      ) : (
        <p>No stories found.</p>
      )}
    </div>
  );
}
