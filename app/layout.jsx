import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "../components/theme-provider"
import AppSidebar from "../components/appSidebar.jsx"
import Header from "../components/header"
import Footer from "../components/footer"
import { AppProvider } from "../components/patelContext"
import { Analytics } from "@vercel/analytics/next"
import WhatsAppGroupButton from "../components/whatsappButton"
import GoogleAnalytics from "../components/GoogleAnalytics"
import InstallPWA from "../components/InstallPWA"
const inter = Inter({ subsets: ["latin"] })
import { Suspense } from 'react';
import PwaTabBar from "../components/PwaTabBar"
import AdSenseProvider from '../components/AdSenseProvider';

export const metadata = {
  title: {
    default: "Nayta Patel Network - Digital Voice of Rural India",
    template: "%s | Nayta Patel Samaj"
  },
  description: "नायता पटेल नेटवर्क - नायता पटेल समाज का प्रमुख प्लेटफॉर्म | Daily news, inspiring stories, agricultural tips, and community updates for Nayta Patel members. Join us to empower rural communities through education, farming innovations, and social development initiatives. नायता पटेल समाज की ताज़ा खबरें, सफलता की कहानियाँ, कृषि ज्ञान और सामुदायिक कार्यक्रमों की जानकारी।",
  keywords: [
    "Nayta Patel Samaj",
    "Patel Community",
    "Rural Development India",
    "Agricultural Empowerment",
    "Digital India Villages",
    "Nayta Patel",
    "Nayta News",
    "Nayata Patel",
    "Nyta Patel",
    "Patel Nayta",
    "Nayta Patel Samaj",
    "Nayta Samaj",
    "Nayta Patel in Indore",
    "Nayata Patel Network",
    "Patel Nayata",
    "Indore",
    "Ujjain",
    "Dewas",
    "Dhar",
    "Ratlam",
    "नायता पटेल समाज",
    "ताजा बाजार भाव",
    "नीमच मंडी भाव",
    "Neemuch Mandi",
    "नायता पटेल",
    "भारत",
    "ग्रामीण विकास",
    "किसान सशक्तिकरण",
    "डिजिटल भारत गाँव"
  ],
  generator: "Nayta Patel Network and Community",
  applicationName: "Nayta Patel Samaj Portal",
  authors: [{ name: "Nayta Patel Network Team" }],
  creator: "Nayta Patel Community Development Group",
  publisher: "Nayta Patel Digital Initiative",
  metadataBase: new URL("https://naytapatelnetwork.vercel.app/"),
  alternates: {
    canonical: "/",
    languages: {
      'en': '/',
      'hi': '/hi'
    }
  },
  openGraph: {
    title: "Nayta Patel Network - Digital Voice of Rural Power | नायता पटेल नेटवर्क",
    description: "Empowering Patel community through education, farming and technology. शिक्षा, कृषि और प्रौद्योगिकी के माध्यम से पटेल समुदाय को सशक्त बनाना।",
    url: "https://naytapatelnetwork.vercel.app/",
    siteName: "Nayta Patel Network",
    images: [
      {
        url: "/home.png",
        width: 1200,
        height: 630,
        alt: "Nayta Patel Community Network",
      }, 
      {
        url: "/logo1.png",
        width: 630,
        height: 630,
        alt: "Nayta Patel Network Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nayta Patel Network - ग्रामीण शक्ति की डिजिटल आवाज़",
    description: "Transforming rural India through education and technology. शिक्षा और प्रौद्योगिकी के माध्यम से ग्रामीण भारत का परिवर्तन।",
    images: ["https://naytapatelnetwork.vercel.app/logo1.png"],
    site: "@NaytaPatelNetwork",
    creator: "@NaytaPatelOrg",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
  icons: {
  icon: "/favicon.ico",
  shortcut: "/favicon.ico",
  apple: "/apple-icon.png" // Apple recommends 180x180
},
  manifest: "/manifest.json",
  category: "community development",
  other: {
    "google-site-verification": "Gw0kKrcBORBSuCsj5fpyVGYEYahY47h7CpJufGEWshY", // Add your Google Search Console verification code
  },
}
export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
     <head>
  {/* Favicons */}
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/icons/web-app-manifest-192x192.png" type="image/png" />
  <link rel="apple-touch-icon" href="/icons/web-app-manifest-192x192.png" />
  {/* PWA Metadata */}
  <link rel="manifest" href="/manifest.json" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-title" content="Nayta Patel Network" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="google-adsense-account" content="ca-pub-2266489672584683"></meta>
  {/* Windows Pinned Sites */}
  <meta name="msapplication-TileColor" content="#047857" />
  <meta name="msapplication-config" content="/browserconfig.xml" />
</head>
      <body className={inter.className}>
            <Suspense fallback={<Loader />}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <AppProvider>
        
            <div className="flex min-h-screen flex-col md:flex-row ">
                 {/* Sidebar with fixed width and z-index */}
              <PwaTabBar />
              <AppSidebar/>
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1">
                  <Analytics/>
                  { <WhatsAppGroupButton />}
                  {children}
   <InstallPWA/> 
                  </main>
   
                  
                <Footer />
              </div>
            </div>
            </AppProvider>
         {/*  </SidebarProvider> */}
        </ThemeProvider>
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID} /> {/* Replace with your GA ID */}
        </Suspense>
      </body>
    </html>
  )
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