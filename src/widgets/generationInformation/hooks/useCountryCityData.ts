import { useEffect, useState } from 'react'

import { ResponseTypeCountys } from '@/src/entities/user/types'
import { Options } from '@/src/shared/ui/select/SelectBox'
import {
  fetchCitiesForCountry,
  fetchCountriesAndCities,
} from '@/src/widgets/generationInformation/hooks/fetchCountriesAndCities'

export const useCountryCityData = (selectedCountry: string) => {
  const [countrysWithCity, setCountrysWithCity] = useState<ResponseTypeCountys>()
  const [countrys, setCountries] = useState<Options[]>([])
  const [cites, setCites] = useState<Options[]>([])

  useEffect(() => {
    fetchCountriesAndCities(setCountrysWithCity, setCountries)
  }, [])

  useEffect(() => {
    if (selectedCountry && countrysWithCity) {
      fetchCitiesForCountry(countrysWithCity, selectedCountry, setCites)
    }
  }, [selectedCountry])

  return {
    cites,
    countrys,
    countrysWithCity,
    setCites,
  }
}
