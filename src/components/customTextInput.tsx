import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  widthStyle?: string | number;
};

export default function CustomTextInput({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  widthStyle,
}: Props) {
  return (
    <View
      className="bg-white border border-[#d4d4d4]"
      style={{
        width: widthStyle ? widthStyle : wp("90%"),
        height: wp("12%"),
        paddingHorizontal: wp("2%"),
        borderRadius: 20,
        justifyContent: "center",
      }}
    >
      <TextInput
        className="text-lg"
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={"gray"}
      />
    </View>
  );
}
