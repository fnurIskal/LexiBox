import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
};

export default function CustomTextInput({
  value,
  onChangeText,
  placeholder,
  keyboardType,
}: Props) {
  return (
    <View
      className="bg-main border border-black rounded-3xl "
      style={{
        width: wp("90%"),
        height: wp("12%"),
        paddingHorizontal: wp("2%"),
      }}
    >
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}
