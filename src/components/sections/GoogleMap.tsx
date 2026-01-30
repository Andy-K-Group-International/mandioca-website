'use client'

import { useI18n } from '@/lib/i18n'
import { MapPin, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function GoogleMap() {
  const { t } = useI18n()

  return (
    <section id="location" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#F7B03D] font-semibold text-sm uppercase tracking-wider">
            {t.neighborhood.sectionTitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A4843] mt-2 mb-4">
            {t.neighborhood.findUs}
          </h2>
          <p className="text-gray-600 text-lg">
            Av. Colón 1090, Asunción 1233, Paraguay
          </p>
        </div>

        {/* Map Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <div className="aspect-[16/9] md:aspect-[21/9] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1803.5!2d-57.6497056!3d-25.2855854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da8b4c3e8d9f7%3A0x8f7e6d5c4b3a2910!2sMandioca%20Hostel!5e0!3m2!1sen!2spy!4v1706700000000!5m2!1sen!2spy"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mandioca Hostel Location"
              className="absolute inset-0"
            />
          </div>

          {/* Overlay Card */}
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-sm bg-white rounded-xl shadow-lg p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0A4843] flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#0A4843] text-lg mb-1">
                  Mandioca Hostel
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Av. Colón 1090, Asunción 1233, Paraguay
                </p>
                <Button
                  size="sm"
                  className="bg-[#0A4843] hover:bg-[#0A4843]/90 text-white"
                  asChild
                >
                  <a
                    href="https://www.google.com/maps?q=-25.2855854,-57.6497056"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t.neighborhood.openMaps}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
