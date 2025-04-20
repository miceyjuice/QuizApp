import { StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function DifficultyScreen() {
  const params = useLocalSearchParams<{
    categoryId: string;
    categoryName: string;
    type: string;
    typeName: string;
  }>();

  const { categoryId, categoryName, type, typeName } = params;

  const handleDifficultySelect = (difficulty: "easy" | "medium" | "hard") => {
    // Navigate to quiz screen with all parameters
    router.push({
      pathname: "/quiz",
      params: {
        categoryId,
        categoryName,
        type,
        difficulty,
      },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Select Difficulty
      </ThemedText>

      <ThemedView style={styles.infoContainer}>
        <ThemedText style={styles.infoText}>
          Category: {categoryName}
        </ThemedText>
        <ThemedText style={styles.infoText}>Type: {typeName}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.difficultyButton, styles.easyButton]}
          onPress={() => handleDifficultySelect("easy")}
        >
          <ThemedText style={styles.buttonText}>Easy</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.difficultyButton, styles.mediumButton]}
          onPress={() => handleDifficultySelect("medium")}
        >
          <ThemedText style={styles.buttonText}>Medium</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.difficultyButton, styles.hardButton]}
          onPress={() => handleDifficultySelect("hard")}
        >
          <ThemedText style={styles.buttonText}>Hard</ThemedText>
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
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    fontStyle: "italic",
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  difficultyButton: {
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  easyButton: {
    backgroundColor: "#4CAF50", // Green
  },
  mediumButton: {
    backgroundColor: "#FF9800", // Orange
  },
  hardButton: {
    backgroundColor: "#F44336", // Red
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
