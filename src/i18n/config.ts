
export const SUPPORTED_LANGUAGES = ["en", "zh-Hant", "zh-Hans"] as const
export const LANGUAGE_COOKIE_NAME = "i18n_lang"
export const NAMESPACES = ["translation", "language", "auth"] as const

// 語言回退映射
export const FALLBACK_LANGUAGES: Record<string, string[]> = {
  'zh-TW': ['zh-Hant'],
  'zh-HK': ['zh-Hant'],
  'zh-MO': ['zh-Hant'],
  'zh': ['zh-Hans'],
  'default': ['en']
}

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]
export type Namespace = typeof NAMESPACES[number]