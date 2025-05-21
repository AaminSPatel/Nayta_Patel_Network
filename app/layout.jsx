import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "../components/theme-provider"
import AppSidebar from "../components/appSidebar.jsx"
import Header from "../components/header"
import Footer from "../components/footer"
import { AppProvider } from "../components/patelContext"
import { Analytics } from "@vercel/analytics/next"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: "Nayta Patel Network - Digital Voice of Rural India",
    template: "%s | Nayta Patel Samaj"
  },
  description: "Nayta Patel Network - Empowering rural communities through education, agriculture, and social development. नायता पटेल नेटवर्क - शिक्षा, कृषि और सामाजिक विकास के माध्यम से ग्रामीण समुदायों को सशक्त बनाना।",
  keywords: [
    "Nayta Patel Samaj",
    "Patel Community",
    "Rural Development India",
    "Agricultural Empowerment",
    "Digital India Villages",
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
    shortcut: "/logo1.png",
    apple: "/logo1.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#047857", // Emerald-700
  category: "community development",
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
         <head>
        <link rel="icon" href="./favicon.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <AppProvider>
        
            <div className="flex min-h-screen flex-col md:flex-row ">
                 {/* Sidebar with fixed width and z-index */}
                 <AppSidebar/>
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1">
                  <Analytics/>
                  {children}</main>
                <Footer />
              </div>
            </div>
            </AppProvider>
         {/*  </SidebarProvider> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
