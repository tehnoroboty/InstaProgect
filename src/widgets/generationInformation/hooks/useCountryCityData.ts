import { useEffect, useState } from 'react'

import { ResponseTypeCounties } from '@/src/entities/users/types'
import { useAppDispatch } from '@/src/shared/model/store/store'
import { Options } from '@/src/shared/ui/select/SelectBox'
import {
  fetchCitiesForCountry,
  fetchCountriesAndCities,
} from '@/src/widgets/generationInformation/hooks/fetchCountriesAndCities'

export const useCountryCityData = (selectedCountry: string) => {
  const dispatch = useAppDispatch()
  const [countriesWithCity, setCountriesWithCity] = useState<ResponseTypeCounties>()
  const [countries, setCountries] = useState<Options[]>([])
  const [cites, setCites] = useState<Options[]>([])

  useEffect(() => {
    fetchCountriesAndCities(dispatch, setCountriesWithCity, setCountries)
  }, [dispatch])

  useEffect(() => {
    if (selectedCountry && countriesWithCity) {
      fetchCitiesForCountry(countriesWithCity, selectedCountry, setCites)
    }
  }, [countriesWithCity, selectedCountry])

  return {
    cites,
    countries,
    countriesWithCity,
    setCites,
  }
}
