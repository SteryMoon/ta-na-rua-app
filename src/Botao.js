import React, { useRef } from "react";
import { Animated, Pressable, Text } from "react-native";
import { COR } from "./firebase";

// Botão grande (altura mínima 56) com microinteração de toque.
export default function Botao({ titulo, onPress, desabilitado }) {
  const s = useRef(new Animated.Value(1)).current;
  const anima = (to) => Animated.spring(s, { toValue: to, useNativeDriver: true, speed: 40 }).start();
  return (
    <Animated.View style={{ transform: [{ scale: s }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={titulo}
        accessibilityState={{ disabled: !!desabilitado }}
        disabled={desabilitado}
        onPress={onPress}
        onPressIn={() => anima(0.96)}
        onPressOut={() => anima(1)}
        style={{ minHeight: 56, borderRadius: 12, backgroundColor: desabilitado ? "#c9d2d9" : COR.faixa, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700", color: COR.asfalto }}>{titulo}</Text>
      </Pressable>
    </Animated.View>
  );
}
