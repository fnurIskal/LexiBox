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
            style={{ width: wp("95%"), padding: wp("2%") }}
            className="bg-white rounded-2xl p-4  items-center"
          >
            <Text
              style={{ padding: wp("2%") }}
              className="text-myNavi self-start font-medium text-2xl"
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
              className="flex-row w-full justify-around"
            >
              <Pressable
                onPress={onClose}
                className="bg-[#F98688] border border-black rounded-3xl items-center justify-center "
                style={{
                  width: wp("42%"),
                  height: wp("12%"),
                  paddingHorizontal: wp("2%"),
                }}
              >
                <Text className="text-lg font-medium ">Cancel</Text>
              </Pressable>

              <Pressable
                onPress={handleSave}
                className="bg-[#A6F986] border border-black rounded-3xl items-center justify-center"
                style={{
                  width: wp("42%"),
                  height: wp("12%"),
                  paddingHorizontal: wp("2%"),
                }}
              >
                <Text className="text-lg font-medium">Save</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
