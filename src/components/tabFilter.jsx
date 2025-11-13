import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useState } from "react";
const types = ["All", "Noun", "Verb", "Adjective", "Adverb", "Other"];

export default function TabFilter({ handleFilterWords }) {
  const [selectedItem, setSelectedItem] = useState(types[0]);

  const handlePress = (item) => {
    setSelectedItem(item);
    handleFilterWords(item);
  };
  return (
    <View style={{ marginVertical: wp(4) }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ gap: wp(2) }} className="flex-row">
          {types.map((item, index) => {
            const isSelected = item === selectedItem;
            return (
              <Pressable
                style={{ width: wp("20%") }}
                key={index}
                onPress={() => handlePress(item)}
              >
                <Text
                  style={{
                    padding: wp(2),
                    backgroundColor: isSelected ? "black" : "transparent",
                    color: isSelected ? "white" : "black",
                  }}
                  className="text-lg border  rounded-lg text-center"
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
