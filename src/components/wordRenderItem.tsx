import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useState } from "react";
import { Word } from "@/components/addNewWord";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export const WordCard = ({ item }: { item: Word }) => {
  const [isFront, setIsFront] = useState(true);
  const rotation = useSharedValue(0);

  const handleFlip = () => {
    rotation.value = rotation.value === 0 ? 1 : 0;
    setIsFront(!isFront);
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateY}deg`, { duration: 500 }),
        },
      ],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateY}deg`, { duration: 500 }),
        },
      ],
    };
  });

  const handleEdit = (item: Word) => {
    EditWordModal(item);
  };
  const handleDelete = (item: Word) => {};

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
    <Pressable
      onPress={handleFlip}
      style={{
        backgroundColor: itemBgColor,
        marginBottom: wp("2%"),
        padding: wp("5%"),
        borderRadius: 25,
        justifyContent: "center",
      }}
      className="border border-black"
    >
      <View style={{}}>
        <Animated.View
          style={[
            frontAnimatedStyle,
            { position: "absolute", backfaceVisibility: "hidden" },
          ]}
        >
          <View>
            <Text className="text-lg font-bold">{item.name}</Text>
            {item.sentence && (
              <Text className="text-gray-600">{item.sentence}</Text>
            )}
          </View>
        </Animated.View>

        <Animated.View
          style={[backAnimatedStyle, { backfaceVisibility: "hidden" }]}
        >
          <View>
            <Text className="text-lg font-bold">{item.meaning}</Text>
          </View>
        </Animated.View>
      </View>

      <View
        style={{ position: "absolute", right: wp("4%") }}
        className="flex-row"
      >
        <Pressable onPress={() => handleDelete(item)}>
          <MaterialCommunityIcons name="delete" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => handleEdit(item)}>
          <MaterialCommunityIcons name="pencil" size={24} color="black" />
        </Pressable>
      </View>
    </Pressable>
  );
};
