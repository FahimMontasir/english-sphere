import React from "react"
import { StyleProp } from "react-native"
import Fast, { FastImageProps, ImageStyle, Priority, ResizeMode } from "react-native-fast-image"

export interface FastImageStyle extends ImageStyle {}

interface IFastImage extends FastImageProps {
  style: StyleProp<ImageStyle>
  uri: string
  priority?: Priority
  resizeMode?: ResizeMode
}

export const FastImage = ({
  style,
  uri,
  priority = "normal",
  resizeMode = "cover",
  ...rest
}: IFastImage) => (
  <Fast
    {...rest}
    style={style}
    source={{
      uri,
      priority,
    }}
    resizeMode={resizeMode}
  />
)
