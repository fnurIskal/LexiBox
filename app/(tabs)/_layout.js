import { Stack } from "expo-router";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
export default function TabsLayout() {
  return (
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
        }}
      ></Tabs.Screen>{" "}
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
  );
}
