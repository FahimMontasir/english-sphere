import * as React from "react"
import { ComponentType } from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"

export type IconTypes = keyof typeof iconRegistry

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper: ComponentType<TouchableOpacityProps | any> = isPressable ? TouchableOpacity : View

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Image
        style={[
          $imageStyle,
          color ? { tintColor: color } : null,
          size ? { width: size, height: size } : null,
          $imageStyleOverride,
        ]}
        source={iconRegistry[icon]}
      />
    </Wrapper>
  )
}

export const iconRegistry = {
  clap: require("../../assets/icons/clap.png"),
  debug: require("../../assets/icons/debug.png"),
  pin: require("../../assets/icons/pin.png"),
  settings: require("../../assets/icons/settings.png"),
  hidden: require("../../assets/icons/hidden.png"),
  view: require("../../assets/icons/view.png"),
  check: require("../../assets/icons/check.png"),
  github: require("../../assets/icons/github.png"),
  bell: require("../../assets/icons/bell.png"),
  x: require("../../assets/icons/x.png"),
  leaderBoard: require("../../assets/icons/leaderboard.png"),
  instaTalk: require("../../assets/icons/instatalk.png"),
  camera: require("../../assets/icons/camera.png"),
  pen: require("../../assets/icons/pen.png"),
  chat: require("../../assets/icons/chat.png"),
  plus: require("../../assets/icons/plus.png"),
  searchUser: require("../../assets/icons/search-user.png"),
  chatRequest: require("../../assets/icons/chat-request.png"),
  send: require("../../assets/icons/send.png"),
  endCall: require("../../assets/icons/end-call.png"),
  dot: require("../../assets/icons/dot.png"),
  logout: require("../../assets/icons/logout.png"),
  ban: require("../../assets/icons/ban.png"),
  eng: require("../../assets/icons/eng.png"),
  google: require("../../assets/icons/google.png"),
  guard: require("../../assets/icons/guard.png"),
  diamond: require("../../assets/icons/diamond.png"),
  gold: require("../../assets/icons/gold.png"),
  silver: require("../../assets/icons/silver.png"),
}

const $imageStyle: ImageStyle = {
  resizeMode: "contain",
}
