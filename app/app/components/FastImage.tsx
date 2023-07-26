import React from "react"
import { StyleProp } from "react-native"
import Fast, { FastImageProps, ImageStyle, Priority } from "react-native-fast-image"

export interface FastImageStyle extends ImageStyle {}

interface IFastImage extends FastImageProps {
  style: StyleProp<ImageStyle>
  uri: string
  priority?: Priority
}

export const FastImage = ({ style, uri, priority = "normal", ...rest }: IFastImage) => (
  <Fast
    {...rest}
    style={style}
    source={{
      uri,
      priority,
    }}
    resizeMode={Fast.resizeMode.cover}
  />
)
