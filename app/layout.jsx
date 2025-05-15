import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "../components/theme-provider"
import AppSidebar from "../components/appSidebar.jsx"
import Header from "../components/header"
import Footer from "../components/footer"
import { AppProvider } from "../components/patelContext"
import Sidebar from "../components/SidebarAdmin"
import HeaderAdmin from "../components/HeaderAdmin"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Apna Gaon Network",
  description: "Digital Voice of Our Rural Power",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <AppProvider>
        
            <div className="flex min-h-screen flex-col md:flex-row ">
                 {/* Sidebar with fixed width and z-index */}
                 <AppSidebar/>
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1">{children}</main>
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
