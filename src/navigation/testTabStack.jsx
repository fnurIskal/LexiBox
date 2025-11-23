import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TestScreen from "@/screens/testTab/testScreen";
import QuizScreen from "@/screens/testTab/quizScreen";
import ResultScreen from "@/screens/testTab/resultScreen";

const stack = createStackNavigator();

export default function TestTabStack() {
  return (
    <stack.Navigator
      initialRouteName="TestScreen"
      screenOptions={{ headerShown: false }}
    >
      <stack.Screen name="TestScreen" component={TestScreen} />
      <stack.Screen name="QuizScreen" component={QuizScreen} />
      <stack.Screen name="ResultScreen" component={ResultScreen} />
    </stack.Navigator>
  );
}
