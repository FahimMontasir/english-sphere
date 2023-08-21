import { Locale, format, parseISO, formatDistanceToNow } from "date-fns"
import I18n from "i18n-js"

import bn from "date-fns/locale/bn"
import en from "date-fns/locale/en-US"

type Options = Parameters<typeof format>[2]

const getLocale = (): Locale => {
  const locale = I18n.currentLocale().split("-")[0]
  return locale === "bn" ? bn : en
}

export const formatDate = (date: string, dateFormat?: string, options?: Options) => {
  const locale = getLocale()
  const dateOptions = {
    ...options,
    locale,
  }
  return format(parseISO(date), dateFormat ?? "MMM dd, yyyy", dateOptions)
}

export const fromNow = (v: string) => {
  return formatDistanceToNow(new Date(v), { addSuffix: true })
}
