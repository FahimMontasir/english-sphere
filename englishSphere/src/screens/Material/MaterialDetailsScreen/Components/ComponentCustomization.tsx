import { Text } from "src/components"
import React, { ReactNode } from "react"
import type { ImageStyle, TextStyle } from "react-native"
import { Renderer } from "react-native-marked"
import type { RendererInterface } from "react-native-marked"
import { FastImage, FastImageStyle } from "src/components/FastImage"

class CustomRenderer extends Renderer implements RendererInterface {
  image(uri: string, _alt?: string, _style?: ImageStyle): ReactNode {
    return (
      <FastImage
        key={this.getKey()}
        style={_style as FastImageStyle}
        uri={uri}
        resizeMode="contain"
      />
    )
  }

  text(text: string, styles?: TextStyle): React.ReactNode {
    return <Text key={this.getKey()} style={styles} text={text} />
  }
}

export const markdownRenderer = new CustomRenderer()
