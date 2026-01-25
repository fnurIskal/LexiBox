import { View, Text, Switch, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CustomTextInput from "@/components/customTextInput";
import CustomDropdown from "@/components/customDropdown";
import { getWords } from "@/utils/storage";
import { Word } from "@/model/word";

export default function TestScreen({ navigation }: { navigation: any }) {
  const [questionCount, setQuestionCount] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [wordToMeaning, setWordToMeaning] = React.useState(true);

  const handleStartTest = async () => {
    try {
      // 1. Veriyi Çek
      const words: Word[] = (await getWords()) || [];

      // 2. Filtrele
      let filteredWords = words;
      if (category !== "all") {
        filteredWords = words.filter((word) => word.type === category);
      }
      // 3. Sayı Kontrolü
      if (filteredWords.length === 0) {
        alert("No words available for the selected category.");
        return;
      }
      const shuffledWords = [...filteredWords].sort(() => 0.5 - Math.random());

      const selectedQuestions = shuffledWords.slice(0, Number(questionCount));

      console.log(
        `Toplam: ${filteredWords.length}, Seçilen: ${selectedQuestions.length}`
      );

      navigation.navigate("QuizScreen", { questions: selectedQuestions });
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const testCategories = [
    { label: "All", value: "all" },
    { label: "Noun", value: "noun" },
    { label: "Verb", value: "verb" },
    { label: "Adjective", value: "adjective" },
    { label: "Adverb", value: "adverb" },
    { label: "Other", value: "other" },
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FDFAF5" }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: wp("3%"),
          alignItems: "center",
          justifyContent: "center",
          gap: wp("10%"),
        }}
      >
        <Text className="text-4xl font-semibold">Start New Test</Text>

        <View style={{ gap: wp("5%"), marginTop: wp("10%") }}>
          <CustomTextInput
            value={questionCount}
            onChangeText={setQuestionCount}
            placeholder="Enter Question Count"
            keyboardType="number-pad"
          />

          <CustomDropdown
            value={category}
            onChange={setCategory}
            data={testCategories}
          />

          <View
            className="border bg-main border-black justify-between items-center flex-row "
            style={{
              width: wp("90%"),
              height: wp("12%"),
              paddingHorizontal: wp("2%"),
              borderRadius: 20,
            }}
          >
            <Text>{wordToMeaning ? "Word to Meaning" : "Meaning to Word"}</Text>
            <Switch
              trackColor={{ false: "#ffddad", true: "#cad8ff" }}
              thumbColor={wordToMeaning ? "#255ad8" : "#d89220"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setWordToMeaning}
              value={wordToMeaning}
            />
          </View>
        </View>
        <Pressable
          onPress={handleStartTest}
          className="bg-[#cad8ff] flex-row  gap-2 border border-[#255ad8] rounded-3xl items-center justify-center "
          style={{
            width: wp("45%"),
            height: wp("12%"),
          }}
        >
          <Text className="text-lg font-medium text-[#255ad8]">Start</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
