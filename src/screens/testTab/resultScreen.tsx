import { View, Text } from "react-native";
import React from "react";

export default function ResultScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { score, total } = route.params;
  return (
    <View>
      <Text></Text>
    </View>
  );
}
