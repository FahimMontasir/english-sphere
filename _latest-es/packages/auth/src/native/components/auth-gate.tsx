import { type PropsWithChildren, useEffect, useRef } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Container } from "@_latest-es/ui/native/container";

import { authClient } from "../client";
import { AuthScreen } from "../screens/auth-screen";

export function AuthGate({ children }: PropsWithChildren) {
  const { data: session, isPending } = authClient.useSession();
  const attemptedE2ESignIn = useRef(false);

  useEffect(() => {
    const email = process.env.EXPO_PUBLIC_E2E_BOOTSTRAP_EMAIL;
    const password = process.env.EXPO_PUBLIC_E2E_BOOTSTRAP_PASSWORD;

    if (isPending || session?.user || attemptedE2ESignIn.current || !email || !password) return;

    attemptedE2ESignIn.current = true;
    void authClient.signIn.email({ email, password });
  }, [isPending, session?.user]);

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
