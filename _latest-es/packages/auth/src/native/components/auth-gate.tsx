import type { PropsWithChildren } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Container } from "@_latest-es/ui/native/container";

import { authClient } from "../client";
import { AuthScreen } from "../screens/auth-screen";

export function AuthGate({ children }: PropsWithChildren) {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) {
    return (
      <Container>
        <View style={styles.loading} testID="auth-session-loading">
          <ActivityIndicator />
        </View>
      </Container>
    );
  }

  if (!session?.user) return <AuthScreen />;

  return children;
}

const styles = StyleSheet.create({
  loading: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
