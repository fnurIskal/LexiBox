import { Stack } from "expo-router";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Text } from "react-native";
import ImmersiveMode from "../components/ImmersiveMod";
import { StatusBar } from "expo-status-bar";
export default function TabsLayout() {
  return (
    <>
      <ImmersiveMode />
      <StatusBar backgroundColor="transparent" style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#5dd62c",
          tabBarInactiveTintColor: "#337418",
          tabBarStyle: {
            backgroundColor: "#202020",
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="words"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "list-circle-sharp" : "list-circle-outline"}
                size={size}
                color={color}
              />
            ),
            tabBarLabel: "",
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                size={size}
                color={color}
              />
            ),
            tabBarLabel: "",
            headerLeft: () => <Text>Add Word</Text>,
          }}
        />
        <Tabs.Screen
          name="tests"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "stats-chart-sharp" : "stats-chart-outline"}
                size={size}
                color={color}
              />
            ),
            tabBarLabel: "",
          }}
        />
      </Tabs>
    </>
  );
}
