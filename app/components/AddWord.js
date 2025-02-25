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
    <View
      className="shadow rounded-xl bg-[#202020] "
      style={{
        margin: wp("5%"),
        padding: wp("5%"),
        height: hp("45%"),
        width: wp("90%"),
        position: "relative",
      }}
    >
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
          gap: wp("3%"),
        }}
        className=""
      >
        <TextInput
          className="bg-[#f8f8f8] shadow-xl rounded flex-row flex justify-between items-center  text-[#5dd62c] text-2xl"
          placeholder="Word"
          value={word}
          onChangeText={setWord}
        />

        <TextInput
          className="bg-[#f8f8f8] shadow-xl rounded flex-row flex justify-between items-center  text-[#5dd62c] text-2xl"
          placeholder="Meaning"
          value={meaning}
          onChangeText={setMeaning}
        />
        <Pressable
          className="flex items-center justify-center"
          onPress={saveWord}
        >
          <Text
            style={{
              width: wp("30%"),
              height: wp("7%"),
              marginTop: wp("1%"),
            }}
            className=" flex text-center font-bold text-2xl rounded justify-center items-center bg-[#0f0f0f] text-[#5dd62c]"
          >
            Add
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddWord;
