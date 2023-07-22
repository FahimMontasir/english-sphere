import { colors } from "app/theme"
import { StyleSheet, type ColorSchemeName } from "react-native"
import { ColorsPropType } from "react-native-marked/dist/typescript/theme/colors"
import { SpacingKeysType } from "react-native-marked/dist/typescript/theme/spacing"
import { MarkedStyles } from "react-native-marked/dist/typescript/theme/types"

const $markdownColors: Record<"light" | "dark", ColorsPropType> = {
  light: {
    background: colors.background, // not works but required
    code: "#f6f8fa",
    link: "#58a6ff",
    text: colors.text,
    border: "#d0d7de",
  },
  dark: {
    background: "#000000",
    code: "#161b22",
    link: "#58a6ff",
    text: "red",
    border: "#30363d",
  },
}

const $markdownSpacing: Record<SpacingKeysType, number> = {
  xs: 2,
  s: 4,
  m: 8,
  l: 16,
}

const getFontStyles = (mdColors: ColorsPropType) => {
  return StyleSheet.create({
    heading: {
      color: mdColors.text,
      fontWeight: "bold",
      letterSpacing: 2,
    },
    regular: {
      color: mdColors.text,
      fontSize: 17,
      lineHeight: 24,
    },
  })
}

const getMarkdownStyles = ({ colorScheme }: { colorScheme?: ColorSchemeName }): MarkedStyles => {
  const mdColors = { ...$markdownColors[colorScheme || "light"] }
  const mdSpacing = { ...$markdownSpacing }

  const fontStyle = getFontStyles(mdColors)
  const styles = StyleSheet.create<MarkedStyles>({
    blockquote: {
      borderLeftColor: mdColors.border,
      borderLeftWidth: mdSpacing.s,
      opacity: 0.8,
      paddingLeft: mdSpacing.l,
    },
    code: {
      backgroundColor: mdColors.code,
      minWidth: "100%",
      padding: mdSpacing.l,
    },
    codespan: {
      ...fontStyle.regular,
      backgroundColor: mdColors.code,
      fontStyle: "italic",
      fontWeight: "300",
    },
    em: {
      ...fontStyle.regular,
      fontStyle: "italic",
    },
    h1: {
      ...fontStyle.heading,
      borderBottomColor: mdColors.border,
      borderBottomWidth: 1,
      fontSize: 24,
      marginVertical: mdSpacing.m,
      paddingBottom: mdSpacing.s,
    },
    h2: {
      ...fontStyle.heading,
      borderBottomColor: mdColors.border,
      borderBottomWidth: 1,
      fontSize: 22,
      marginVertical: mdSpacing.m,
      paddingBottom: mdSpacing.s,
    },
    h3: {
      ...fontStyle.heading,
      fontSize: 20,
      marginVertical: mdSpacing.s,
    },
    h4: {
      ...fontStyle.heading,
      fontSize: 18,
      marginVertical: mdSpacing.s,
    },
    h5: {
      ...fontStyle.regular,
      ...fontStyle.heading,
      marginVertical: mdSpacing.xs,
    },
    h6: {
      ...fontStyle.heading,
      fontSize: 14,
      marginVertical: mdSpacing.xs,
    },
    hr: {
      borderBottomColor: mdColors.border,
      borderBottomWidth: 1,
      marginVertical: mdSpacing.s,
    },
    image: {
      height: 200,
      marginVertical: -15,
      resizeMode: "contain",
      width: "100%",
    },
    li: {
      ...fontStyle.regular,
      flexShrink: 1,
    },
    link: {
      ...fontStyle.regular,
      color: mdColors.link,
      fontStyle: "italic",
    },
    paragraph: {
      ...fontStyle.regular,
      paddingVertical: mdSpacing.m,
    },
    strikethrough: {
      ...fontStyle.regular,
      textDecorationLine: "line-through",
      textDecorationStyle: "solid",
    },
    strong: {
      ...fontStyle.regular,
      fontWeight: "bold",
    },
    table: {
      borderColor: mdColors.border,
      borderWidth: 1,
    },
    tableCell: {
      padding: mdSpacing.s,
    },
    tableRow: {
      flexDirection: "row",
    },
    text: {
      ...fontStyle.regular,
    },
  })

  return styles
}

export default getMarkdownStyles
