import { View, Text, TextInput, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage import edildi
import RadioButtonGroup from "react-native-radio-buttons-group";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FormikTestType = ({ onSubmit, onClose }) => {
  const [maxNumber, setMaxNumber] = useState(4);

  useEffect(() => {
    const getWords = async () => {
      try {
        const storedWords = await AsyncStorage.getItem("words");
        if (storedWords) {
          const wordsArray = JSON.parse(storedWords);
          setMaxNumber(wordsArray.length);
        }
      } catch (error) {
        console.error("Kelimeler alınırken hata oluştu:", error);
      }
    };
    getWords();
  }, []);

  const validationSchema = Yup.object().shape({
    testType: Yup.string().required("Choose a test type"),
    questionCount: Yup.number()
      .min(1, "Choose at least 1 question")
      .max(maxNumber, `There are only ${maxNumber} words! `)
      .required("Enter a question number!"),
  });

  const radioButtons = [
    { id: "W", label: "Word To Meaning", value: "W" },
    { id: "M", label: "Meaning To Word", value: "M" },
  ];

  return (
    <Formik
      initialValues={{ testType: "W", questionCount: "10" }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        errors,
        values,
      }) => (
        <View
          style={{
            width: wp("100%"), // Hatalı "witdh" düzeltildi
            height: hp("70%"),
            gap: wp("3%"),
          }}
          className="flex items-center justify-center"
        >
          <Pressable
            onPress={onClose}
            style={{
              position: "absolute",
              top: wp("15%"),
              right: wp("12%"),
              zIndex: 10,
            }}
          >
            <Image
              source={require("../../assets/images/icons8-cross-30.png")}
            />
          </Pressable>
          <Text className="text-[#337418] text-4xl font-bold">
            Test Options
          </Text>
          <Text className="text-xl font-semibold">Choose a Test Type</Text>
          <RadioButtonGroup
            radioButtons={radioButtons}
            onPress={(selectedId) => setFieldValue("testType", selectedId)}
            selectedId={values.testType}
          />

          <Text className="text-xl font-semibold ">
            Choose Number of Questions
          </Text>
          <TextInput
            keyboardType="number-pad"
            onChangeText={(text) => setFieldValue("questionCount", text)}
            onBlur={handleBlur("questionCount")}
            value={values.questionCount.toString()}
            style={{ textAlign: "center", width: 50, borderBottomWidth: 1 }}
          />

          {errors.questionCount && (
            <Text className="text-[#c60000]">{errors.questionCount}</Text>
          )}

          <Pressable
            onPress={handleSubmit}
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
    </Formik>
  );
};

export default FormikTestType;
