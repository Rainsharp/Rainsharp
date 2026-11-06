export const locales = ['fr', 'en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export const localeMeta: Record<Locale, { label: string; short: string; htmlLang: string; ogLocale: string }> = {
  fr: { label: 'Français', short: 'FR', htmlLang: 'fr', ogLocale: 'fr_CD' },
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US' },
  zh: { label: '简体中文', short: '中文', htmlLang: 'zh-CN', ogLocale: 'zh_CN' },
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Build a locale-prefixed path, e.g. href('fr', 'products/agior') -> /fr/products/agior/ */
export function href(lang: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}

/** Swap the locale segment of the current path. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length && isLocale(parts[0])) parts.shift();
  return href(target, parts.join('/'));
}
