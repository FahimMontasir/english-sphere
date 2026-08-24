import { Pressable, StyleSheet, Text, View } from "react-native";

import { NAV_THEME } from "@_latest-es/ui/native/theme";
import { useColorScheme } from "@_latest-es/ui/native/use-color-scheme";

import { formatMaterialMeta } from "../helpers/materials";
import type { LearningMaterial } from "../types";

interface MaterialCardProps {
  compact?: boolean;
  material: LearningMaterial;
  onPress: () => void;
}

export function MaterialCard({ compact = false, material, onPress }: MaterialCardProps) {
  const { isDarkColorScheme } = useColorScheme();
  const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
  const selector = `material-card-${material.id}-${compact ? "important" : "recent"}`;

  return (
    <Pressable
      accessibilityLabel={`Open ${material.title}`}
      accessibilityRole="button"
      nativeID={selector}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        compact && styles.compactCard,
        { backgroundColor: theme.card, borderColor: theme.border, opacity: pressed ? 0.75 : 1 },
      ]}
      testID={selector}
    >
      <View style={[styles.badge, { backgroundColor: theme.primary }]}>
        <Text style={styles.badgeText}>{formatMaterialMeta(material)}</Text>
      </View>
      <Text numberOfLines={compact ? 2 : 1} style={[styles.title, { color: theme.text }]}>
        {material.title}
      </Text>
      {!compact ? (
        <Text numberOfLines={2} style={[styles.summary, { color: theme.text }]}>
          {material.summary}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    marginBottom: 10,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 126,
    padding: 16,
  },
  compactCard: {
    minHeight: 138,
    width: 220,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.72,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
});
