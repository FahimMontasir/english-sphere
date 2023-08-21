const fonts = {
  sairaCondensed: {
    // Cross-platform Google font.
    light: "SairaCondensed-ExtraLight",
    normal: "SairaCondensed-Regular",
    medium: "SairaCondensed-Medium",
    semiBold: "SairaCondensed-SemiBold",
    bold: "SairaCondensed-Bold",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.sairaCondensed,
}
