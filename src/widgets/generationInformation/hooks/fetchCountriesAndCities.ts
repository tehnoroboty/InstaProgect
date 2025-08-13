import { CountriesType, ResponseTypeCounties } from '@/src/entities/users/types'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { AppDispatch } from '@/src/shared/model/store/store'
import { Options } from '@/src/shared/ui/select/SelectBox'

export const fetchCountriesAndCities = async (
  dispatch: AppDispatch,
  setCountriesWithCity: (data: ResponseTypeCounties) => void,
  setCountries: (items: Options[]) => void
): Promise<void> => {
  try {
    const res = await fetch('https://countriesnow.space/api/v0.1/countries', {})

    if (!res.ok) {
      const errorMessage = `HTTP error! status: ${res.status}`

      dispatch(setAppError({ error: errorMessage }))
    }

    const data: ResponseTypeCounties = await res.json()
    const items: Options[] = data.data.map((item: CountriesType) => ({
      value: item.country,
      valueTitle: item.country,
    }))

    setCountriesWithCity(data)
    setCountries(items)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err)

    dispatch(setAppError({ error: errorMessage }))
  }
}

export const fetchCitiesForCountry = async (
  countriesWithCity: ResponseTypeCounties,
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
