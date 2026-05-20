"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script"; // Imported for safe script injection
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const sampleAds = [
  {
    id: 1,
    title: "Book Karo",
    description: "अपनी सभी सर्विसेज बुक करें। आज ही डाउनलोड करें Book Karo!",
    image: "/bookkaro.jpg",
    link: "https://play.google.com/store/apps/details?id=com.multiservice.service.multiservice",
    cta: "Install Now",
    bgColor: "bg-white",
    textColor: "text-emerald-800",
  }
];

export default function AdSection() {
  const [ads, setAds] = useState(sampleAds);
  const [showAds, setShowAds] = useState(true);
  const [adDismissed, setAdDismissed] = useState(false);
  const [adScriptLoaded, setAdScriptLoaded] = useState(false);

  // Check if user has dismissed ads
  useEffect(() => {
    const isDismissed = localStorage.getItem("adsDismissed");
    if (isDismissed) {
      setAdDismissed(true);
      setShowAds(false);
    }
  }, []);

  const dismissAds = () => {
    setShowAds(false);
    setAdDismissed(true);
    localStorage.setItem("adsDismissed", "true");
  };

  // Safe Push logic when script actually emits load event
  useEffect(() => {
    if (!adScriptLoaded || !showAds || adDismissed) return;

    const pushAd = () => {
      try {
        if (typeof window !== "undefined" && window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      } catch (e) {
        console.error("AdSense push error: ", e);
      }
    };

    // Small timeout ensures DOM elements are rendered safely by Next.js before running push
    const timer = setTimeout(pushAd, 500);
    return () => clearTimeout(timer);
  }, [adScriptLoaded, showAds, adDismissed]);

  if (adDismissed) {
    return (
      <div className="flex justify-center my-4">
        <button
          onClick={() => {
            setShowAds(true);
            setAdDismissed(false);
            localStorage.removeItem("adsDismissed");
          }}
          className="text-xs text-emerald-600 hover:text-emerald-800 px-3 py-1 border border-emerald-200 rounded-full"
        >
          विज्ञापन दिखाएं
        </button>
      </div>
    );
  }

  if (!showAds) return null;

  return (
    <section className="my-8 px-4 relative">
      {/* Google AdSense Script Injected Safely */}
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={() => setAdScriptLoaded(true)}
      />

      {/* Close button */}
      <button
        onClick={dismissAds}
        className="absolute top-2 right-4 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Close ads"
      >
        <FaTimes className="text-gray-500 text-xs" />
      </button>

      <div className="max-w-6xl mx-auto">
        <h3 className="text-lg font-semibold text-center text-gray-700 mb-4">
          विज्ञापन
        </h3>

        {/* AdSense ad slot wrapper to prevent layout shift */}
        <div className="w-full text-center my-4 overflow-hidden min-h-[100px]">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
            // Fixed variable name to be client accessible if you rename it in .env, or use standard fallback string
            data-ad-slot={process.env.NEXT_PUBLIC_DATA_AD_SLOT || "YOUR_FALLBACK_SLOT_ID"} 
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        {/* Local Ads Swiper */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          loop={ads.length > 1} // Disables loop glitch if only 1 ad is present
          className="ad-swiper pb-10"
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad.id}>
              <motion.div
                whileHover={{ scale: 0.99 }}
                className={`${ad.bgColor} rounded-xl overflow-hidden shadow-xl border border-gray-100 h-full flex mb-10`}
              >
                <div className="relative h-64 w-64 flex-shrink-0">
                  <Image
                    src={ad.image || "/placeholder.svg"}
                    alt={ad.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="items-center flex flex-col justify-center py-2 w-full">
                  <div className="py-2 px-4 flex-grow flex flex-col items-center justify-start gap-y-6">
                    <h4 className={`font-bold text-lg mb-1 ${ad?.textColor}`}>
                      {ad?.title}
                    </h4>
                    <p className="text-gray-700 text-sm mb-1 text-center">
                      {ad?.description}
                    </p>
                  </div>

                  <div className="p-2 pt-0 w-full px-4">
                    <Link href={ad.link} passHref legacyBehavior>
                      <a target="_blank" rel="noopener noreferrer" className="w-full">
                        <button
                          className="w-full py-2 px-4 rounded-lg font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center"
                        >
                          {ad.cta}
                          <FaArrowRight className="ml-2" size={14} />
                        </button>
                      </a>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .ad-swiper .swiper-pagination-bullet {
          background: #d1fae5;
          opacity: 0.6;
          width: 10px;
          height: 10px;
        }
        .ad-swiper .swiper-pagination-bullet-active {
          background: #059669;
          opacity: 1;
        }
        .ad-swiper .swiper-button-next,
        .ad-swiper .swiper-button-prev {
          color: #059669;
          background: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .ad-swiper .swiper-button-next:after,
        .ad-swiper .swiper-button-prev:after {
          font-size: 14px;
          font-weight: bold;
        }
        @media (max-width: 640px) {
          .ad-swiper .swiper-button-next,
          .ad-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}