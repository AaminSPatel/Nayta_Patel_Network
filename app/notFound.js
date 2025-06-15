import { Suspense } from 'react';

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}

function NotFoundContent() {
  // Your existing 404 page content
  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  );
}