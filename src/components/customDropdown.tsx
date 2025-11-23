import { View, Text } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type DropdownData = { label: string; value: string };

type Props = {
  value: string;
  onChange: (value: string) => void;
  data?: DropdownData[];
};

export default function CustomDropdown({ value, onChange, data }: Props) {
  const defaultWordTypes = [
    { label: "Noun", value: "noun" },
    { label: "Verb", value: "verb" },
    { label: "Adjective", value: "adjective" },
    { label: "Adverb", value: "adverb" },
    { label: "Other", value: "other" },
  ];
  const dropdownData = data || defaultWordTypes;
  return (
    <Dropdown
      style={{
        width: wp("90%"),
        height: wp("12%"),
        paddingHorizontal: wp("2%"),
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 20,
        backgroundColor: "#FDFAF5",
      }}
      placeholderStyle={{ color: "gray", marginLeft: wp("2%") }}
      selectedTextStyle={{ marginLeft: wp("2%") }}
      data={dropdownData}
      labelField="label"
      valueField="value"
      value={value}
      onChange={(item) => onChange(item.value)}
      placeholder="Select word type..."
    />
  );
}
