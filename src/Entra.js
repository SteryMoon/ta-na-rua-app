import React, { useEffect, useRef, useState } from "react";
import { Animated, AccessibilityInfo } from "react-native";

// Animação de entrada (fade + sobe). Respeita "reduzir movimento".
export default function Entra({ atraso = 0, children }) {
  const v = useRef(new Animated.Value(0)).current;
  const [reduz, setReduz] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((r) => {
      setReduz(r);
      if (r) v.setValue(1);
      else Animated.timing(v, { toValue: 1, duration: 350, delay: atraso, useNativeDriver: true }).start();
    });
  }, []);
  return (
    <Animated.View style={{ opacity: v, transform: [{ translateY: reduz ? 0 : v.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] }}>
      {children}
    </Animated.View>
  );
}
