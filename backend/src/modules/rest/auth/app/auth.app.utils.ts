import { getAllTimezones, TimezoneName } from 'countries-and-timezones';
import { getAllInfoByISO } from 'iso-country-currency';

export const getCountryByTimezone = (
  timezone: TimezoneName
): {
  countryCodeISO: string;
  currency: string;
  countryName: string;
} => {
  try {
    const countries = getAllTimezones();

    const defaultCountryCode = countries[timezone].countries[0].toLowerCase();
    const countryData = getAllInfoByISO(defaultCountryCode);

    const { iso, currency, countryName } = countryData;

    return { countryCodeISO: iso, currency, countryName };
  } catch (e) {
    return { countryCodeISO: '', currency: '', countryName: '' };
  }
};
