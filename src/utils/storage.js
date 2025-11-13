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
