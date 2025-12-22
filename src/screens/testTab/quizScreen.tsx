import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomTextInput from "@/components/customTextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useAnimatedShake } from "@/hooks/useAnimatedShake";
import { useAnimationBounce } from "@/hooks/useAniamtionBounce";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { updateWordAttribute } from "@/utils/storage";
export default function QuizScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { shakeStyle, shake, isShaking } = useAnimatedShake();
  const { bounceStyle, bounce } = useAnimationBounce();
  const rErrorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: isShaking.value ? "red" : "#AA8FF8",
    };
  });

  const { questions } = route.params;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answer, setAnswer] = React.useState<string>("");
  const [score, setScore] = React.useState<number>(0);
  const [isTrue, setIsTrue] = React.useState<boolean>(false);
  const [showSentence, setShowSentence] = React.useState<boolean>(false);
  const [isSaved, setIsSaved] = React.useState(questions[0]?.isSaved || false);

  useEffect(() => {
    setIsSaved(questions[currentQuestion]?.isSaved || false);
    setShowSentence(false);
  }, [currentQuestion]);

  const handleUpdateDatabase = async (prop: "isLearned" | "isReview") => {
    const currentWordName = questions[currentQuestion].name;
    await updateWordAttribute(currentWordName, prop);
  };

  const handleBookmark = async () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);

    const currentWordName = questions[currentQuestion].name;
    await updateWordAttribute(currentWordName, "isSaved", newSavedState);

    questions[currentQuestion].isSaved = newSavedState;
  };

  const handleAnswer = async () => {
    if (
      answer.toLowerCase().trim() ===
      questions[currentQuestion].meaning.toLowerCase().trim()
    ) {
      setIsTrue(true);
      setScore(score + 1);
      bounce();
      await handleUpdateDatabase("isLearned");
    } else {
      setIsTrue(false);
      shake();
      await handleUpdateDatabase("isReview");
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer("");
    } else {
      navigation.navigate("ResultScreen", {
        score: score,
        total: questions.length,
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FDFAF5",
      }}
    >
      <View
        style={{ paddingHorizontal: wp("5%") }}
        className="flex-row justify-between w-full"
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="black" />
        </Pressable>
        <Pressable onPress={handleBookmark}>
          <Ionicons
            name={isSaved ? "bookmark" : "bookmark-outline"}
            size={30}
            color="black"
          />
        </Pressable>
      </View>
      <Animated.View
        style={[shakeStyle, rErrorStyle, bounceStyle]}
        className="items-center justify-center rounded-3xl mt-10 relative"
      >
        <View
          style={{ width: wp("90%"), height: hp("60%") }}
          className="absolute bg-[#AA8FF8] opacity-40 rounded-3xl rotate-6"
        />

        <View
          style={{ width: wp("90%"), height: hp("60%") }}
          className="absolute bg-[#AA8FF8] opacity-70 rounded-3xl -rotate-3"
        />

        <View
          style={{
            width: wp("90%"),
            height: hp("60%"),
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
          className="bg-[#AA8FF8] rounded-3xl items-center justify-center shadow-xl"
        >
          <Text className="text-2xl">
            {currentQuestion + 1}/{questions.length}
          </Text>
          <View>
            <Text
              className="text-8xl"
              style={{
                paddingVertical: wp("5%"),
              }}
            >
              {questions[currentQuestion].name}
            </Text>
            <Pressable
              className="flex-row"
              style={{
                alignItems: "center",
                justifyContent: "center",
                gap: wp("2%"),
                marginTop: wp("2%"),

                paddingBottom: wp("4%"),
              }}
              onPress={() => setShowSentence(!showSentence)}
            >
              <FontAwesome name="question-circle" size={24} color="#0202c4" />
              <Text className="text-lg text-[#0202c4]">Show Sentence</Text>
            </Pressable>
            {showSentence ? (
              questions[currentQuestion].sentence ? (
                <Text className="text-xl self-center">
                  {questions[currentQuestion].sentence}
                </Text>
              ) : (
                <Text className="text-xl self-center">
                  No sentence available
                </Text>
              )
            ) : null}
          </View>
          <CustomTextInput
            value={answer}
            onChangeText={setAnswer}
            placeholder="Your answer"
            widthStyle={wp("80%")}
          />
          <Pressable
            onPress={handleAnswer}
            className="bg-[#A6F986] border border-black rounded-3xl items-center justify-center"
            style={{
              width: wp("42%"),
              height: wp("12%"),
              paddingHorizontal: wp("2%"),
            }}
          >
            <Text className="text-xl font-medium">Try</Text>
          </Pressable>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
