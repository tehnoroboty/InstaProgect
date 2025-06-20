import { CountrysType, ResponseTypeCountys } from '@/src/entities/user/types'
import { Options } from '@/src/shared/ui/select/SelectBox'

export const fetchCountriesAndCities = async (
  setCountriesWithCity: (data: ResponseTypeCountys) => void,
  setCountries: (items: Options[]) => void
): Promise<void> => {
  try {
    const res = await fetch('https://countriesnow.space/api/v0.1/countries', {})

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`)
    }

    const data: ResponseTypeCountys = await res.json()
    const items: Options[] = data.data.map((item: CountrysType) => ({
      value: item.country,
      valueTitle: item.country,
    }))

    setCountriesWithCity(data)
    setCountries(items)
  } catch (err) {
    console.error('Error fetching countries:', err)
  }
}

export const fetchCitiesForCountry = async (
  countriesWithCity: ResponseTypeCountys,
  selectedCountry: string,
  setCites: (cities: Options[]) => void
): Promise<void> => {
  const res = countriesWithCity.data.find(item => item.country === selectedCountry)

  if (res) {
    const items: Options[] = res.cities.map(city => ({
      value: city,
      valueTitle: city,
    }))

    setCites(items)
  }
}
