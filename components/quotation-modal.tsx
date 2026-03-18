"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCircle2, ClipboardList, User, ArrowRight, ArrowLeft, Upload, FileText, X } from "lucide-react"

interface QuotationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  // Step 1
  service: string
  projectType: string
  description: string
  location: string
  projectStatus: string
  // Step 2
  budget: string
  startDate: string
  fullName: string
  companyName: string
  email: string
  phone: string
}

interface FormErrors {
  service?: string
  description?: string
  fullName?: string
  email?: string
  phone?: string
}

export function QuotationModal({ open, onOpenChange }: QuotationModalProps) {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    service: "",
    projectType: "",
    description: "",
    location: "",
    projectStatus: "",
    budget: "",
    startDate: "",
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [files, setFiles] = useState<File[]>([])

  const MAX_FILES = 5
  const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB
  const ACCEPTED_TYPES = ".pdf,.zip,.rar,.7z,.doc,.docx,.xls,.xlsx,.dwg,.dxf,.png,.jpg,.jpeg"

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const newFiles = Array.from(e.target.files)
    const validFiles = newFiles.filter((f) => f.size <= MAX_FILE_SIZE)
    setFiles((prev) => [...prev, ...validFiles].slice(0, MAX_FILES))
    e.target.value = ""
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const services = [
    "Electricidad",
    "Comunicaciones",
    "Civil",
    "Mecánico",
  ]

  const projectStatuses = [
    "Estudios Técnicos",
    "Diseños Técnicos",
    "Montajes/Construcción",
    "Consultorías Técnicas",
    "Interventorías",
    "Mantenimientos",
  ]

  const budgetRanges = [
    "Menos de $50M",
    "$50M – $200M",
    "$200M – $500M",
    "Más de $500M",
    "Aún no definido",
  ]

  const startDates = [
    "Inmediato",
    "1–3 meses",
    "3–6 meses",
    "Más de 6 meses",
  ]

  const validateStep1 = () => {
    const newErrors: FormErrors = {}
    if (!formData.service) newErrors.service = "Este campo es requerido"
    if (!formData.description) newErrors.description = "Este campo es requerido"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: FormErrors = {}
    if (!formData.fullName) newErrors.fullName = "Este campo es requerido"
    if (!formData.email) {
      newErrors.email = "Este campo es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo válido"
    }
    if (!formData.phone) newErrors.phone = "Este campo es requerido"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleBack = () => {
    setStep(1)
    setErrors({})
  }

  const handleSubmit = async () => {
    if (!validateStep2()) return

    setIsSubmitting(true)

    const filesList = files.length > 0 
      ? files.map((f) => f.name).join(", ") 
      : "Ninguno"
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: "6cba39f3-899d-4159-9300-a6ec5ea1fe3a",
          subject: `Nueva Cotizacion - ${formData.service} - ${formData.fullName}`,
          from_name: "MECI Ingenieria Web",
          replyto: formData.email,
          Nombre: formData.fullName,
          Empresa: formData.companyName || "No especificada",
          Email: formData.email,
          Telefono: formData.phone,
          Servicio: formData.service,
          "Estado del Proyecto": formData.projectStatus || "No especificado",
          Ubicacion: formData.location || "No especificada",
          Presupuesto: formData.budget || "No definido",
          "Fecha de Inicio": formData.startDate || "No especificada",
          Descripcion: formData.description,
          "Archivos Tecnicos": filesList,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
      } else {
        alert("Hubo un error al enviar la solicitud. Por favor intenta de nuevo.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Hubo un error al enviar la solicitud. Por favor intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset form after animation completes
    setTimeout(() => {
      setStep(1)
      setIsSubmitted(false)
      setFormData({
        service: "",
        projectType: "",
        description: "",
        location: "",
        projectStatus: "",
        budget: "",
        startDate: "",
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
      })
      setErrors({})
      setFiles([])
    }, 300)
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl text-center">Solicitud Enviada</DialogTitle>
              <DialogDescription className="text-center text-base mt-2">
                Gracias por tu solicitud. Nuestro equipo evaluará tu proyecto y se comunicará contigo pronto.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={handleClose} className="mt-4 bg-primary hover:bg-primary/90">
              Cerrar
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Solicitar Cotización</DialogTitle>
              <DialogDescription>
                Completa el formulario y uno de nuestros ingenieros se comunicará contigo.
              </DialogDescription>
            </DialogHeader>

            {/* Progress Indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step >= 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <ClipboardList className="w-4 h-4" />
                </div>
                <span className={`text-sm font-medium ${step >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
                  Proyecto
                </span>
              </div>
              <div className={`flex-1 h-0.5 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step >= 2 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <User className="w-4 h-4" />
                </div>
                <span className={`text-sm font-medium ${step >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
                  Contacto
                </span>
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                {/* Service */}
                <div className="space-y-2">
                  <Label htmlFor="service">
                    Servicio a cotizar <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.service} onValueChange={(v) => updateFormData("service", v)}>
                    <SelectTrigger className={`w-full ${errors.service ? "border-destructive" : ""}`}>
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service && <p className="text-sm text-destructive">{errors.service}</p>}
                </div>

                {/* Project Status */}
                <div className="space-y-2">
                  <Label htmlFor="projectStatus">Estado del proyecto</Label>
                  <Select value={formData.projectStatus} onValueChange={(v) => updateFormData("projectStatus", v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación del proyecto (Ciudad / Departamento)</Label>
                  <Input
                    id="location"
                    placeholder="Ej: Medellín, Antioquia"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Descripción del proyecto <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe brevemente tu proyecto (ubicación, tamaño, estado actual, necesidad principal)"
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    className={`min-h-[100px] ${errors.description ? "border-destructive" : ""}`}
                  />
                  {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label>Archivos técnicos (opcional)</Label>
                  <div className="relative">
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
                    >
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground">Haz clic para subir archivos</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PDF, ZIP, RAR, DOC, XLS, DWG, imagenes. Max 25MB por archivo.
                        </p>
                      </div>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept={ACCEPTED_TYPES}
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </div>
                  {files.length > 0 && (
                    <div className="space-y-2 mt-2">
                      {files.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="flex items-center justify-between gap-2 p-2 bg-muted rounded-md"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="w-4 h-4 shrink-0 text-primary" />
                            <span className="text-sm truncate">{file.name}</span>
                            <span className="text-xs text-muted-foreground shrink-0">
                              ({formatFileSize(file.size)})
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="shrink-0 p-1 rounded-full hover:bg-background transition-colors"
                            aria-label={`Eliminar ${file.name}`}
                          >
                            <X className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                        </div>
                      ))}
                      <p className="text-xs text-muted-foreground">
                        {files.length}/{MAX_FILES} archivos seleccionados
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                    Siguiente
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                {/* Budget */}
                <div className="space-y-2">
                  <Label htmlFor="budget">Presupuesto estimado (COP)</Label>
                  <Select value={formData.budget} onValueChange={(v) => updateFormData("budget", v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un rango" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Start Date */}
                <div className="space-y-2">
                  <Label htmlFor="startDate">Fecha estimada de inicio</Label>
                  <Select value={formData.startDate} onValueChange={(v) => updateFormData("startDate", v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      {startDates.map((date) => (
                        <SelectItem key={date} value={date}>
                          {date}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Nombre completo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Tu nombre completo"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nombre de la empresa</Label>
                  <Input
                    id="companyName"
                    placeholder="Nombre de tu empresa (opcional)"
                    value={formData.companyName}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Correo electrónico <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Teléfono / WhatsApp <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+57 300 123 4567"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                <div className="flex flex-col gap-4 pt-4">
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Atrás
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      {isSubmitting ? "Enviando..." : "Solicitar cotización"}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Uno de nuestros ingenieros se comunicará contigo en menos de 24 horas.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
