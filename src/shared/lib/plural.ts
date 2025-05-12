export const plural = (
  value: number,
  variants: { [key: string]: string } = {},
  locale: string = 'ru-RU'
): string => {
  const key = new Intl.PluralRules(locale).select(value)

  return variants[key] || ''
}
