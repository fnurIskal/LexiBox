import { View, Text, Pressable, TextInput, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
const Questions = ({ questionCount, type, onClose }) => {
  const [wordsArray, setWordsArray] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#202020");

  useEffect(() => {
    const getWords = async () => {
      try {
        const storedWords = await AsyncStorage.getItem("words");
        if (storedWords !== null) {
          const words = JSON.parse(storedWords);
          const shuffledWords = words.sort(() => 0.5 - Math.random());
          const filteredWords = shuffledWords.slice(0, questionCount);
          if (type === "W") {
            setWordsArray(
              filteredWords.map((item) => ({
                question: item.word,
                answer: item.meaning,
              }))
            );
          } else if (type === "M") {
            setWordsArray(
              filteredWords.map((item) => ({
                question: item.meaning,
                answer: item.word,
              }))
            );
          }
        }
      } catch (error) {
        console.error("Kelimeler alınırken hata oluştu:", error);
      }
    };

    getWords();
  }, [questionCount, type]);

  const handleMastered = async () => {
    try {
      const storedWords = await AsyncStorage.getItem("words");
      if (!storedWords) return;

      let wordsArrayFromStorage = JSON.parse(storedWords);

      // Şu anki sorunun orijinal kelime verisini bul
      const updatedWords = wordsArrayFromStorage.map((wordObj) =>
        wordObj.word === wordsArray[currentIndex].question
          ? { ...wordObj, mastered: true, review: false }
          : wordObj
      );

      await AsyncStorage.setItem("words", JSON.stringify(updatedWords));
      console.log("${wordsArray[currentIndex].question}");
    } catch (error) {
      console.error("Mastered kelime eklenirken hata oluştu:", error);
    }
  };

  const handleReview = async () => {
    try {
      const storedWords = await AsyncStorage.getItem("words");
      if (!storedWords) return;

      let wordsArrayFromStorage = JSON.parse(storedWords);

      // Şu anki sorunun orijinal kelime verisini bul
      const updatedWords = wordsArrayFromStorage.map((wordObj) =>
        wordObj.word === wordsArray[currentIndex].question
          ? { ...wordObj, mastered: false, review: true }
          : wordObj
      );

      await AsyncStorage.setItem("words", JSON.stringify(updatedWords));
      console.log("${wordsArray[currentIndex].question}");
    } catch (error) {
      console.error("Review kelime eklenirken hata oluştu:", error);
    }
  };

  const handleCheck = async () => {
    if (
      inputValue.toLowerCase() === wordsArray[currentIndex].answer.toLowerCase()
    ) {
      console.log("true");
      setIsCorrect(true);
      setBackgroundColor("#22c55e");
      await handleMastered();
    } else {
      console.log("false");
      setBackgroundColor("#ef4444");
      await handleReview();
    }

    setTimeout(() => {
      setBackgroundColor("#202020");
      if (currentIndex >= wordsArray.length - 1) {
        onClose();
        router.push("/(tabs)/tests");
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
      setInputValue("");
    }, 1000);
  };

  return (
    <View
      style={{
        witdh: wp("100%"),
        height: hp("70%"),
        gap: wp("3%"),
      }}
      className="flex items-center justify-center"
    >
      {wordsArray.length > 0 ? (
        <>
          <View
            style={{
              width: wp("75%"),
              height: hp("30%"),
              gap: wp("2%"),
              backgroundColor: backgroundColor,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
          >
            <Text className="font-bold text-3xl text-[#5dd62c]">
              {wordsArray[currentIndex].question}
            </Text>
            <TextInput
              className="font-bold text-3xl text-[#337418]"
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="..."
            />
            <Pressable
              className="flex items-center justify-center"
              onPress={handleCheck}
            >
              <Text
                style={{
                  width: wp("30%"),
                  padding: wp("2%"),
                  marginTop: wp("10%"),
                }}
                className=" flex text-center font-bold text-2xl rounded-lg justify-center items-center bg-[#5dd62c] text-[#0f0f0f]"
              >
                Enter
              </Text>
            </Pressable>
          </View>
        </>
      ) : (
        <Text>Words Loading...</Text>
      )}

      <Pressable
        onPress={onClose}
        style={{
          position: "absolute",
          top: wp("30%"),
          right: wp("1%"),
          zIndex: 10,
        }}
      >
        <Image source={require("../../assets/images/cross.png")} />
      </Pressable>
    </View>
  );
};
export default Questions;
