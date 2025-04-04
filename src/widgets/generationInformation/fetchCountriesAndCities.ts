export const fetchCountriesAndCities = async (
  setCountrysWithCity: Function,
  setCountries: Function
) => {
  try {
    const res = await fetch('https://countriesnow.space/api/v0.1/countries', {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()
    const items = data.data.map((item: any) => ({
      value: item.iso2,
      valueTitle: item.country,
    }))

    setCountrysWithCity(data)
    setCountries(items)
  } catch (err) {
    console.error('Error fetching countries:', err)
  }
}
