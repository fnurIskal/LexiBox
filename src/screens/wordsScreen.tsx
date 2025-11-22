import { View, Text, Pressable, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import AddNewWord from "@/components/addNewWord";
import { Word } from "@/model/word";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { WordRenderItem } from "@/components/wordRenderItem";
import { getWords, storeWords } from "@/utils/storage";
import TabFilter from "@/components/tabFilter";
import uuid from "react-native-uuid";

export default function WordsScreen() {
  const [isAddWordModalVisible, setIsAddWordModalVisible] = useState(false);
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [wordToEdit, setWordToEdit] = useState<Word | undefined>(undefined);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    const loadWords = async () => {
      const storedWords = await getWords();
      if (storedWords.length > 0) {
        setAllWords(storedWords);
      }
    };
    loadWords();
  }, []);

  useEffect(() => {
    setFilteredWords(allWords);
    if (allWords.length > 0) {
      storeWords(allWords);
    }
  }, [allWords]);

  const handleNewWordSave = (word: Word) => {
    const newWordWithId: Word = {
      ...word,
      id: uuid.v4().toString(),
    };
    setAllWords((prevWords) => [...prevWords, newWordWithId]);
  };

  const handleDeleteWord = (id: string) => {
    setAllWords((prevWords) => prevWords.filter((word) => word.id !== id));
  };

  const handleEditWord = (id: string) => {
    const word = allWords.find((item) => item.id === id);
    setWordToEdit(word);
    setIsEditModalVisible(true);
  };

  const handleSaveEditedWord = (editedWord: Word) => {
    setAllWords((prevWords) =>
      prevWords.map((word) => (word.id === editedWord.id ? editedWord : word))
    );
    setIsEditModalVisible(false);
    setWordToEdit(undefined);
  };

  const handleFilterWords = (type: string) => {
    if (type === "All") {
      setFilteredWords(allWords);
    } else {
      const filtered = allWords.filter(
        (word) => word.type.toLowerCase() === type.toLowerCase()
      );
      setFilteredWords(filtered);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FDFAF5" }}
      edges={["right", "bottom", "left"]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: wp("3%"),
        }}
      >
        <Text className="text-myOrange text-3xl font-bold ">My Words</Text>
        <TabFilter handleFilterWords={handleFilterWords} />
        <FlatList
          data={filteredWords}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WordRenderItem
              item={item}
              onDelete={handleDeleteWord}
              onEdit={handleEditWord}
            />
          )}
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

        {isEditModalVisible && wordToEdit && (
          <AddNewWord
            visible={isEditModalVisible}
            onClose={() => setIsAddWordModalVisible(false)}
            onSave={handleSaveEditedWord}
            editingWord={wordToEdit}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
