export const getClientId = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  if (!clientId) {
    throw new Error('Google clientId is not defined')
  }

  return clientId
}
