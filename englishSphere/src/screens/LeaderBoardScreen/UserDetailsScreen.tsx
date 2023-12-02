import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { useQuery } from "react-query"
import { AppStackScreenProps } from "src/navigators"
import { Badges, Screen, Text, UpDown, VisitProfileSkeleton } from "src/components"
import { UserApi } from "src/services/api/user"
import Cover from "./components/Cover"
import { TextStyle, View, ViewStyle } from "react-native"
import { spacing } from "src/theme"
import { Element } from "../AccountScreen/components/Element"

export const UserDetailsScreen: FC<AppStackScreenProps<"UserDetails">> = observer(
  function UserDetailsScreen(_props) {
    const { route } = _props
    const userId = route.params.userId
    const { data, isLoading } = useQuery(["userDetails", userId], () =>
      UserApi.getLeadSearchUser(userId),
    )

    return (
      <Screen
        StatusBarProps={{
          translucent: true,
          hidden: true,
        }}
        contentContainerStyle={$contentContainerStyle}
        preset="fixed"
      >
        {isLoading && !data ? (
          <VisitProfileSkeleton />
        ) : (
          <>
            <Cover user={data} />
            <View style={$withoutCoverContainer}>
              <UpDown
                upVotes={data?.upVotes}
                downVotes={data?.downVotes}
                style={$upDownContainer}
              />
              {/* add chat req/ or friend req button here */}
              {!!data?.badges?.length && (
                <>
                  <Text tx="accountScreen.badge" preset="heading" />
                  <Badges isNoLimit={true} badges={data.badges} style={$badgesContainer} />
                </>
              )}

              {!!data?.interests.length && (
                <>
                  <Text tx="accountScreen.skill" preset="heading" />
                  <View style={$skillsContainer}>
                    {data?.interests?.map((v) => (
                      <Element value={v} key={v} />
                    ))}
                  </View>
                </>
              )}
            </View>
          </>
        )}
      </Screen>
    )
  },
)

const $contentContainerStyle: ViewStyle = {
  flex: 1,
}

const $withoutCoverContainer: ViewStyle = { marginHorizontal: spacing.sm }

const $upDownContainer: TextStyle = {
  marginTop: spacing.xxs,
  marginBottom: spacing.md,
}

const $badgesContainer: ViewStyle = {
  marginBottom: spacing.md,
  marginLeft: spacing.xs,
}

const $skillsContainer: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  columnGap: 5,
  rowGap: 10,
  marginTop: 10,
  marginLeft: spacing.xs,
}
