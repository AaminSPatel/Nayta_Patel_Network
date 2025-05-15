'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePatel } from "../../components/patelContext";
import { FaMosque, FaSchool } from "react-icons/fa";
import Head from "next/head"

/* const villages = [
  {
    id: 1,
    name: "Village A",
    intro: "This is Village A, known for its scenic beauty.",
    location: "State XYZ, District ABC",
    population: 1500,
    head: "Mr. John Doe",
    photo: "/villageA.jpg", // Replace with actual image paths
  },
  {
    id: 2,
    name: "Village B",
    intro: "Village B is famous for its agriculture.",
    location: "State PQR, District XYZ",
    population: 2000,
    head: "Mr. James Smith",
    photo: "/villageB.jpg", // Replace with actual image paths
  },
  // Add more village data as needed
];
 */

const DirectoryPage = () => {
  const {villages,siteUrl} = usePatel();
  const [filter, setFilter] = useState("");
  const [filteredVillages, setFilteredVillages] = useState([]);
useEffect(()=>{
  setFilteredVillages(villages)
},[villages])
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setFilteredVillages(
      villages.filter((village) =>
        village.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Village Directory</h1>
<Head>
  <title>Village Directory | 250+ MP Villages Farming & Nayta Patel Info</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="theme-color" content="#4CAF50" />
  <meta name="description" content="Explore details of 250+ villages from Indore, Ujjain, Dewas, Ratlam & Dhar including farming patterns, milk production, mandi access, and more." />
  <meta name="keywords" content="village list, MP villages, farming data, gaon directory, Nayta Patel gaon, kisani villages, gaon ki jankari" />
  <meta name="author" content="Nayta Patel Network" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={`${siteUrl}/directory`} />
  <meta property="og:title" content="MP Village Directory | Kisani & Samaj Info" />
  <meta property="og:description" content="Find agricultural data and community info of over 250 villages." />
  <meta property="og:image" content={`${siteUrl}/directory.jpg`} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={`${siteUrl}/directory`} />
  <meta name="twitter:title" content="Village Directory | 250+ MP Farming Villages" />
  <meta name="twitter:description" content="Explore milk production, mandi data, and kisani updates of your village." />
  <meta name="twitter:image" content={`${siteUrl}/directory.jpg`} />

  <link rel="canonical" href={`${siteUrl}/directory`} />
  <link rel="icon" href={`${siteUrl}/favicon.ico`} />
</Head>

      {/* Filter Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a village..."
          value={filter}
          onChange={handleFilterChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      {/* Village List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVillages.map((village) => (
          <div
            key={village._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <Image
                src={village?.images[0]?.url}
                alt={village?.name}
                width={600}
                height={400}
                className="w-full object-cover h-48"
              />
              <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded-lg">
                <h3 className="text-xl font-medium">{village?.name}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-2 line-clamp-3 min-h-12">{village.info}</p>
              <p className="text-gray-500 text-sm flex items-center gap-2">
                <FaMosque/>
                <strong>Mosque: </strong>{village?.mosque	}
              </p>
               <p className="text-gray-500 text-sm flex items-center gap-2">
                <FaSchool/>
                <strong>Schools: </strong>{village?.schools	}
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Population: </strong>{village?.population}
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Head of Village: </strong>{village.headOfVillage}
              </p>

              {/* View Details Button */}
              <Link href={`/village/${village._id}`}>
              <button
                className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
               
              >
                View Details
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectoryPage;
