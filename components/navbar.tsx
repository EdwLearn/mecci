"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { QuotationModal } from "@/components/quotation-modal"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/#inicio", label: "Inicio" },
    { href: "/#sobre-nosotros", label: "Sobre Nosotros" },
    { href: "/#servicios", label: "Servicios" },
    { href: "/#portafolio", label: "Portafolio" },
    { href: "/#contacto", label: "Contacto" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-foreground/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/#inicio" className="flex items-center group">
            <img 
              src="/logo-meci.png" 
              alt="MECI Ingeniería" 
              className="h-10 w-auto transition-all"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isScrolled ? "text-white" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button 
              className="bg-secondary hover:bg-secondary/90 text-white"
              onClick={() => setIsQuotationModalOpen(true)}
            >
              Cotizar Proyecto
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-foreground border-t border-border/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button 
              className="w-full bg-secondary hover:bg-secondary/90 text-white mt-4"
              onClick={() => {
                setIsMobileMenuOpen(false)
                setIsQuotationModalOpen(true)
              }}
            >
              Cotizar Proyecto
            </Button>
          </div>
        </div>
      )}

      <QuotationModal open={isQuotationModalOpen} onOpenChange={setIsQuotationModalOpen} />
    </nav>
  )
}
