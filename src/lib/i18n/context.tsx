'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { dictionaries, Locale } from './dictionaries'

// Define a more flexible type for the dictionary
type DictionaryType = typeof dictionaries.en | typeof dictionaries.es

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: DictionaryType
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    // Check localStorage for saved preference
    const savedLocale = localStorage.getItem('locale') as Locale | null
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'es')) {
      setLocaleState(savedLocale)
    } else {
      // Check browser language
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('es')) {
        setLocaleState('es')
      }
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const t = dictionaries[locale] as DictionaryType

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
