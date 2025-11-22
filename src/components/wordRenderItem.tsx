import { View, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useState } from "react";
import { Word } from "@/model/word";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export const WordRenderItem = ({
  item,
  onDelete,
  onEdit,
}: {
  item: Word;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}) => {
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
      <View
        style={{
          minHeight: wp("10%"),
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Animated.View
          style={[
            frontAnimatedStyle,
            { position: "absolute", backfaceVisibility: "hidden" },
          ]}
        >
          <View>
            <Text className="text-xl font-bold">{item.name}</Text>
            {item.sentence && (
              <Text
                style={{ width: wp("72%") }}
                numberOfLines={2}
                className="text-gray-600"
              >
                {item.sentence}
              </Text>
            )}
          </View>
        </Animated.View>

        <Animated.View
          style={[backAnimatedStyle, { backfaceVisibility: "hidden" }]}
        >
          <View>
            <Text className="text-xl font-bold">{item.meaning}</Text>
          </View>
        </Animated.View>
      </View>

      <View
        style={{ position: "absolute", right: wp("4%") }}
        className="flex-row"
      >
        <Pressable onPress={() => onDelete(item.id)}>
          <MaterialCommunityIcons name="delete" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => onEdit(item.id)}>
          <MaterialCommunityIcons name="pencil" size={24} color="black" />
        </Pressable>
      </View>
    </Pressable>
  );
};
