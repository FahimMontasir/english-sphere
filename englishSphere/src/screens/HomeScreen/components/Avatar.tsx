import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { FastImage, FastImageStyle } from "src/components/FastImage"
import { storageEmitter } from "src/services/pushNotification"
import { HandleNotiData } from "src/services/pushNotification/handleNotificationData"
import { Text } from "src/components"
import { colors } from "src/theme"

export interface AvatarProps extends TouchableOpacityProps {
  navigation: any
  imageUrl: string
}

export const Avatar = observer(function Avatar({ navigation, imageUrl }: AvatarProps) {
  const [notiCount, setNotiCount] = useState(HandleNotiData.getTotalUnread())

  useEffect(() => {
    const handleStorageChange = (key: string) => {
      if (key === "notification") {
        // reload
        setNotiCount(HandleNotiData.getTotalUnread())
      }
    }

    storageEmitter.on("change", handleStorageChange)

    return () => {
      storageEmitter.off("change", handleStorageChange)
    }
  }, [])

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Account")}>
      <FastImage uri={imageUrl} priority="high" style={$avatarImg} />
      {notiCount > 0 ? <Text style={$notiCount} text={String(notiCount)} /> : null}
    </TouchableOpacity>
  )
})

const $avatarImg: FastImageStyle = { width: 50, height: 50, borderRadius: 50 }

const $notiCount: TextStyle = {
  position: "absolute",
  top: -1,
  left: -4,
  backgroundColor: colors.error,
  borderRadius: 15,
  paddingHorizontal: 7.5,
  paddingTop: 13,
  fontSize: 12,
  lineHeight: 5,
  textAlign: "center",
  color: colors.palette.white,
}
