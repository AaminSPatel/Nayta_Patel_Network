import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const villageData = [
  {
    id: 1,
    name: 'Village A',
    intro: 'This is Village A, known for its scenic beauty and cultural heritage.',
    location: 'State XYZ, District ABC',
    population: 1500,
    head: 'Mr. John Doe',
    photo: '/villageA.jpg',
    locationIframe: 'https://www.google.com/maps/embed?pb=...embed-link-for-village-A', // iframe src for map
    details: 'This village is home to a rich history and a vibrant community. The agriculture sector is the backbone of its economy.',
  },
  {
    id: 2,
    name: 'Village B',
    intro: 'Village B is famous for its agriculture and picturesque landscapes.',
    location: 'State PQR, District XYZ',
    population: 2000,
    head: 'Mr. James Smith',
    photo: '/villageB.jpg',
    locationIframe: 'https://www.google.com/maps/embed?pb=...embed-link-for-village-B', // iframe src for map
    details: 'Village B is known for its organic farming and sustainable practices. The village has a thriving local market.',
  },
  // Add more village data here
];

const VillageDetailPage = () => {
  const router = useRouter();
  const { villageId } = router.query;

  const village = villageData.find(v => v.id === parseInt(villageId));
  
  if (!village) return <p>Village not found!</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Hero Section with Village Image */}
      <div className="relative mb-6">
        <Image
          src={village?.images[0]?.url}
          alt={village.name}
          width={1200}
          height={500}
          className="w-full object-cover h-96"
        />
        <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 p-4 rounded-lg">
          <h1 className="text-3xl font-semibold">{village.name}</h1>
        </div>
      </div>

      {/* Detailed Information Section */}
      <div className="space-y-6">
        <p><strong>Introduction:</strong> {village.intro}</p>
        <p><strong>Location:</strong> {village.location}</p>
        <p><strong>Population:</strong> {village.population}</p>
        <p><strong>Head of Village:</strong> {village.head}</p>
        <p><strong>Details:</strong> {village.details}</p>
      </div>

      {/* Map Section using the iframe from the village data */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Village Location</h2>
        <div className="relative w-full h-80">
          <iframe
            src={village.locationIframe}
            width="100%"
            height="100%"
            style={{ border: '0' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VillageDetailPage;
