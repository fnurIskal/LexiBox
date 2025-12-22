import AsyncStorage from "@react-native-async-storage/async-storage";

const WORDS_KEY = "@lexibox_words";

export const storeWords = async (words) => {
  try {
    const jsonValue = JSON.stringify(words);
    await AsyncStorage.setItem(WORDS_KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save words to storage", e);
  }
};

export const getWords = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(WORDS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to fetch words from storage", e);
    return [];
  }
};

export const updateWordAttribute = async (wordName, attribute, state) => {
  const words = await getWords();
  try {
    let updatedWord = words.find((word) => word.name === wordName);
    console.log("Original Word:", updatedWord);
    if (state !== null) {
      updatedWord = { ...updatedWord, [attribute]: state };
    } else {
      updatedWord = { ...updatedWord, [attribute]: true };
    }
    console.log("Updated Word:", updatedWord);
    await storeWords([
      ...words.filter((word) => word.name !== wordName),
      updatedWord,
    ]);
  } catch (error) {
    console.error("Failed to update words to storage", error);
  }
};
