import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddWord = ({ isVisible, onClose }) => {
  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");

  if (!isVisible) return null;

  const saveWord = async () => {
    if (word && meaning) {
      try {
        const storedWords = await AsyncStorage.getItem("words");
        const wordsArray = storedWords ? JSON.parse(storedWords) : [];
        const newWords = [
          { word, meaning, mastered: false, review: false },
          ...wordsArray,
        ];
        await AsyncStorage.setItem("words", JSON.stringify(newWords));
        console.log("Kelime eklendi:", word, "Anlamı:", meaning);
        setWord("");
        setMeaning("");
      } catch (error) {
        console.error("Kleime eklenirken hata oluştu", error);
      }
      showToast("New Word Added Successfully!");
    }
  };
  return (
    <View className="flex-1 justify-center items-center">
      <View
        className="shadow rounded-xl bg-[#202020] "
        style={{
          margin: wp("6%"),
          padding: wp("5%"),
          height: hp("45%"),
          width: wp("90%"),
          position: "relative",
        }}
      >
        <View className="w-full" style={{ paddingLeft: wp("5%") }}>
          <Text className="font-bold text-3xl color-[#5dd62c] text-start">
            Add Word
          </Text>
        </View>
        <Pressable
          onPress={onClose}
          style={{
            position: "absolute",
            top: wp("5%"),
            right: wp("4%"),
            zIndex: 10,
          }}
        >
          <Image source={require("../../assets/images/cross.png")} />
        </Pressable>
        <View
          style={{
            marginTop: wp("20%"),
            gap: wp("5%"),
          }}
          className=""
        >
          <TextInput
            className="bg-[#f8f8f8] shadow-xl rounded flex-row flex justify-between items-center  text-[#5dd62c] text-2xl"
            placeholder="Word"
            value={word}
            onChangeText={setWord}
            style={{ paddingLeft: wp("2%"), height: hp("6%") }}
          />

          <TextInput
            className="bg-[#f8f8f8] shadow-xl rounded flex-row flex justify-between items-center  text-[#5dd62c] text-2xl"
            placeholder="Meaning"
            value={meaning}
            onChangeText={setMeaning}
            style={{ paddingLeft: wp("2%"), height: hp("6%") }}
          />
          <Pressable
            className="flex items-center justify-center"
            onPress={saveWord}
          >
            <Text
              style={{
                width: wp("30%"),
                marginTop: wp("5%"),
                padding: wp("2%"),
              }}
              className=" flex text-center font-extrabold text-2xl rounded-lg justify-center items-center bg-[#5dd62c] text-[#0f0f0f]"
            >
              Add
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AddWord;
