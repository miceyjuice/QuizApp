import { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function QuizScreen() {
  const params = useLocalSearchParams<{
    categoryId: string;
    categoryName: string;
    type: string;
    difficulty: string;
  }>();

  const { categoryId, categoryName, type, difficulty } = params;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      // Construct the URL based on user selections
      const apiUrl = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=${type}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.response_code === 0) {
          // Decode HTML entities in the questions and answers
          const processedQuestions = data.results.map((q: Question) => ({
            ...q,
            question: decodeHTMLEntities(q.question),
            correct_answer: decodeHTMLEntities(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map(decodeHTMLEntities),
          }));

          setQuestions(processedQuestions);

          // Set options for the first question
          if (processedQuestions.length > 0) {
            setOptionsForQuestion(processedQuestions[0]);
          }
        } else {
          setError("Could not load questions. Please try different options.");
        }
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        setError("An error occurred while loading the quiz.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [categoryId, difficulty, type]);

  const decodeHTMLEntities = (text: string): string => {
    // A simple function to decode basic HTML entities
    const entities: Record<string, string> = {
      "&quot;": '"',
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&apos;": "'",
      "&#039;": "'",
      "&eacute;": "é",
      "&Eacute;": "É",
    };

    return text.replace(/&[^;]+;/g, (match) => entities[match] || match);
  };

  const setOptionsForQuestion = (question: Question) => {
    // Combine correct and incorrect answers, then shuffle
    const allOptions = [...question.incorrect_answers, question.correct_answer];

    // Simple shuffle algorithm
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    setOptions(allOptions);
  };

  const handleAnswerOptionClick = (selectedOption: string) => {
    // Check if the answer is correct
    if (selectedOption === questions[currentQuestion].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move to the next question or show the final score
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setOptionsForQuestion(questions[nextQuestion]);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    // Go back to category selection to start over
    router.replace("/category");
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <ThemedText style={styles.loadingText}>
          Loading quiz questions...
        </ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <ThemedText style={styles.buttonText}>Go Back</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {showScore ? (
        <ThemedView style={styles.scoreSection}>
          <ThemedText type="title" style={styles.scoreTitle}>
            Quiz Completed!
          </ThemedText>

          <ThemedText style={styles.scoreText}>
            You scored {score} out of {questions.length}
          </ThemedText>

          <ThemedView style={styles.quizInfoContainer}>
            <ThemedText style={styles.quizInfoText}>
              Category: {categoryName}
            </ThemedText>
            <ThemedText style={styles.quizInfoText}>
              Difficulty:{" "}
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </ThemedText>
            <ThemedText style={styles.quizInfoText}>
              Type: {type === "multiple" ? "Multiple Choice" : "True/False"}
            </ThemedText>
          </ThemedView>

          <TouchableOpacity style={styles.button} onPress={handleRestartQuiz}>
            <ThemedText style={styles.buttonText}>Play Again</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ) : (
        <ThemedView style={styles.questionSection}>
          <ThemedView style={styles.progressContainer}>
            <ThemedText style={styles.questionCount}>
              Question {currentQuestion + 1}/{questions.length}
            </ThemedText>
            <ThemedView style={styles.progressBar}>
              <ThemedView
                style={[
                  styles.progressFill,
                  {
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  },
                ]}
              />
            </ThemedView>
          </ThemedView>

          <ThemedText type="subtitle" style={styles.question}>
            {questions[currentQuestion].question}
          </ThemedText>

          <ThemedView style={styles.answerSection}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswerOptionClick(option)}
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
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginTop: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0a7ea4",
    borderRadius: 4,
  },
  scoreSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreTitle: {
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 30,
  },
  quizInfoContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  quizInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  questionSection: {
    flex: 1,
  },
  questionCount: {
    fontSize: 16,
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
    marginTop: 20,
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
