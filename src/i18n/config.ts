
export const SUPPORTED_LANGUAGES = ["en", "zh-TW"] as const
export const DEFAULT_LANGUAGE: SupportedLanguage = "en"
export const LANGUAGE_COOKIE_NAME = "i18n_lang"
export const NAMESPACES = ["translation", "auth"] as const


export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]
export type Namespace = typeof NAMESPACES[number]