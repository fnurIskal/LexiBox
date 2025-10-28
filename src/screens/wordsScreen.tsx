import { View, Text, Pressable, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import AddNewWord, { Word } from "@/components/addNewWord";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Animated from "react-native-reanimated";

export default function WordsScreen() {
  const [isAddWordModalVisible, setIsAddWordModalVisible] = useState(false);
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [animatedPress, setAnimatedPress] = useState(false);

  const handleNewWordSave = (word: Word) => {
    setAllWords((prevWords) => [...prevWords, word]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FDFAF5" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FDFAF5",
          paddingHorizontal: wp("3%"),
        }}
      >
        <Text className="text-myOrange text-3xl font-bold mb-4">My Words</Text>

        <FlatList
          data={allWords}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item }) => {
            let itemBgColor = "#FDF07D";
            if (item.type === "noun") {
              itemBgColor = "#9CD8FB";
            } else if (item.type === "verb") {
              itemBgColor = "#F986A5";
            } else if (item.type === "adjective") {
              itemBgColor = "#DDAEF1";
            } else if (item.type === "adverb") {
              itemBgColor = "#95F45E";
            }
            return (
              <Animated.View
                style={{
                  backgroundColor: itemBgColor,
                  marginBottom: wp("2%"),
                  padding: wp("4%"),
                  borderRadius: 25,
                }}
                className=" border border-black flex-row justify-between items-center "
              >
                <Text className="text-lg font-bold">{item.name}</Text>
                {item.sentence && (
                  <Text className="text-gray-600">{item.sentence}</Text>
                )}
                <View className="flex-row">
                  <MaterialCommunityIcons
                    name="delete"
                    size={24}
                    color="black"
                  />
                  <MaterialCommunityIcons
                    name="pencil"
                    size={24}
                    color="black"
                  />
                </View>
              </Animated.View>
            );
          }}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-10">
              No words added yet. Press '+' to add your first word!
            </Text>
          }
        />

        <Pressable
          onPress={() => setIsAddWordModalVisible(true)}
          style={{
            position: "absolute",
            bottom: 0,
            right: 16,
            backgroundColor: "#FF6600",
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
          }}
        >
          <Ionicons name="add" size={24} color="white" />
        </Pressable>

        {isAddWordModalVisible && (
          <AddNewWord
            visible={isAddWordModalVisible}
            onClose={() => setIsAddWordModalVisible(false)}
            onSave={handleNewWordSave}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
