import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { I18nProvider } from "@/lib/i18n"
import { WhatsAppButton } from "@/components/ui/WhatsAppButton"
import CookieBanner from "@/components/CookieBanner"
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { PhotoGallery } from '@/components/sections/PhotoGallery'
import { Amenities } from '@/components/sections/Amenities'
import { Rooms } from '@/components/sections/Rooms'
import { Activities } from '@/components/sections/Activities'
import { Reviews } from '@/components/sections/Reviews'
import { FAQ } from '@/components/sections/FAQ'
import { BookingForm } from '@/components/booking/BookingForm'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <I18nProvider>
      <Header />
      <main className="overflow-x-hidden">
        <div className="w-full overflow-x-hidden">
          <Hero />
          <About />
          <PhotoGallery />
          <Amenities />
          <Rooms />
          <Activities />
          <Reviews />
          <BookingForm
            hostelId="mandioca-hostel"
            hostelName="Mandioca Hostel"
          />
          <FAQ />
          <Contact />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </I18nProvider>
  )
}
