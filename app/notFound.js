import { Suspense } from 'react';

export default function NotFound() {
  return (
    <Suspense fallback={<Loader />}>
      <NotFoundContent />
    </Suspense>
  );
}

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="relative w-24 h-24 mb-6">
        {/* Emerald and yellow spinner */}
        <div className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-spin border-t-yellow-400 border-r-yellow-400"></div>
        <div className="absolute inset-2 border-4 border-emerald-500 rounded-full animate-spin border-b-yellow-400 border-l-yellow-400 animation-delay-200"></div>
      </div>
      <h1 className="text-3xl font-semibold text-black">Nayta Patel Network</h1>
    </div>
  );
}

function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-black mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-gray-600">The page you&apos;re looking for doesn&apos;t exist.</p>
    </div>
  );
}