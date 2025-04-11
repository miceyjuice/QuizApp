import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function WelcomeScreen() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <Image
        source={require("@/assets/images/quiz-app-logo.png")}
        style={styles.logo}
      />
      <ThemedView style={{ alignItems: "center" }}>
        <Image
          source={require("@/assets/images/quiz-welcome-screen-bg.png")}
          style={styles.img}
        />

        <ThemedText type="title" style={styles.title}>
          Welcome to QuizApp
        </ThemedText>

        <ThemedText style={styles.description}>
          Test your knowledge with fun quizzes
        </ThemedText>

        <Link
          href="/category"
          asChild
          style={{
            maxWidth: 300, // Replace with an appropriate numeric value or percentage
          }}
        >
          <TouchableOpacity style={styles.startButton}>
            <ThemedText style={styles.buttonText}>Get started</ThemedText>
          </TouchableOpacity>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 150,
    height: 150,
  },
  img: {
    width: 300,
    height: 300,
  },
});
