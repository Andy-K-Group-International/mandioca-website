import type { Metadata } from "next"
import { Poppins, Playfair_Display } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://mandiocahostel.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "Mandioca Hostel | Tu Hogar en Asunción, Paraguay",
    template: "%s | Mandioca Hostel",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  description:
    "Reserva tu estadía en Mandioca Hostel - el hostel #1 de Asunción, Paraguay. Piscina, quincho, WiFi gratis y la mejor atmósfera. Book your stay at Mandioca Hostel - #1 rated hostel in Asunción, Paraguay.",
  keywords: [
    "hostel",
    "Asuncion hostel",
    "Paraguay hostel",
    "budget accommodation",
    "backpacker",
    "travel",
    "South America hostels",
    "Mandioca Hostel",
    "hostel con piscina",
    "hostel Asuncion",
    "alojamiento barato Asuncion",
    "donde dormir Asuncion",
  ],
  authors: [{ name: "Mandioca Hostel" }],
  creator: "Mandioca Hostel",
  publisher: "Mandioca Hostel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Mandioca Hostel | Tu Hogar en Asunción, Paraguay",
    description:
      "El hostel #1 de Asunción con piscina, quincho y la mejor atmósfera. ¡Sentite como en casa!",
    type: "website",
    locale: "es_PY",
    alternateLocale: "en_US",
    siteName: "Mandioca Hostel",
    images: [
      {
        url: "/assets/images/mandioca-0007.webp",
        width: 1360,
        height: 766,
        alt: "Mandioca Hostel - Asunción, Paraguay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mandioca Hostel | Tu Hogar en Asunción, Paraguay",
    description: "El hostel #1 de Asunción con piscina, quincho y la mejor atmósfera.",
    images: ["/assets/images/mandioca-0007.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
