import { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface Category {
  id: number;
  name: string;
}

export default function CategoryScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch categories from the OpenTDB API
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.trivia_categories);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleCategorySelect = (categoryId: number, categoryName: string) => {
    // Navigate to the answer type selection screen
    router.push({
      pathname: "/type",
      params: {
        categoryId,
        categoryName,
      },
    });
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <ThemedText style={styles.loadingText}>
          Loading categories...
        </ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setLoading(true);
            setError(null);
            fetch("https://opentdb.com/api_category.php")
              .then((response) => response.json())
              .then((data) => {
                setCategories(data.trivia_categories);
                setLoading(false);
              })
              .catch((err) => {
                setError("Failed to load categories. Please try again.");
                setLoading(false);
              });
          }}
        >
          <ThemedText style={styles.buttonText}>Retry</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Select a Category
      </ThemedText>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleCategorySelect(item.id, item.name)}
          >
            <ThemedText style={styles.categoryText}>{item.name}</ThemedText>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  listContainer: {
    paddingBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#0a7ea4",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  categoryText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  retryButton: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
