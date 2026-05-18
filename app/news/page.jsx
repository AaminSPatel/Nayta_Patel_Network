'use client'
import { usePatel } from "../../components/patelContext"; // adjust path if needed
import NewsPage from "../../components/news-page";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function Page() {
  const { news } = usePatel(); // assuming 'news' is the data you fetch
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (news && news.length > 0) {
      setLoading(false);
    }
  }, [news]);

  const metadata = {
    title:
      "नायता पटेल समाज समाचार | Latest News – Indore, Ujjain, Dewas, Dhar, Ratlam MP",
    description:
      "नायता पटेल समाज की ताज़ा खबरें। Breaking news from Indore, Ujjain, Dewas, Dhar, Ratlam. Community updates, farming news, village development stories from MP.",
    keywords: [
      "nayta patel news",
      "नायता पटेल खबरें",
      "indore samaj news",
      "mp village news",
      "nayta patel samaj breaking news",
      "dewas news",
      "ujjain kisan samachar",
    ],
    openGraph: {
      title: "नायता पटेल समाज समाचार | Latest Community News MP",
      description:
        "नायता पटेल समाज की ताज़ा खबरें – Indore, Ujjain, Dewas, Dhar, Ratlam.",
      url: "https://naytapatelnetwork.vercel.app/news",
      type: "website",
    },
    alternates: {
      canonical: "https://naytapatelnetwork.vercel.app/news",
    },
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta name="keywords" content={metadata.keywords.join(", ")} />

          <meta property="og:type" content={metadata.openGraph.type} />
          <meta property="og:url" content={metadata.openGraph.url} />
          <meta property="og:title" content={metadata.openGraph.title} />
          <meta property="og:description" content={metadata.openGraph.description} />

          <link rel="canonical" href={metadata.alternates.canonical} />
        </Head>

        <div className="w-full h-screen flex items-center justify-center bg-white ">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-emerald-500"></div>
          {/* You can replace this with your custom loader */}
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />

        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />

        <link rel="canonical" href={metadata.alternates.canonical} />
      </Head>

      <NewsPage />
    </>
  );
}
