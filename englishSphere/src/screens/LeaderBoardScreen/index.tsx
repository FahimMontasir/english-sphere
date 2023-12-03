import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { useInfiniteQuery } from "react-query"
import Toast from "react-native-toast-message"
import { AppStackScreenProps } from "src/navigators"
import {
  Button,
  EmptyState,
  Icon,
  Modal,
  Screen,
  Text,
  TextField,
  Tile,
  TileSkeleton,
} from "src/components"
import { colors, spacing } from "src/theme"
import { ContentStyle, FlashList } from "@shopify/flash-list"
import { useLeaderBoard } from "./useLeaderBoard"
import { UserApi } from "src/services/api/user"

export const LeaderBoardScreen: FC<AppStackScreenProps<"LeaderBoard">> = observer(
  function LeaderBoardScreen(_props) {
    const { navigation } = _props

    const { state, updateValue } = useLeaderBoard()

    const { data, fetchNextPage, isFetching, isLoading, hasNextPage, refetch } = useInfiniteQuery(
      "searchLead",
      ({ pageParam = 1 }) => UserApi.getLeadSearch({ ...state, page: pageParam }),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.meta.isLastPage) {
            return undefined
          } else {
            return lastPage.meta.page + 1
          }
        },
        staleTime: Infinity,
        // keepPreviousData: true,
        onError: () => {
          Toast.show({
            type: "error",
            text1: "Hey, something went wrong!",
          })
        },
      },
    )

    const handleSearch = () => {
      if (state.searchTerm.length < 3) {
        updateValue("isSearchError", true)
      } else {
        refetch()
      }
    }

    return (
      <Screen contentContainerStyle={$root} preset="fixed" safeAreaEdges={["top"]}>
        <FlashList
          ListHeaderComponent={
            <TextField
              value={state.searchTerm}
              onChangeText={(t) => {
                updateValue("searchTerm", t)
                if (state.searchTerm.length === 2 && state.isSearchError) {
                  updateValue("isSearchError", false)
                }
              }}
              status={state.isSearchError ? "error" : isFetching ? "disabled" : undefined}
              helper={
                state.isSearchError
                  ? "You have to use at least 3 characters."
                  : isFetching && !!state.searchTerm.length
                  ? "Searching..."
                  : undefined
              }
              containerStyle={$searchInputWrapper}
              placeholderTx="leaderBoardScreen.searchPlaceholder"
              RightAccessory={(props) => (
                <Icon
                  disabled={isFetching || state.isSearchError || isLoading}
                  onPress={handleSearch}
                  containerStyle={props.style}
                  size={25}
                  icon="searchUser"
                />
              )}
              LeftAccessory={(props) => (
                <Icon
                  onPress={() => updateValue("modalVisible", true)}
                  containerStyle={props.style}
                  icon="filter"
                  size={25}
                />
              )}
            />
          }
          contentContainerStyle={$flatListContentContainer}
          ItemSeparatorComponent={() => <View style={$flashListItemSeparator} />}
          estimatedItemSize={60}
          data={data?.pages.flatMap((page) => page.data)}
          keyExtractor={(item) => item._id.toString()}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage()
            }
          }}
          // onEndReachedThreshold={0.10}
          renderItem={({ item }) => (
            <Tile
              onPress={() => navigation.navigate("UserDetails", { userId: item._id })}
              imgUri={item.imageUrl}
              heading={item.fullName}
              badges={item.badges}
              rightCaption={item.country?.name}
              upVotes={item.upVotes}
            />
          )}
          ListEmptyComponent={() =>
            isLoading ? (
              <TileSkeleton elemCount={10} />
            ) : !isFetching ? (
              <EmptyState preset="generic" />
            ) : null
          }
          ListFooterComponent={() => (isFetching && hasNextPage ? <TileSkeleton /> : null)}
          showsVerticalScrollIndicator={false}
        />

        <Modal
          modalVisible={state.modalVisible}
          setModalVisible={(v) => updateValue("modalVisible", !!v)}
        >
          <View style={$modalContainer}>
            <Text text="Filter By:" preset="heading" />
            <TextField
              value={state.gender}
              onSelect={(v) => updateValue("gender", v)}
              selectOptions={[{ value: "male" }, { value: "female" }, { value: "unknown" }]}
              preset="select"
              inputMode="text"
              placeholder="Select a gender"
              RightAccessory={(p) => <Icon icon="view" style={p.style} color={colors.textDim} />}
            />
            <TextField
              value={state.country}
              onChangeText={(t) => updateValue("country", t)}
              inputMode="text"
              placeholder="Type a country name"
            />
            <TextField
              value={state.interests}
              onChangeText={(t) => updateValue("interests", t)}
              inputMode="text"
              placeholder="Type an interest"
            />

            <Text text="Sort By:" preset="heading" />
            <View style={$sortByContainer}>
              <TextField
                containerStyle={$sortInputContainer}
                value={state.sortBy}
                onSelect={(v) => updateValue("sortBy", v)}
                selectOptions={[
                  { value: "upVotes" },
                  { value: "downVotes" },
                  { value: "age" },
                  { value: "date" },
                ]}
                preset="select"
                inputMode="text"
                placeholder="Select a value"
                RightAccessory={(p) => <Icon icon="view" style={p.style} color={colors.textDim} />}
              />
              <TextField
                containerStyle={$sortInputContainer}
                value={state.sortOrder}
                onSelect={(v) => updateValue("sortOrder", v)}
                selectOptions={[{ value: "asc" }, { value: "desc" }]}
                preset="select"
                inputMode="text"
                placeholder="Select a order"
                RightAccessory={(p) => <Icon icon="view" style={p.style} color={colors.textDim} />}
              />
            </View>
            <Button
              text="Submit"
              preset="reversed"
              onPress={() => updateValue("modalVisible", false)}
            />
          </View>
        </Modal>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  marginHorizontal: spacing.sm,
}

const $searchInputWrapper: ViewStyle = { marginTop: spacing.md, marginBottom: spacing.md }

const $flashListItemSeparator: ViewStyle = { marginTop: 10 }

const $flatListContentContainer: ContentStyle = { paddingBottom: spacing.xl }

const $modalContainer: ViewStyle = {
  marginTop: spacing.xl,
  gap: spacing.sm,
  marginBottom: spacing.md,
}

const $sortByContainer: ViewStyle = { flexDirection: "row", columnGap: spacing.sm }
const $sortInputContainer: ViewStyle = { flex: 1 }
