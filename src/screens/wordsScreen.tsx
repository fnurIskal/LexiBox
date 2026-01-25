import {
  View,
  Text,
  Pressable,
  FlatList,
  Animated,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import uuid from "react-native-uuid";
import AddNewWord from "@/components/addNewWord";
import { Word } from "@/model/word";
import { WordRenderItem } from "@/components/wordRenderItem";
import { getWords, storeWords } from "@/utils/storage";
import TabFilter from "@/components/tabFilter";
import FloatingActionButton from "@/components/floatingActionButton";
import { useFocusEffect } from "@react-navigation/native";

export default function WordsScreen() {
  const [isAddWordModalVisible, setIsAddWordModalVisible] = useState(false);
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [wordToEdit, setWordToEdit] = useState<Word | undefined>(undefined);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  // Header Sabitleri
  const HEADER_MAX_HEIGHT = 200;
  const HEADER_MIN_HEIGHT = 70;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  useFocusEffect(
    useCallback(() => {
      const loadWords = async () => {
        const storedWords = await getWords();
        if (storedWords.length > 0) {
          setAllWords(storedWords);
        }
      };
      loadWords();
    }, [])
  );

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
    setAllWords((prevWords) => [newWordWithId, ...prevWords]);
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

  const handleBottomFilterWords = (type: string) => {
    // Bu fonksiyonu çağırmadan önce allWords'ın güncel olduğundan emin olmalısınız.
    if (type === "Learned") {
      const filtered = allWords.filter((word) => word.isLearned === true);
      setFilteredWords(filtered);
    } else if (type === "Review") {
      // "if(type == "Review")" yerine "else if" kullanmak daha temizdir.
      const filtered = allWords.filter((word) => word.isReview === true);
      setFilteredWords(filtered);
    } else if (type === "Saved") {
      const filtered = allWords.filter((word) => word.isSaved === true);
      setFilteredWords(filtered);
    }
    // aktif filtre tipini tutan state'i de burada güncelleyebilirsiniz.
    // setActiveFilterType(type);
  };

  // Dinamik Header Animasyonları
  const headerHeight = scrollOffsetY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const animatedTextPosition = scrollOffsetY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -150], // 0: Merkezde kal, -80: 80 birim sola git (Sayısıyla oynayabilirsin)
    extrapolate: "clamp",
  });
  const textOpacity = scrollOffsetY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2], // Yarı yola gelmeden yok olsun ki temiz dursun
    outputRange: [1, 0], // 1: Tam görünür, 0: Tamamen görünmez
    extrapolate: "clamp",
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FDFAF5" }}>
      {/* Animated Header */}
      <Animated.View
        style={{
          height: headerHeight,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Animated.Text
          style={{
            fontWeight: "bold",
            fontSize: 28,
            transform: [{ translateX: animatedTextPosition }],
          }}
        >
          WORDS
        </Animated.Text>
        <Animated.Text style={{ opacity: textOpacity, fontSize: 13 }}>
          {allWords.length} Words
        </Animated.Text>
        <Pressable
          onPress={() => setIsAddWordModalVisible(true)}
          style={{
            position: "absolute",
            bottom: 20,
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
      </Animated.View>
      <TabFilter handleFilterWords={handleFilterWords} />
      <View style={{ flex: 1, paddingHorizontal: wp("3%") }}>
        {/* Animated FlatList Kullanımı */}
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          data={filteredWords}
          keyExtractor={(item) => item.id}
          // Scroll olayını yakalayan kısım BURASI:
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false } // Yükseklik animasyonu için false olmalı
          )}
          scrollEventThrottle={16} // Akıcı animasyon için önemli
          alwaysBounceVertical={true}
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
          contentContainerStyle={{
            paddingBottom: 100,
            minHeight: SCREEN_HEIGHT + HEADER_SCROLL_DISTANCE,
          }}
        />

        <View
          style={{ position: "absolute", bottom: wp("-12%"), right: wp("-3%") }}
        >
          <FloatingActionButton handleBottomPress={handleBottomFilterWords} />
        </View>

        {/* Modals */}
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
            onClose={() => setIsEditModalVisible(false)}
            onSave={handleSaveEditedWord}
            editingWord={wordToEdit}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
