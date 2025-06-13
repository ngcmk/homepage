import type React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function FormsLayoutDemo({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
}
