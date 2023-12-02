import React from "react"
import { ImageBackground, ImageStyle, View, ViewStyle } from "react-native"
import { Text } from "src/components"
import { FastImage, FastImageStyle } from "src/components/FastImage"
import { IUser } from "src/services/api/user"
import { colors, spacing } from "src/theme"
import { truncateText } from "src/utils/formatString"

interface ICover {
  user?: IUser
}

const Cover = ({ user }: ICover) => {
  return (
    <>
      <ImageBackground
        style={$coverContainer}
        source={
          user?.coverUrl
            ? { uri: user.coverUrl }
            : require("../../../../assets/images/bootsplash_logo_original.png")
        }
        resizeMode="cover"
      >
        <View style={$userNameContainer}>
          <Text
            text={truncateText(user?.fullName || "", 25, ".")}
            preset="subheading"
            numberOfLines={1}
          />
        </View>

        <FastImage uri={user?.imageUrl || ""} priority="high" style={$profilePhotoContainer} />
      </ImageBackground>
    </>
  )
}

export default Cover

const $coverContainer: ImageStyle = {
  height: 150,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
}

const $userNameContainer: ViewStyle = {
  backgroundColor: colors.palette.transparentGray,
  width: 165,
  height: 40,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: spacing.xs,
  borderTopRightRadius: spacing.md,
}

const $profilePhotoContainer: FastImageStyle = {
  width: 100,
  height: 100,
  marginBottom: -25,
  marginRight: spacing.md,
  justifyContent: "flex-end",
  borderRadius: 50,
  backgroundColor: colors.palette.white,
}
