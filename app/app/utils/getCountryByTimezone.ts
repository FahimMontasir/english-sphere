import * as Localization from "expo-localization"
import { getAllTimezones } from "countries-and-timezones"
import { getAllInfoByISO } from "iso-country-currency"
// TODO: move this pkg to backend
export const getCountryByTimezone = (): {
  countryCodeISO: string
  currency: string
  countryName: string
} => {
  try {
    const countries = getAllTimezones()
    // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezone = Localization.timezone

    const defaultCountryCode = countries[timezone].countries[0].toLowerCase()
    const countryData = getAllInfoByISO(defaultCountryCode)

    const { iso, currency, countryName } = countryData

    return { countryCodeISO: iso, currency, countryName }
  } catch (e) {
    return null
  }
}
