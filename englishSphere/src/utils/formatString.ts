export const truncateText = (text: string, maxLength: number, placeHolder: string) => {
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength) + placeHolder
}

export const cleanString = (inputString: string) => {
  // Convert the string to lowercase
  const lowercaseString = inputString.toLowerCase()
  // Remove leading and trailing spaces
  const trimmedString = lowercaseString.trim()

  return trimmedString
}
