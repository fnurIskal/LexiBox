import BottomNav from "@/navigation/bottomNav";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomNav />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
