import { use, useCallback } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  withSpring,
  Easing,
} from "react-native-reanimated";

export const useAnimationBounce = () => {
  const correctScale = useSharedValue(1);

  const bounce = useCallback(() => {
    correctScale.value = withSequence(
      withTiming(1.15, { duration: 75, easing: Easing.out(Easing.ease) }),
      withSpring(1, { damping: 20, stiffness: 100 })
    );
  }, []);

  const bounceStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: correctScale.value }],
    };
  });

  return { bounceStyle, bounce };
};
