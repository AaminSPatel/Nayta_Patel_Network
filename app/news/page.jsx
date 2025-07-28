'use client'
import { usePatel } from "../../components/patelContext"; // adjust path if needed
import NewsPage from "../../components/news-page";
import { useEffect, useState } from "react";

export default function Page() {
  const { news } = usePatel(); // assuming 'news' is the data you fetch
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (news && news.length > 0) {
      setLoading(false);
    }
  }, [news]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-emerald-500"></div>
        {/* You can replace this with your custom loader */}
      </div>
    );
  }

  return <NewsPage />;
}
