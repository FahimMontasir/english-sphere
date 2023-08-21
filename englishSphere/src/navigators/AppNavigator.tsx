/**
 * The app navigator is used for the primary
 * navigation flows of this app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import * as Screens from "src/screens"
import Config from "../config"
import { useStores } from "../models"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import api from "src/services/api"
import useNotificationEvents from "src/services/pushNotification/useEvents"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */

export type AppStackParamList = {
  // 🔥 Your screens go here
  Login: undefined
  Welcome: undefined
  Home: undefined
  Account: undefined
  Chat: undefined
  ChatReq: undefined
  Message: undefined
  LeaderBoard: undefined
  Material: undefined
  MaterialDetails: undefined
  LiveStreaming: undefined
  InstaTalk: undefined
  PrivacyPolicy: undefined
  // APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    userStore: { isAuthenticated, authToken },
  } = useStores()

  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  useNotificationEvents(navigation)

  if (isAuthenticated) {
    api.defaults.headers.common.Authorization = authToken
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_bottom",
      }}
      initialRouteName={isAuthenticated ? "Home" : "Welcome"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={Screens.HomeScreen} />
          <Stack.Screen name="Account" component={Screens.AccountScreen} />
          <Stack.Screen name="Chat" component={Screens.ChatScreen} />
          <Stack.Screen name="ChatReq" component={Screens.ChatReqScreen} />
          <Stack.Screen name="Message" component={Screens.MessageScreen} />
          <Stack.Screen name="LeaderBoard" component={Screens.LeaderBoardScreen} />
          <Stack.Screen name="Material" component={Screens.MaterialScreen} />
          <Stack.Screen name="MaterialDetails" component={Screens.MaterialDetailsScreen} />
          <Stack.Screen name="LiveStreaming" component={Screens.LiveStreamingScreen} />
          <Stack.Screen name="InstaTalk" component={Screens.InstaTalkScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
          <Stack.Screen name="PrivacyPolicy" component={Screens.PrivacyPolicyScreen} />
        </>
      )}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
