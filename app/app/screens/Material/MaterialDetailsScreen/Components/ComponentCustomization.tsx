import { Text } from "app/components"
import React, { ReactNode } from "react"
import { Image } from "react-native"
import type { ImageStyle, TextStyle } from "react-native"
import { Renderer } from "react-native-marked"
import type { RendererInterface } from "react-native-marked"

class CustomRenderer extends Renderer implements RendererInterface {
  image(uri: string, _alt?: string, _style?: ImageStyle): ReactNode {
    return <Image key={this.getKey()} style={_style} source={{ uri }} /> // TODO: use fast image
  }

  text(text: string, styles?: TextStyle): React.ReactNode {
    return <Text key={this.getKey()} style={styles} text={text} />
  }
}

export const markdownRenderer = new CustomRenderer()
