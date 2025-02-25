import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Formik from "../components/Formik";
import Questions from "../components/Questions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Tests = () => {
  const [showFormik, setShowFormik] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [testData, setTestData] = useState(null);

  const startNewTest = () => {
    setShowFormik(true);
    setShowQuestions(false);
    setTestData(null);
  };
  useEffect(() => {
    if (!testData && !showQuestions) {
      setShowFormik(false);
    }
  }, [testData, showQuestions]);

  return (
    <View className="bg-[#f8f8f8] flex-1 justify-center items-center">
      {/* Eğer Formik veya Questions açık değilse, başlangıç ekranını göster */}
      {!showFormik && !showQuestions && (
        <View
          className="flex justify-around items-center"
          style={{
            width: wp("100%"),
            height: hp("35%"),
            padding: wp("3%"),
            margin: wp("12%"),
          }}
        >
          <View>
            <Text className="text-2xl font-bold text-[#337418]">
              Let's Test Your Word Knowledge!
            </Text>
            <Text className="text-xl font-bold text-[#000000]">
              You will be given random words or meanings. Type the correct
              answer!
            </Text>
          </View>

          <Pressable
            onPress={startNewTest}
            style={{
              width: wp("20%"),
              height: wp("20%"),
              marginRight: wp("2%"),
            }}
            className="flex justify-center items-center rounded-full bg-[#0f0f0f]"
          >
            <Text className="text-[#5dd62c] text-center">Start</Text>
          </Pressable>
        </View>
      )}

      {/* Test Seçme Ekranı */}
      {showFormik && (
        <Formik
          onSubmit={(values) => {
            setTestData(values);
            setShowFormik(false);
            setShowQuestions(true);
          }}
          onClose={() => {
            setShowFormik(false);
            setTestData(null);
          }}
        />
      )}

      {/* Sorular Ekranı */}
      {showQuestions && testData && (
        <Questions
          questionCount={testData.questionCount}
          type={testData.testType}
          onClose={() => {
            setShowQuestions(false);
            setTestData(null);
          }}
        />
      )}
    </View>
  );
};

export default Tests;
