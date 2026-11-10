import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Lista from "./src/screens/Lista";
import Nova from "./src/screens/Nova";
import Detalhe from "./src/screens/Detalhe";
import { COR } from "./src/firebase";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: COR.asfalto }, headerTintColor: "#fff", headerTitleStyle: { fontSize: 20 }, animation: "slide_from_right" }}>
        <Stack.Screen name="Lista" component={Lista} options={{ title: "Tá na Rua" }} />
        <Stack.Screen name="Nova" component={Nova} options={{ title: "Nova ocorrência" }} />
        <Stack.Screen name="Detalhe" component={Detalhe} options={{ title: "Acompanhar" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
