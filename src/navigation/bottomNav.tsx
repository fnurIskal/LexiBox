import TrackerScreen from "@/screens/trackerScreen";
import WordsScreen from "@/screens/wordsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { Image } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import TestTabStack from "./testTabStack";

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator initialRouteName="Words">
      <Tab.Screen
        name="Tracker"
        component={TrackerScreen}
        options={{
          headerShown: false,
          tabBarInactiveTintColor: "#d4d4d4",
          tabBarActiveTintColor: "#FF6600",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="bar-chart-outline"
                size={24}
                color={focused ? "#FF6600" : "#d4d4d4"}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Words"
        component={WordsScreen}
        options={{
          headerShown: false,
          tabBarInactiveTintColor: "#d4d4d4",
          tabBarActiveTintColor: "#FF6600",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="library-outline"
                size={24}
                color={focused ? "#FF6600" : "#d4d4d4"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Test"
        component={TestTabStack}
        options={{
          tabBarInactiveTintColor: "#d4d4d4",
          tabBarActiveTintColor: "#FF6600",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Octicons
                name="checklist"
                size={24}
                color={focused ? "#FF6600" : "#d4d4d4"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
