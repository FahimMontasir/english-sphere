import React, { useState } from "react"
import { StyleProp, ViewStyle } from "react-native"
import Fast, { FastImageProps, ImageStyle, Priority, ResizeMode } from "react-native-fast-image"
import { Skeleton } from "./Skeleton"

const errorImage = require("../../assets/images/sad-face.png")

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
  children,
  ...rest
}: IFastImage) => {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Fast
      {...rest}
      style={style}
      source={
        isError
          ? errorImage
          : {
              uri,
              priority,
            }
      }
      resizeMode={resizeMode}
      onError={() => setIsError(true)}
      onLoadStart={() => setIsLoading(true)}
      onLoadEnd={() => setIsLoading(false)}
    >
      {children}
      {isLoading && !children && <Skeleton style={$withoutChildrenSkelton} />}
      {isLoading && children && <Skeleton style={$childrenSkelton} />}
    </Fast>
  )
}

const $withoutChildrenSkelton: ViewStyle = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  borderRadius: 0,
}
const $childrenSkelton: ViewStyle = {
  width: "100%",
  height: "100%",
  position: "absolute",
  overflow: "hidden",
  borderRadius: 0,
}
