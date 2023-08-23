import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TextStyle, View, ViewStyle } from "react-native"
import { Button, Tile, Text, Icon, Modal, AutoImage } from "src/components"
import { spacing } from "src/theme"
import { useStores } from "src/models"
import { HandleNotiData } from "src/services/pushNotification/handleNotificationData"
import { ContentStyle, FlashList } from "@shopify/flash-list"
import { fromNow } from "src/utils/formatDate"
import { FastImage, FastImageStyle } from "src/components/FastImage"
import { useNotiLogs } from "./useNotiLogs"
import { NavigationProp } from "@react-navigation/native"
import { AppStackParamList } from "src/navigators"

interface INotiLogs {
  navigation: NavigationProp<AppStackParamList>
}

const { width } = Dimensions.get("screen")

const NotiLogs: FC<INotiLogs> = observer(function NotiLogs({ navigation }) {
  const {
    userStore: { toggleLang, lang },
  } = useStores()

  const {
    notifications,
    clickedItem,
    modalVisible,
    handleNotiRoutes,
    setModalVisible,
    setNotifications,
  } = useNotiLogs(navigation)

  return (
    <>
      <View style={$logsHeadingContainer}>
        <Text tx="accountScreen.logNHistory" preset="heading" />
        <Icon
          onPress={toggleLang}
          icon={lang === "en" ? "ban" : "eng"}
          size={30}
          activeOpacity={0.9}
        />
      </View>
      <FlashList
        contentContainerStyle={$flatListContentContainer}
        estimatedItemSize={80}
        data={notifications}
        renderItem={({ item }) => (
          <Tile
            isNoti
            msg={item.data?.body || item.notification?.body}
            imgUri={item.data.imageUrl}
            heading={item.data?.title || item.notification?.title}
            rightCaption={fromNow(item.sentTime)}
            unread={item.unread}
            onPress={() => handleNotiRoutes(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={$flashListItemSeparator} />}
        ListFooterComponent={
          notifications.length === 15 ? (
            <Button
              disabled={notifications.length > 15}
              style={$loadBtn}
              tx="accountScreen.loadBtn"
              onPress={() => setNotifications(HandleNotiData.load(true))}
            />
          ) : null
        }
        ListFooterComponentStyle={$footerContainer}
      />

      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <View style={$modalHeadContainer}>
          <FastImage
            uri={clickedItem?.data.imageUrl || "https://avatars.githubusercontent.com/u/76746363"}
            style={$avatarImg}
          />
          <View>
            <Text
              text={clickedItem?.data.title || clickedItem?.notification.title}
              preset="heading"
            />
            {clickedItem?.data.subtitle ? (
              <Text text={clickedItem?.data.subtitle} style={$modalSubtitle} />
            ) : null}
            {clickedItem?.sentTime ? (
              <Text text={fromNow(clickedItem.sentTime)} style={$modalSubtitle} />
            ) : null}
          </View>
        </View>

        {clickedItem?.data.banner ? (
          // <FastImage uri={clickedItem.data.banner} style={$bannerImage} resizeMode="contain" />
          <AutoImage source={{ uri: clickedItem.data.banner }} maxWidth={width - spacing.md * 2} />
        ) : null}

        <Text
          style={$modalBodyText}
          text={clickedItem?.data.body || clickedItem?.notification.body}
          preset="subheading"
        />
        {clickedItem?.data.bigText ? (
          <Text text={clickedItem?.data.bigText} preset="subheading" />
        ) : null}
        <View style={$bottomPaddingFix} />
      </Modal>
    </>
  )
})

export default NotiLogs

const $logsHeadingContainer: TextStyle = {
  marginHorizontal: spacing.xs,
  marginBottom: spacing.sm,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $flatListContentContainer: ContentStyle = {
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.sm,
}

const $flashListItemSeparator: ViewStyle = { marginTop: 10 }

const $loadBtn: ViewStyle = { width: 120 }

const $footerContainer: ViewStyle = { alignSelf: "center", marginTop: spacing.md }

const $modalHeadContainer: ViewStyle = {
  flexDirection: "row",
  gap: spacing.xxs,
  marginBottom: spacing.sm,
  width: "90%",
}
const $modalSubtitle: TextStyle = { fontSize: 12, marginTop: -5 }
const $modalBodyText: TextStyle = { marginTop: spacing.sm }
const $avatarImg: FastImageStyle = {
  width: 40,
  height: 40,
  borderRadius: 40,
}

const $bottomPaddingFix: ViewStyle = { paddingBottom: spacing.xxl }
