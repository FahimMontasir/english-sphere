import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, NativeSyntheticEvent, NativeScrollEvent, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "src/navigators"
import { Icon, Screen, Text, TextField } from "src/components"
import { colors, spacing } from "src/theme"
import { Message } from "./components/Message"
import { FastImage, FastImageStyle } from "src/components/FastImage"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "src/models"

const data = [
  { replay: false, message: "hi bro", timestamps: "10m" },
  { replay: true, message: "whats up! i doing great.", timestamps: "5m" },
  {
    replay: false,
    message: "lo po do ko go oo aha pad de re ki kos ki su bo ji na ",
    timestamps: "2m",
  },
  {
    replay: true,
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae distinctio alias, eum laudantium nisi architecto est, accusamus quam excepturi commodi ea ullam accusantium iusto et id qui animi officiis fugiat autem temporibus quas. Perspiciatis maiores aut, aliquam, omnis labore consequatur unde consequuntur veniam architecto ex ipsum! Eveniet temporibus quisquam eligendi? ",
    timestamps: "1m",
  },
  {
    replay: false,
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae distinctio alias, eum laudantium nisi architecto est, accusamus quam excepturi commodi ea ullam accusantium iusto et id qui animi officiis fugiat autem temporibus quas. Perspiciatis maiores aut, aliquam, omnis labore consequatur unde consequuntur veniam architecto ex ipsum! Eveniet temporibus quisquam eligendi? ",
    timestamps: "now",
  },
]

export const MessageScreen: FC<AppStackScreenProps<"Message">> = observer(function MessageScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const onPressTimeoutRef = useRef<any>(null)
  const flatListRef = useRef<FlatList | null>(null)

  const [offset, setOffset] = useState(0)
  const [messages, setMessages] = useState(data)
  const [text, setText] = useState("")

  const handleScrolling = () => {
    flatListRef.current?.scrollToEnd()
    flatListRef.current?.scrollToOffset({ offset: offset + 335 })
  }

  const sendMessage = () => {
    setMessages((prev) => [...prev, { message: text, replay: false, timestamps: "now" }])
    if (flatListRef.current) {
      handleScrolling()
    }
    setText("")
  }

  const onPressInHandler = () => {
    onPressTimeoutRef.current = setTimeout(handleScrolling, 200)
  }

  if (onPressTimeoutRef.current) {
    clearTimeout(onPressTimeoutRef.current)
  }

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    e.persist()
    setOffset((prev) => {
      if (e.nativeEvent?.contentOffset?.y) {
        return prev > Math.round(e.nativeEvent.contentOffset.y)
          ? prev
          : Math.round(e.nativeEvent.contentOffset.y)
      } else {
        return prev
      }
    })
  }

  useEffect(() => {
    const scrollToBottom = () => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd()
      }
    }

    // Scroll to the end after the component has been rendered
    const timeoutId = setTimeout(scrollToBottom, 200)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(onPressTimeoutRef.current)
    }
  }, [])

  return (
    <Screen contentContainerStyle={$contentContainer} preset="fixed" safeAreaEdges={["top"]}>
      <View style={$headerContainer}>
        <FastImage uri="https://i.pravatar.cc/300" style={$image} />
        <Text text="Fahim Montasir" preset="subheading" />
        <View style={$activeContainer}>
          <View style={$active} />
          <Text text="Active now" />
        </View>
      </View>

      <FlatList
        onScroll={handleOnScroll}
        ref={flatListRef}
        contentContainerStyle={$flatListContentContainer}
        data={messages}
        renderItem={({ item }) => (
          <Message replay={item.replay} message={item.message} timestamps={item.timestamps} />
        )}
      />

      <TextField
        onPressIn={onPressInHandler}
        value={text}
        onChangeText={(t) => setText(t)}
        inputWrapperStyle={$sendInputWrapper}
        RightAccessory={(props) => (
          <Icon onPress={sendMessage} containerStyle={props.style} icon="send" size={25} />
        )}
        autoCapitalize="none"
        placeholder="Message"
      />
    </Screen>
  )
})

const $contentContainer: ViewStyle = {
  flex: 1,
}

const $headerContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  margin: spacing.sm,
}

const $image: FastImageStyle = { height: 40, width: 40, borderRadius: 40 }

const $activeContainer: ViewStyle = { alignItems: "center" }

const $active: ViewStyle = {
  width: 10,
  height: 10,
  borderRadius: 10,
  backgroundColor: colors.palette.green,
}

const $sendInputWrapper: ViewStyle = {
  marginHorizontal: spacing.sm,
  marginVertical: spacing.md,
}

const $flatListContentContainer: ViewStyle = {
  flexGrow: 1,
  justifyContent: "flex-end",
}
