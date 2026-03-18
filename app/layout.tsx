import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MECI Ingeniería - Ingeniería de precisión para infraestructura moderna",
  description:
    "Empresa colombiana de ingeniería eléctrica, civil, mecánica y comunicaciones en Medellín. Más de 10 años ejecutando proyectos industriales, mineros y de infraestructura en toda Colombia.",
  generator: "v0.app",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
}

export const viewport = {
  themeColor: "#FF8C00",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
