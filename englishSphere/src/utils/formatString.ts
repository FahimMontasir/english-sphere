export const truncateText = (text: string, maxLength: number, placeHolder: string) => {
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength) + placeHolder
}
