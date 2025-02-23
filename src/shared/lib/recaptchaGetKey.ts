export const getSiteKey = () => {
  const siteKey = process.env.NEXT_PUBLIC_SITE_KEY

  if (!siteKey) {
    throw new Error('reCAPTCHA site key is not defined')
  }

  return siteKey
}
