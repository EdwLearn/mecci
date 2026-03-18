import Link from "next/link"
import { Linkedin, Instagram, Facebook } from "lucide-react"

export function Footer() {
  const quickLinks = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#servicios" },
    { label: "Portafolio", href: "#portafolio" },
    { label: "Contacto", href: "#contacto" },
  ]

  const socialMedia = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ]

  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Logo and Description */}
          <div>
            <div className="mb-4">
              <img 
                src="/logo-meci.png" 
                alt="MECI Ingeniería" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-white/70 leading-relaxed">
              Ingeniería de precisión para infraestructura moderna. Transformando ideas en proyectos exitosos desde hace
              más de 10 años.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <div className="space-y-2 text-white/70">
              <p>Teléfono: +57 3180103030</p>
              <p>Email: proyectos@meciingenieria.com</p>
              <p>Medellín, Colombia</p>
            </div>
            <div className="flex gap-3 mt-6">
              {socialMedia.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center text-white/70">
          <p>Copyright © 2026 MECI Ingeniería | Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  )
}
