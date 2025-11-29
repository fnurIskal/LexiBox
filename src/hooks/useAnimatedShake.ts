import { useCallback } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  withRepeat,
  withSpring,
  Easing,
  useDerivedValue,
} from "react-native-reanimated";

export const useAnimatedShake = () => {
  const shakeTranslateX = useSharedValue(0);

  const shake = useCallback(() => {
    const TranslationAmount = 10;
    const timingConfig = {
      duration: 80,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    };
    shakeTranslateX.value = withSequence(
      withTiming(TranslationAmount, timingConfig),
      withRepeat(withTiming(-TranslationAmount, timingConfig), 3, true),
      withSpring(0, { mass: 0.5 })
      //withTiming(0)
    );
  }, []);

  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeTranslateX.value }],
    };
  });

  const isShaking = useDerivedValue(() => {
    return shakeTranslateX.value !== 0;
  });

  return { shakeStyle, shake, isShaking };
};
