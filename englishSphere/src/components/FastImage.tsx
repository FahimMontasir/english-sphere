import React, { useState } from "react"
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
}: IFastImage) => {
  const [fallbackUri, setFallbackUri] = useState(uri)

  return (
    <Fast
      {...rest}
      style={style}
      source={{
        uri: fallbackUri,
        priority,
      }}
      resizeMode={resizeMode}
      onError={() => setFallbackUri("https://serpstat.com/files/img/34/1676542462.4999.png")}
    />
  )
}
