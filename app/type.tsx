import { StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function TypeScreen() {
  const params = useLocalSearchParams<{
    categoryId: string;
    categoryName: string;
  }>();
  const { categoryId, categoryName } = params;

  const handleTypeSelect = (type: "multiple" | "boolean", typeName: string) => {
    // Navigate to difficulty selection screen
    router.push({
      pathname: "/difficulty",
      params: {
        categoryId,
        categoryName,
        type,
        typeName,
      },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Select Answer Type
      </ThemedText>

      <ThemedText style={styles.categoryInfo}>
        Category: {categoryName}
      </ThemedText>

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => handleTypeSelect("multiple", "Multiple Choice")}
        >
          <ThemedText style={styles.typeText}>Multiple Choice</ThemedText>
          <ThemedText style={styles.typeDescription}>
            Choose from four possible answers
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => handleTypeSelect("boolean", "True / False")}
        >
          <ThemedText style={styles.typeText}>True / False</ThemedText>
          <ThemedText style={styles.typeDescription}>
            Answer true or false questions
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  categoryInfo: {
    fontSize: 16,
    marginBottom: 40,
    fontStyle: "italic",
  },
  buttonContainer: {
    width: "100%",
    gap: 20,
  },
  typeButton: {
    backgroundColor: "#0a7ea4",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  typeText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  typeDescription: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
});
