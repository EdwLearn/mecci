"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Linkedin, Instagram, Facebook, Loader2 } from "lucide-react"
import { useState } from "react"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    area: "",
    service: "",
    message: "",
  })

  const areas = [
    "Ingeniería Eléctrica",
    "Ingeniería Comunicaciones",
    "Ingeniería Civil",
    "Ingeniería Mecánica",
  ]

  const services = [
    "Estudios Técnicos",
    "Diseños Técnicos",
    "Montajes/Construcción",
    "Consultorías Técnicas",
    "Interventorías",
    "Mantenimientos",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: "6cba39f3-899d-4159-9300-a6ec5ea1fe3a",
          subject: `Nuevo Contacto - ${formData.area || "General"} - ${formData.name}`,
          from_name: "MECI Ingeniería Web",
          replyto: formData.email,
          Nombre: formData.name,
          Email: formData.email,
          Telefono: formData.phone,
          "Area del Proyecto": formData.area || "No especificada",
          "Tipo de Servicio": formData.service || "No especificado",
          Mensaje: formData.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          area: "",
          service: "",
          message: "",
        })
      } else {
        alert("Hubo un error al enviar el mensaje. Por favor intenta de nuevo.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Hubo un error al enviar el mensaje. Por favor intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: Phone, label: "Teléfono", value: "+57 301 5556197" },
    { icon: Mail, label: "Email", value: "proyectos@meciingenieria.com" },
    { icon: MapPin, label: "Ubicación", value: "Medellín, Colombia" },
  ]

  const socialMedia = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ]

  return (
    <section id="contacto" className="py-20 sm:py-32 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">Hablemos de tu Proyecto</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contáctanos y trabajemos juntos para hacer realidad tu proyecto
            </p>

            {isSubmitted ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Mensaje Enviado</h3>
                  <p className="text-muted-foreground mb-4">
                    Gracias por contactarnos. Nos pondremos en contacto contigo pronto.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Enviar otro mensaje
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <Select onValueChange={(value) => setFormData({ ...formData, area: value })} value={formData.area}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Área del proyecto" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select onValueChange={(value) => setFormData({ ...formData, service: value })} value={formData.service}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Tipo de servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Textarea
                    placeholder="Mensaje"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensaje"
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <Card key={index}>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-1">{info.label}</div>
                      <div className="text-muted-foreground">{info.value}</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* Social Media */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Síguenos en redes sociales</h3>
                <div className="flex gap-4">
                  {socialMedia.map((social, index) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className="w-12 h-12 rounded-lg bg-primary/10 hover:bg-primary flex items-center justify-center transition-colors group"
                        aria-label={social.label}
                      >
                        <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                      </a>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
