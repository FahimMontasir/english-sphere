import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Container } from "@_latest-es/ui/native/container";
import { NAV_THEME } from "@_latest-es/ui/native/theme";
import { useColorScheme } from "@_latest-es/ui/native/use-color-scheme";

import { useMaterialQuery } from "../api/queries";
import { formatMaterialMeta } from "../helpers/materials";

export function MaterialDetailsScreen() {
  const { materialId } = useLocalSearchParams<{ materialId: string }>();
  const { isDarkColorScheme } = useColorScheme();
  const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
  const { data: material, error, isPending } = useMaterialQuery(materialId);

  if (error) {
    return (
      <Container>
        <View style={styles.centered} testID="material-detail-error">
          <Text style={{ color: theme.notification }}>{error.message}</Text>
        </View>
      </Container>
    );
  }

  if (isPending || !material) {
    return (
      <Container>
        <View style={styles.centered} testID="material-detail-loading">
          <ActivityIndicator color={theme.primary} />
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.page} testID="material-detail">
        <Text style={[styles.meta, { color: theme.primary }]}>{formatMaterialMeta(material)}</Text>
        <Text style={[styles.title, { color: theme.text }]}>{material.title}</Text>
        <Text style={[styles.body, { color: theme.text }]}>{material.summary}</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: 18,
    lineHeight: 28,
    opacity: 0.82,
  },
  centered: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  meta: {
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  page: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 20,
    marginTop: 10,
  },
});
