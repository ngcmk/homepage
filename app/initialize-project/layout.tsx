import type React from "react"
import Header from "../components/Header"

export default function InitializeProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

