import React, { useState } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
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
  ...rest
}: IFastImage) => {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <View>
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
      />
      {isLoading && <Skeleton style={[style, $skeleton]} />}
    </View>
  )
}
const $skeleton: ViewStyle = { position: "absolute" }
