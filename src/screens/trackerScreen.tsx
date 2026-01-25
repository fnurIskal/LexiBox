import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dayjs from "dayjs";

export default function TrackerScreen() {
  const now = dayjs().date();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FDFAF5" }}>
      <Text>{now}</Text>
    </SafeAreaView>
  );
}
