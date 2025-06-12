import { ReactNode } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20"> {/* Add padding-top to account for fixed header */}
        {children}
      </main>
      <Footer />
    </div>
  )
}
