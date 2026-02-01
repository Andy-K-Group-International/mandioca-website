'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle, ExternalLink } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import posthog from 'posthog-js'

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const { t } = useI18n()

  const contactInfo = [
    {
      icon: Phone,
      label: t.contact.labels.phone,
      value: t.contact.phone,
      href: 'tel:+5493704951772',
    },
    {
      icon: Mail,
      label: t.contact.labels.email,
      value: t.contact.email,
      href: 'mailto:info@mandiocahostel.com',
    },
    {
      icon: MapPin,
      label: t.contact.labels.address,
      value: t.contact.address,
      href: 'https://maps.google.com/?q=Mandioca+Hostel+Asuncion+Paraguay',
    },
    {
      icon: Clock,
      label: t.contact.labels.reception,
      value: t.contact.receptionHours,
      href: null,
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Track contact form submission
    posthog.capture('contact_form_submitted', {
      subject: formData.subject,
      has_message: formData.message.length > 0,
      message_length: formData.message.length,
    })

    setIsSuccess(true)
    setIsSubmitting(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-8 sm:py-10 bg-white overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 max-w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="text-[#F7B03D] font-semibold text-xs sm:text-sm uppercase tracking-wider">
            {t.contact.sectionTitle}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A4843] mt-1.5 mb-2 sm:mb-3">
            {t.contact.title}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:flex lg:flex-col lg:gap-3">
            {contactInfo.map((item, index) => {
              const isAddressCard = item.label === t.contact.labels.address
              return (
                <Card key={index} className="bg-gray-50 border-none">
                  <CardContent className={`p-3 sm:p-4 ${isAddressCard ? '' : ''}`}>
                    <div className="flex items-center gap-2 sm:gap-3 w-full">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-[#0A4843]/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#0A4843]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="font-semibold text-xs sm:text-sm text-[#0A4843] hover:text-[#F7B03D] transition-colors cursor-pointer truncate block"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-semibold text-xs sm:text-sm text-[#0A4843] truncate">{item.value}</p>
                        )}
                      </div>
                    </div>
                    {/* Add Directions link for Address card */}
                    {isAddressCard && (
                      <div className="flex justify-end mt-1.5">
                        <a
                          href="https://www.google.com/maps/dir/?api=1&destination=-25.2855854,-57.6497056"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#F7B03D] hover:text-[#0A4843] transition-colors cursor-pointer font-medium"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Directions
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Contact Form */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-4 sm:p-6">
              {isSuccess ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0A4843] mb-2">
                    {t.contact.form.success}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {t.contact.form.successMessage}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsSuccess(false)
                      setFormData({ name: '', email: '', subject: '', message: '' })
                    }}
                  >
                    {t.contact.form.sendAnother}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="contact-name" className="text-xs sm:text-sm">{t.contact.form.name}</Label>
                      <Input
                        id="contact-name"
                        name="name"
                        placeholder={t.contact.form.namePlaceholder}
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-9 sm:h-10 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="contact-email" className="text-xs sm:text-sm">{t.contact.form.email}</Label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder={t.contact.form.emailPlaceholder}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-9 sm:h-10 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs sm:text-sm">{t.contact.form.subject}</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, subject: value }))
                      }
                    >
                      <SelectTrigger className="w-full h-9 sm:h-10 text-sm">
                        <SelectValue placeholder={t.contact.form.subjectPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {t.contact.subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="message" className="text-xs sm:text-sm">{t.contact.form.message}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t.contact.form.messagePlaceholder}
                      className="min-h-[80px] sm:min-h-[100px] resize-none text-sm"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="mt-0.5"
                      required
                    />
                    <Label htmlFor="privacy" className="text-xs sm:text-sm text-gray-600 font-normal leading-tight">
                      {t.contact.form.acceptTerms}{' '}
                      <a href="/terms" className="text-[#0A4843] underline hover:text-[#F7B03D]">
                        {t.contact.form.termsLink}
                      </a>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#0A4843] hover:bg-[#0A4843]/90 h-9 sm:h-10 text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.contact.form.sending}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t.contact.form.send}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
