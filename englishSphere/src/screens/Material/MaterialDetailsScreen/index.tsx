import React, { FC } from "react"
import Markdown from "react-native-marked"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { AppStackScreenProps } from "src/navigators"
import { Screen, Text } from "src/components"
import { colors, spacing } from "src/theme"
import getMarkdownStyles from "./styles/styleCustomization"
import { markdownRenderer } from "./Components/ComponentCustomization"
import { Drawer } from "./Components/Drawer"
import { FastImage, FastImageStyle } from "src/components/FastImage"
// import { useStores } from "app/models"

export const MaterialDetailsScreen: FC<AppStackScreenProps<"MaterialDetails">> = observer(
  function MaterialDetailsScreen(_props) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    return (
      <Drawer navigator={_props}>
        <Screen
          contentContainerStyle={$root}
          preset="fixed"
          StatusBarProps={{ hidden: true, translucent: true }}
        >
          <Markdown
            styles={getMarkdownStyles({ colorScheme: "light" })} // TODO: useColorScheme
            value={README_DATA}
            flatListProps={{
              initialNumToRender: 8,
              contentContainerStyle: $markdownContentContainer,
              ListHeaderComponent: (
                <>
                  <FastImage style={$coverImage} uri="https://i.pravatar.cc/600" />
                  <Text text="Heading from server" preset="heading" style={$headingText} />
                  <Text text="short description text will be placed here!! It will not be more than two line" />
                </>
              ),
            }}
            renderer={markdownRenderer}
          />
        </Screen>
      </Drawer>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $coverImage: FastImageStyle = {
  height: 150,
  marginHorizontal: -spacing.sm,
}

const $headingText: TextStyle = {
  fontSize: 24,
  marginTop: spacing.md,
}

const $markdownContentContainer: ViewStyle = {
  backgroundColor: colors.background,
  paddingHorizontal: spacing.sm,
  paddingBottom: spacing.md,
}

const README_DATA = `
  ![Jenkins pipeline](https://c2.staticflickr.com/8/7889/33202009658_11422b7f20_b.jpg) 
This image is so cool that i don not enven bo kio know
  ![Zap attach proxy](https://c2.staticflickr.com/8/7905/33202009438_8f367e20ec_o.png)
  ![SonarQube analysis](https://c2.staticflickr.com/8/7823/33202009548_e678128200_b.jpg)

  # Chromedriver installation notes
  ## Chromedriver installation notes
  ### Chromedriver installation notes
make sure that the [Chromedriver](https://chromedriver.chromium.org/) executable is installed in one of the directories that is 
on your path.  To see your path, type the following in a command line: 

Its essential goals:
* Just works, any platform.
* As simple as possible
* Minimal system requirements
* Fast and easy to install and to run
* High test coverage
* Multiple business domains
* Easy to maintain and improve
* Well documented
* High performance
* Illustrates maximum number of techniques
* Easy to get up to speed
  `
