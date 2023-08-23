import React from "react"
import { StyleProp, ViewStyle, Modal as RNModal, View, ViewProps, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import { Icon } from "./Icon"
import { colors, spacing } from "src/theme"

export type ModalProps = ViewProps & {
  style?: StyleProp<ViewStyle>
  modalVisible: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

export const Modal = observer(function Modal(props: ModalProps) {
  const { style, modalVisible, setModalVisible, children, ...others } = props
  const $styles = [$container, style]

  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <View style={$styles} {...others}>
        <View style={$iconContainer}>
          <Icon
            icon="x"
            onPress={() => setModalVisible(false)}
            containerStyle={$iconContentContainer}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </View>
    </RNModal>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  paddingHorizontal: spacing.md,
}

const $iconContainer: ViewStyle = {
  marginTop: spacing.md,
  alignSelf: "flex-end",
  marginBottom: spacing.xs,
}

const $iconContentContainer: ViewStyle = {
  backgroundColor: colors.palette.white,
  borderRadius: spacing.xl,
  padding: spacing.xxs,
}
