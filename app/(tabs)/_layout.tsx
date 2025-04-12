import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function QuizLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#151718" : "#fff",
        },
        headerTintColor: colorScheme === "dark" ? "#ECEDEE" : "#11181C",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "",
          headerBackTitle: "Welcome",
        }}
      />
    </Stack>
  );
}
