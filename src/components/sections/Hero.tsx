'use client'

import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { FloatingImages } from './FloatingImages'
import posthog from 'posthog-js'

export function Hero() {
  const { t } = useI18n()

  const handleCtaClick = (ctaType: 'book_now' | 'view_rooms') => {
    posthog.capture('cta_clicked', {
      cta_type: ctaType,
      location: 'hero_section',
    })
  }

  return (
    <section className="relative h-[85vh] lg:h-[95vh] min-h-[600px] overflow-hidden">
      {/* Base teal background */}
      <div className="absolute inset-0 bg-[#0A4843]" />

      {/* Primary gradient with gold warmth - starts at 60% */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 140% 70% at 0% 30%, rgba(247, 176, 61, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse 120% 80% at 100% 70%, rgba(247, 176, 61, 0.2) 0%, transparent 45%),
            radial-gradient(ellipse 100% 100% at 50% 100%, rgba(247, 176, 61, 0.15) 0%, transparent 50%),
            linear-gradient(180deg, #0A4843 0%, #0A4843 60%, #0d5c55 80%, #063832 100%)
          `
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Images - behind content */}
      <FloatingImages />

      {/* Hero Content - above images */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 pt-20">
        {/* Rating Badge */}
        <Badge className="bg-[#F7B03D] text-gray-900 mb-6 text-xs md:text-sm font-semibold px-4 py-2 hover:bg-[#F7B03D] shadow-lg shadow-[#F7B03D]/25">
          <Star className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 fill-current" />
          {t.hero.rating} avg · {t.reviews.reviewCount}
        </Badge>

        {/* Main Heading - Elegant Serif */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white text-center leading-[1.1] tracking-tight max-w-4xl drop-shadow-lg">
          {t.hero.hostelName}
        </h1>

        {/* Decorative line */}
        <div className="mt-6 flex items-center gap-3">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#F7B03D] to-transparent" />
          <div className="w-2 h-2 rounded-full bg-[#F7B03D]" />
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#F7B03D] to-transparent" />
        </div>

        {/* Subheading - more visible */}
        <p className="mt-5 text-base md:text-lg lg:text-xl text-white text-center max-w-md font-light tracking-wide drop-shadow-md">
          {t.hero.shortDescription}
        </p>

        {/* CTA Button */}
        <a
          href="#booking"
          onClick={() => handleCtaClick('book_now')}
          className="mt-8 group inline-flex items-center justify-center bg-[#F7B03D] text-gray-900 text-sm md:text-base font-semibold px-8 py-3.5 rounded-full transition-all duration-500 ease-out hover:bg-[#e9a235] hover:shadow-xl hover:shadow-[#F7B03D]/30 hover:scale-[1.02]"
        >
          {t.hero.bookNow}
        </a>

        {/* Secondary link - more visible */}
        <a
          href="#rooms"
          onClick={() => handleCtaClick('view_rooms')}
          className="mt-4 text-white hover:text-white/80 text-base font-medium underline underline-offset-4 transition-all duration-500 tracking-wide"
        >
          {t.hero.viewRooms}
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-2.5 bg-white/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>

      {/* Bottom gradient fade - 15% height only */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{
          height: '15%',
          background: 'linear-gradient(to top, white 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)'
        }}
      />
    </section>
  )
}
