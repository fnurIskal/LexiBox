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
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="bar-chart-outline"
                size={24}
                color={focused ? "#2619e3" : "#d4d4d4"}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Words"
        component={WordsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => {
            return (
              <Image
                source={require("../assets/image/logo.png")}
                style={{ width: wp("40%"), height: wp("10%") }}
              />
            );
          },
          tabBarInactiveTintColor: "#d4d4d4",
          tabBarActiveTintColor: "#2619e3",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="library-outline"
                size={24}
                color={focused ? "#2619e3" : "#d4d4d4"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Test"
        component={TestTabStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Octicons
                name="checklist"
                size={24}
                color={focused ? "#2619e3" : "#d4d4d4"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
