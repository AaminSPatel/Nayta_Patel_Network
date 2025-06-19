'use client';
import { useEffect } from 'react';

export default function AdUnit({ slotId, layout, format = 'auto', className = '' }) {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-layout={layout}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}