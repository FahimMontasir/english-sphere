import { Button, Column, Host, Text as ExpoUIText } from "@expo/ui";
import { View, ScrollView, StyleSheet } from "react-native";

import { Container } from "@/components/container";
import { SignIn } from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";
import { authClient } from "@/lib/auth-client";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/use-color-scheme";

export default function Home() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;
  const { data: session } = authClient.useSession();

  return (
    <Container>
      <ScrollView style={styles.scrollView} contentInsetAdjustmentBehavior="never">
        <View style={styles.content}>
          <Host style={styles.titleHost}>
            <ExpoUIText
              textStyle={{
                color: theme.text,
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              BETTER T STACK
            </ExpoUIText>
          </Host>

          {session?.user ? (
            <View
              style={[styles.userCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              <Host style={styles.userHeader} matchContents={{ vertical: true }}>
                <Column spacing={8}>
                  <ExpoUIText textStyle={{ color: theme.text, fontSize: 16 }}>
                    {`Welcome, ${session.user.name}`}
                  </ExpoUIText>
                  <ExpoUIText
                    textStyle={{ color: theme.text, fontSize: 14 }}
                    style={{ opacity: 0.7 }}
                  >
                    {session.user.email}
                  </ExpoUIText>
                </Column>
              </Host>
              <Host matchContents={{ vertical: true }}>
                <Button
                  label="Sign Out"
                  variant="outlined"
                  onPress={() => {
                    authClient.signOut();
                  }}
                />
              </Host>
            </View>
          ) : null}

          {!session?.user && (
            <>
              <SignIn />
              <SignUp />
            </>
          )}
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 32,
  },
  titleHost: {
    alignSelf: "stretch",
    height: 34,
    marginBottom: 24,
  },
  userCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
  },
  userHeader: {
    marginBottom: 8,
  },
  paymentActions: {
    marginTop: 12,
  },
  statusCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
  },
  cardTitleHost: {
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusIndicator: {
    height: 8,
    width: 8,
  },
  statusContent: {
    flex: 1,
  },
  privateDataCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
  },
});
