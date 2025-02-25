import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AddWord from "../components/AddWord";

const index = () => {
  const [shownModal, setShownModal] = useState(false);
  return (
    <View className="flex-1 bg-[#f8f8f8]">
      {shownModal ? (
        <AddWord isVisible={shownModal} onClose={() => setShownModal(false)} />
      ) : (
        <>
          <View className="flex-1 bg-[#f8f8f8]">
            <View
              style={{
                width: wp("100%"),
                height: hp("20%"),
                padding: wp("3%"),
                marginTop: wp("12%"),
              }}
            >
              <Text className="text-[#0f0f0f] font-extrabold text-6xl">
                Create Your
              </Text>
              <View className="flex flex-row">
                <Text className="text-[#0f0f0f] font-extrabold text-6xl">
                  Own
                </Text>
                <Text
                  style={{
                    marginLeft: wp("3"),
                  }}
                  className="text-[#5dd62c] font-extrabold text-6xl"
                >
                  Lexion
                </Text>
              </View>
              <Text
                style={{
                  padding: wp("1%"),
                  marginTop: wp("1%"),
                }}
                className="text-[#1c1b1b] font-normal"
              >
                Create your unique dictionary and master new words at your own
                rhythm.
              </Text>
            </View>
            <Image
              style={{ height: hp("50%"), width: wp("100%") }}
              source={require("../../assets/images/logoDark.png")}
            />
            <View className="flex items-end">
              <Pressable
                onPress={() => {
                  setShownModal(true);
                }}
                style={{
                  width: wp("20%"),
                  height: wp("20%"),
                  marginRight: wp("2%"),
                }}
                className=" flex justify-center items-center rounded-full bg-[#0f0f0f]"
              >
                <Text className="text-[#5dd62c] text-center">Start</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default index;
