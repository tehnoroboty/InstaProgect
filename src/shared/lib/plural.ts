export const plural = (
  value: number,
  variants: { [key: string]: string } = {},
  locale: string = 'en-US'
): string => {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value)

  return variants[key] || ''
}
