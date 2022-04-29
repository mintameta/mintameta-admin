import i18next from 'i18next'
import en from './tools/en.js'
import zh from './tools/zh.js'
import { initReactI18next } from 'react-i18next'

const getLanguage = () => {
  const localStorageLang = localStorage.getItem('lang')
  const defaultLang = localStorageLang ? localStorageLang : 'en'
  return defaultLang
}
i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    zh: {
      translation: zh,
    },
  },

  lng: getLanguage(),
  // lng: 'zh',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18next
