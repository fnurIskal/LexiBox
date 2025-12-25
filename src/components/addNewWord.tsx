import { View, Pressable, Modal, Text } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomTextInput from "./customTextInput";
import { useEffect, useState } from "react";
import CustomDropdown from "./customDropdown";
import { Word } from "@/model/word";
import uuid from "react-native-uuid";

type Props = {
  visible?: boolean;
  onClose: () => void;
  onSave: (word: Word) => void;
  editingWord?: Word;
};

export default function AddNewWord({
  visible,
  onClose,
  onSave,
  editingWord,
}: Props) {
  const [word, setWord] = useState<Word>(
    editingWord || {
      id: uuid.v4().toString(),
      name: "",
      meaning: "",
      type: "Noun",
      sentence: "",
      isLearned: false,
      isReview: false,
      isSaved: false,
    }
  );

  useEffect(() => {
    if (editingWord) {
      setWord(editingWord);
    } else {
      setWord({
        id: uuid.v4().toString(),
        name: "",
        meaning: "",
        type: "Noun",
        sentence: "",
        isLearned: false,
        isReview: false,
        isSaved: false,
      });
    }
  }, [editingWord, visible]);

  const handleInputChange = (key: keyof Word, value: string) => {
    setWord((prevWord) => ({
      ...prevWord,
      [key]: value,
    }));
  };

  const handleSave = () => {
    onSave(word);
    setWord({
      id: uuid.v4().toString(),
      name: "",
      meaning: "",
      type: "Noun",
      sentence: "",
      isLearned: false,
      isReview: false,
      isSaved: false,
    });
    onClose();
  };
  const modalTitle = editingWord ? "Edit Word" : "Add New Word";

  return (
    <Modal visible={visible} transparent={true}>
      <Pressable
        onPress={onClose}
        className="flex-1 justify-center items-center bg-black/50"
      >
        <Animated.View entering={FadeInUp} exiting={FadeOutDown}>
          <View
            onStartShouldSetResponder={() => true}
            style={{ width: wp("95%"), padding: wp("6%") }}
            className="bg-white rounded-2xl p-4  items-center"
          >
            <Text
              style={{ paddingVertical: wp("2%") }}
              className=" self-start font-medium text-2xl"
            >
              {modalTitle}
            </Text>
            <View style={{ gap: wp("3%"), marginTop: wp("2%") }}>
              <CustomTextInput
                value={word.name}
                onChangeText={(text) => handleInputChange("name", text)}
                placeholder="Add your word..."
                keyboardType="default"
              />

              <CustomTextInput
                value={word.meaning}
                onChangeText={(text) => handleInputChange("meaning", text)}
                placeholder="Meaning"
                keyboardType="default"
              />

              <CustomDropdown
                value={word.type}
                onChange={(value) => handleInputChange("type", value)}
              />

              <CustomTextInput
                value={word.sentence || ""}
                onChangeText={(text) => handleInputChange("sentence", text)}
                placeholder="Add your sentence (optional)"
                keyboardType="default"
              />
            </View>

            <View
              style={{ margin: wp("3%") }}
              className="flex-row justify-between w-full"
            >
              <Pressable
                onPress={onClose}
                className="bg-[#fff] border border-red-300 rounded-2xl items-center justify-center "
                style={{
                  width: wp("40%"),
                  height: wp("12%"),
                  paddingHorizontal: wp("2%"),
                }}
              >
                <Text className="text-lg text-red-600 font-medium ">
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={handleSave}
                className="bg-[#00c44e]  rounded-2xl items-center justify-center"
                style={{
                  width: wp("40%"),
                  height: wp("12%"),
                  paddingHorizontal: wp("2%"),
                }}
              >
                <Text className="text-lg text-white font-medium">Save</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
