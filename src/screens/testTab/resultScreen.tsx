import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
export default function ResultScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { score, total } = route.params;
  const percentage = (score / total) * 100;

  let resultImage;
  let resultTitle;
  let resultColor;

  if (percentage >= 90) {
    resultImage = require("../../assets/image/great.png");
    resultTitle = "Outstanding!";
    resultColor = "#4ADE80"; // Yeşil
  } else if (percentage >= 70) {
    resultImage = require("../../assets/image/good.png");
    resultTitle = "Great Job!";
    resultColor = "#60A5FA"; // Mavi
  } else if (percentage >= 50) {
    resultImage = require("../../assets/image/notBad.png");
    resultTitle = "Not Bad!";
    resultColor = "#FACC15"; // Sarı
  } else {
    resultImage = require("../../assets/image/fail.png");
    resultTitle = "Don't Give Up!";
    resultColor = "#F87171"; // Kırmızı
  }
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
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: wp("20%"),
        }}
      >
        <View
          style={{
            width: wp("80%"),
            height: hp("50%"),
            alignItems: "center",
            backgroundColor: "white",

            padding: wp("5%"),
            borderRadius: wp("5%"),
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Image
            style={{
              width: wp("80%"),
              height: wp("80%"),
              position: "absolute",
              top: -hp("10%"),
            }}
            source={resultImage}
          />
          <View style={{ height: hp("25%") }} />
          <Text className="font-bold text-5xl" style={{ color: resultColor }}>
            {resultTitle}
          </Text>
          <View
            style={{ marginTop: wp("5%") }}
            className="flex-row justify-center"
          >
            <View
              style={{
                width: wp("22%"),
                marginLeft: wp("5%"),
                padding: wp("5%"),
                marginTop: 25,
                borderRadius: wp("5%"),
                backgroundColor: "#f6dbfe",
                alignItems: "center",
                justifyContent: "center",
                elevation: 3,
                position: "relative",
                borderWidth: 1,
                borderColor: "#620069",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: -25,
                  alignSelf: "center",
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#ffffff",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#620069",
                }}
              >
                <Octicons name="goal" size={28} color="#620069" />
              </View>
              <View style={{ marginTop: 10, alignItems: "center" }}>
                <Text className="font-bold text-3xl">
                  {percentage.toFixed(0)}%
                </Text>
                <Text className="text-sm">Accuracy</Text>
              </View>
            </View>

            <View
              style={{
                width: wp("22%"),
                marginLeft: wp("5%"),
                padding: wp("5%"),
                marginTop: 25,
                borderRadius: wp("5%"),
                backgroundColor: "#dbfedd",
                alignItems: "center",
                justifyContent: "center",
                elevation: 3,
                position: "relative",
                borderWidth: 1,
                borderColor: "#00690e",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: -25,
                  alignSelf: "center",
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#ffffff",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#00690e",
                }}
              >
                <Ionicons name="rocket-outline" size={28} color="#00690e" />
              </View>

              <View style={{ marginTop: 10, alignItems: "center" }}>
                <Text className="font-bold text-3xl">{score}</Text>
                <Text>True</Text>
              </View>
            </View>

            <View
              style={{
                width: wp("22%"),
                marginLeft: wp("5%"),
                padding: wp("5%"),
                marginTop: 25,
                borderRadius: wp("5%"),
                backgroundColor: "#fedbdb",
                alignItems: "center",
                justifyContent: "center",
                elevation: 3,
                position: "relative",

                borderWidth: 1,
                borderColor: "#690017",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: -25,
                  alignSelf: "center",
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#ffffff",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#690017",
                }}
              >
                <MaterialCommunityIcons
                  name="bug-outline"
                  size={28}
                  color="#690017"
                />
              </View>
              <View style={{ marginTop: 10, alignItems: "center" }}>
                <Text className="font-bold text-3xl">{total - score}</Text>
                <Text>False</Text>
              </View>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => navigation.navigate("TestScreen")}
          className="bg-[#cad8ff] flex-row  gap-2 border border-[#255ad8] rounded-3xl items-center justify-center "
          style={{
            marginTop: wp("10%"),
            width: wp("35%"),
            height: wp("12%"),
          }}
        >
          <Ionicons name="return-up-back-outline" size={24} color="#255ad8" />
          <Text className="text-lg font-medium text-[#255ad8] ">Go Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
