import { router, type Href } from "expo-router";
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

import { Container } from "@_latest-es/ui/native/container";
import { NAV_THEME } from "@_latest-es/ui/native/theme";
import { useColorScheme } from "@_latest-es/ui/native/use-color-scheme";

import { useMaterialsQuery } from "../api/queries";
import { MaterialCard } from "../components/material-card";
import type { LearningMaterial } from "../types";

export function MaterialsScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
  const { data, error, isPending } = useMaterialsQuery();

  function openMaterial(material: LearningMaterial) {
    router.push(`/materials/${material.id}` as Href);
  }

  if (isPending) {
    return (
      <Container>
        <View style={styles.centered} testID="materials-loading">
          <ActivityIndicator color={theme.primary} />
          <Text style={{ color: theme.text }}>Loading learning materials…</Text>
        </View>
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container>
        <View style={styles.centered} testID="materials-error">
          <Text style={[styles.errorTitle, { color: theme.notification }]}>
            Materials unavailable
          </Text>
          <Text style={[styles.errorBody, { color: theme.text }]}>{error?.message}</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        contentContainerStyle={styles.page}
        data={data.recent}
        keyExtractor={(material) => material.id}
        ListHeaderComponent={
          <>
            <Text style={[styles.eyebrow, { color: theme.primary }]}>ENGLISH SPHERE</Text>
            <Text style={[styles.pageTitle, { color: theme.text }]}>
              Basic English for Speaking
            </Text>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Important Materials</Text>
            <ScrollView
              contentContainerStyle={styles.importantList}
              horizontal
              showsHorizontalScrollIndicator={false}
              testID="important-materials"
            >
              {data.important.map((material) => (
                <MaterialCard
                  compact
                  key={material.id}
                  material={material}
                  onPress={() => openMaterial(material)}
                />
              ))}
            </ScrollView>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Materials</Text>
          </>
        }
        renderItem={({ item }) => (
          <MaterialCard material={item} onPress={() => openMaterial(item)} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        testID="materials-list"
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
    flex: 1,
    gap: 12,
    justifyContent: "center",
    padding: 24,
  },
  errorBody: {
    opacity: 0.72,
    textAlign: "center",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  importantList: {
    gap: 12,
    paddingRight: 16,
  },
  page: {
    padding: 16,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 28,
  },
  separator: {
    height: 12,
  },
});
