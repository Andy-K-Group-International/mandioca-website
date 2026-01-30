'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Star } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

// Asunción Paraguay landmarks
const attractionImages = [
  // Legislative Palace - use Unsplash Asuncion cityscape
  'https://images.unsplash.com/photo-1655148341019-e413766c3d79?w=600&q=80',
  // Loma San Jeronimo - colorful neighborhood
  'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80',
  // Historic Center - architecture
  'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600&q=80',
  // Costanera waterfront
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  // Escape Room - fun activity
  'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80',
  // Shopping mall
  'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80',
]

export function Neighborhood() {
  const { t } = useI18n()
  const attractions = t.neighborhood.attractions

  return (
    <section id="neighborhood" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#F7B03D] font-semibold text-sm uppercase tracking-wider">
            {t.neighborhood.sectionTitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A4843] mt-2 mb-4">
            {t.neighborhood.title}
          </h2>
          <p className="text-gray-600 text-lg">
            {t.neighborhood.subtitle}
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction, index) => (
            <Card
              key={index}
              className="overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={attractionImages[index] || attractionImages[0]}
                  alt={attraction.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <MapPin className="h-4 w-4" />
                      {attraction.distance}
                    </div>
                    <div className="flex items-center gap-1 text-white/90 text-sm">
                      <Star className="h-4 w-4 fill-[#F7B03D] text-[#F7B03D]" />
                      {attraction.rating}
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="font-bold text-[#0A4843] text-lg mb-2">
                  {attraction.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {attraction.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
