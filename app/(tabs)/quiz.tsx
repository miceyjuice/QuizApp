import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// Sample quiz data - you'll want to expand this
const sampleQuestions = [
  {
    question: "What is React Native?",
    options: [
      "A JavaScript framework for building native mobile apps",
      "A programming language",
      "A database management system",
      "An operating system",
    ],
    correctAnswer: 0,
  },
  // Add more questions here
];

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (selectedOption) => {
    if (selectedOption === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < sampleQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {showScore ? (
        <ThemedView style={styles.scoreSection}>
          <ThemedText type="title">
            You scored {score} out of {sampleQuestions.length}
          </ThemedText>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowScore(false);
            }}
          >
            <ThemedText style={styles.buttonText}>Restart Quiz</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ) : (
        <ThemedView style={styles.questionSection}>
          <ThemedText style={styles.questionCount}>
            Question {currentQuestion + 1}/{sampleQuestions.length}
          </ThemedText>
          <ThemedText type="subtitle" style={styles.question}>
            {sampleQuestions[currentQuestion].question}
          </ThemedText>
          <ThemedView style={styles.answerSection}>
            {sampleQuestions[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswerOptionClick(index)}
              >
                <ThemedText style={styles.optionText}>{option}</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scoreSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  questionSection: {
    flex: 1,
  },
  questionCount: {
    marginBottom: 20,
  },
  question: {
    marginBottom: 30,
  },
  answerSection: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: "#F1F3F5",
    padding: 15,
    borderRadius: 8,
  },
  optionText: {
    color: "#11181C",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#0a7ea4",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
