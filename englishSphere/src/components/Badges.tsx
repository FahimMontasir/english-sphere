import React from "react"
import { observer } from "mobx-react-lite"
import { StyleProp, ViewStyle, View, ViewProps, TextStyle } from "react-native"
import { Icon, IconTypes } from "./Icon"
import { Text } from "./Text"
import { spacing } from "src/theme"

export type BadgesProps = ViewProps & {
  style?: StyleProp<ViewStyle>
  moreTextStyle?: StyleProp<TextStyle>
  badges: string[]
  badgeSize?: number
  isNoLimit?: boolean
}

export const Badges = observer(function Badges(props: BadgesProps) {
  const { badges, badgeSize = 50, style, moreTextStyle, isNoLimit = false, ...others } = props
  const $styles = [$badgesContainer, style]
  const $moreText = [$moreBadges, moreTextStyle]
  return (
    <>
      {/* show upto 4 badges then add show the count + */}
      {!!badges.length && (
        <View style={$styles} {...others}>
          {isNoLimit ? (
            <>
              {badges.map((badge, index) => (
                <Icon key={index} icon={badge as IconTypes} size={badgeSize} />
              ))}
            </>
          ) : (
            <>
              {badges.slice(0, 4).map((badge, index) => (
                <Icon key={index} icon={badge as IconTypes} size={badgeSize} />
              ))}
              {badges.length > 4 && <Text text={`+${badges.length - 4}`} style={$moreText} />}
            </>
          )}
        </View>
      )}
    </>
  )
})

const $badgesContainer: ViewStyle = {
  flexDirection: "row",
  gap: spacing.xs,
  alignItems: "center",
}

const $moreBadges: TextStyle = { marginLeft: -10, alignSelf: "flex-end" }
