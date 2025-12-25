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
import Feather from "@expo/vector-icons/Feather";

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

  let itemBgColor = "#ffdf20";
  if (item.type === "noun") {
    itemBgColor = "#8ec5ff";
  } else if (item.type === "verb") {
    itemBgColor = "#fda5d5";
  } else if (item.type === "adjective") {
    itemBgColor = "#dab2ff";
  } else if (item.type === "adverb") {
    itemBgColor = "#7bf1a8";
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
            <Text className="text-2xl  text-[#1b2b40]">{item.name}</Text>
            {item.sentence && (
              <Text
                style={{ width: wp("72%"), color: "#1b2b40" }}
                numberOfLines={2}
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
        style={{ position: "absolute", right: wp("4%"), gap: wp("2%") }}
        className="flex-row"
      >
        <Pressable onPress={() => onDelete(item.id)}>
          <Feather name="trash-2" size={24} color="#1b2b40" />
        </Pressable>
        <Pressable onPress={() => onEdit(item.id)}>
          <Feather name="edit-2" size={24} color="#1b2b40" />
        </Pressable>
      </View>
    </Pressable>
  );
};
