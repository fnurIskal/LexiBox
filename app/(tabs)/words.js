import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  ToastAndroid,
} from "react-native";

import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const FlipCard = ({ isFlipped, cardStyle, RegularContent, FlippedContent }) => {
  const duration = 500;

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(isFlipped ? 1 : 0, [0, 1], [0, 180]);
    return {
      transform: [{ rotateY: withTiming(`${spinValue}deg`, { duration }) }],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(isFlipped ? 1 : 0, [0, 1], [180, 360]);
    return {
      transform: [{ rotateY: withTiming(`${spinValue}deg`, { duration }) }],
    };
  });

  return (
    <View style={{ position: "relative", alignItems: "center" }}>
      <Animated.View
        style={[
          { position: "absolute", backfaceVisibility: "hidden" },
          cardStyle,
          regularCardAnimatedStyle,
        ]}
      >
        {RegularContent}
      </Animated.View>
      <Animated.View
        style={[
          { backfaceVisibility: "hidden" },
          cardStyle,
          flippedCardAnimatedStyle,
        ]}
      >
        {FlippedContent}
      </Animated.View>
    </View>
  );
};

const Words = () => {
  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const [words, setWords] = useState([]);
  const [flippedStates, setFlippedStates] = useState({});
  const [selectedButton, setSelectedButton] = useState("all");

  const loadWords = async (filterType) => {
    try {
      const storedWords = await AsyncStorage.getItem("words");
      if (storedWords) {
        const wordsArray = JSON.parse(storedWords);
        if (filterType === "mastered") {
          setWords(wordsArray.filter((word) => word.mastered === true));
        } else if (filterType === "review") {
          setWords(wordsArray.filter((word) => word.review === true));
        } else {
          setWords(wordsArray);
        }
      }
    } catch (error) {
      console.error("Kelimeler yüklenirken hata oluştu:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadWords("all");
    }, [])
  );

  const toggleFlip = (word) => {
    setFlippedStates((prevState) => ({
      ...prevState,
      [word]: !prevState[word],
    }));
  };

  const deleteWord = async (wordToDelete) => {
    try {
      const storedWords = await AsyncStorage.getItem("words");
      if (!storedWords) return;

      let wordsArray = JSON.parse(storedWords);

      const updatedwords = wordsArray.filter(
        (item) => item.word !== wordToDelete
      );

      await AsyncStorage.setItem("words", JSON.stringify(updatedwords));

      setWords(updatedwords);

      console.log(`Silinen kelime: ${wordToDelete}`);
    } catch (error) {
      console.error("Kelimeler silinirken hata oluştu:", error);
    }
    showToast("Word Deleted Successfully!");
  };

  return (
    <ScrollView className="bg-[#f8f8f8] flex-1">
      <View className="flex-row flex gap-3 justify-around items-center">
        {[
          { type: "mastered", label: "Mastered" },
          { type: "all", label: "All" },
          { type: "review", label: "Review" },
        ].map((btn) => (
          <Pressable
            key={btn.type}
            onPress={() => {
              setSelectedButton(btn.type);
              loadWords(btn.type);
            }}
            style={{
              width: wp("25%"),
              height: wp("10%"),
              padding: wp("1%"),
              margin: wp("1%"),
              backgroundColor:
                selectedButton === btn.type ? "#5dd62c" : "#0f0f0f",
            }}
            className="rounded-md"
          >
            <Text className="text-[#337418] text-2xl font-bold text-center">
              {btn.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {words.length > 0 ? (
        words.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: wp("95%"),
              height: wp("15%"),
              padding: wp("1%"),
              marginVertical: wp("2%"),
              marginHorizontal: wp("3%"),
              elevation: 7,
              backgroundColor: "#f8f8f8",
            }}
          >
            <Pressable
              style={{ flex: 1 }}
              onPress={() => toggleFlip(item.word)}
            >
              <FlipCard
                isFlipped={flippedStates[item.word]}
                cardStyle={{}}
                RegularContent={
                  <Text
                    style={{ width: wp("72%"), height: wp("7%") }}
                    className="text-[#5dd62c] bg-[#e6f9e8] font-bold text-2xl text-center"
                  >
                    {item.word}
                  </Text>
                }
                FlippedContent={
                  <Text
                    style={{ width: wp("75%"), height: wp("7%") }}
                    className="text-[#5dd62c]  bg-[#e6f9e8] font-bold text-2xl text-center"
                  >
                    {item.meaning}
                  </Text>
                }
              />
            </Pressable>
            <Pressable
              style={{ padding: 20 }}
              onPress={() => deleteWord(item.word)}
            >
              <Image
                source={require("../../assets/images/delete.png")}
                style={{ width: 40, height: 40 }}
              />
            </Pressable>
          </View>
        ))
      ) : (
        <Text style={{ marginHorizontal: wp("3%") }}>No words added yet.</Text>
      )}
    </ScrollView>
  );
};

export default Words;
