import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Word } from "@/model/word";
import CustomTextInput from "@/components/customTextInput";

export default function QuizScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { questions } = route.params;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FDFAF5",
      }}
    >
      <View className="items-center justify-center mt-10 relative">
        <View
          style={{ width: wp("90%"), height: hp("70%") }}
          className="absolute bg-[#AA8FF8] opacity-40 rounded-3xl rotate-6"
        />

        <View
          style={{ width: wp("90%"), height: hp("70%") }}
          className="absolute bg-[#AA8FF8] opacity-70 rounded-3xl -rotate-3"
        />

        <View
          style={{ width: wp("90%"), height: hp("70%") }}
          className="bg-[#AA8FF8] rounded-3xl items-center justify-center shadow-xl" // shadow ekleyerek derinlik artırılır
        >
          <Text>
            {currentQuestion + 1}/{questions.length}
          </Text>
          <Text>{questions[currentQuestion].name} </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
