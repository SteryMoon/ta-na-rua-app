import React, { useEffect, useRef, useState } from "react";
import { Animated, ScrollView, Text, View } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { db, STATUS, COR } from "../firebase";
import Entra from "../Entra";

const ETAPAS = ["aberta", "em_andamento", "resolvida"];

export default function Detalhe({ route }) {
  const [o, setO] = useState(null);
  const pulso = useRef(new Animated.Value(1)).current;

  useEffect(() => onSnapshot(doc(db, "ocorrencias", route.params.id), (d) => setO(d.exists() ? d.data() : null)), []);

  // Quando a web muda o status, o cartão dá um pequeno "pulso" para mostrar a mudança.
  useEffect(() => {
    if (!o) return;
    Animated.sequence([
      Animated.timing(pulso, { toValue: 1.05, duration: 150, useNativeDriver: true }),
      Animated.timing(pulso, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  }, [o?.status]);

  if (!o) return <Text style={{ padding: 16, fontSize: 18 }}>Carregando...</Text>;
  const st = STATUS[o.status] || STATUS.aberta;
  const atual = ETAPAS.indexOf(o.status);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COR.fundo }} contentContainerStyle={{ padding: 16 }}>
      <Entra>
        <Text accessibilityRole="header" style={{ fontSize: 24, fontWeight: "700", color: COR.asfalto }}>{o.titulo}</Text>
        <Text style={{ fontSize: 18, color: COR.suave, marginVertical: 8 }}>{o.categoria} · {o.endereco}</Text>
        <Text style={{ fontSize: 18, color: COR.asfalto, marginBottom: 20 }}>{o.descricao || "Sem descrição."}</Text>
        <Animated.View accessibilityLiveRegion="polite" style={{ transform: [{ scale: pulso }], backgroundColor: "#fff", borderRadius: 12, borderLeftWidth: 8, borderLeftColor: st.cor, padding: 16, marginBottom: 20 }}>
          <Text style={{ fontSize: 16, color: COR.suave }}>Status atual</Text>
          <Text style={{ fontSize: 22, fontWeight: "700", color: st.cor }}>{st.nome}</Text>
        </Animated.View>
        {ETAPAS.map((e, i) => (
          <View key={e} style={{ flexDirection: "row", alignItems: "center", minHeight: 44 }}>
            <Text style={{ fontSize: 20, width: 32, color: i <= atual ? STATUS[e].cor : "#98a2b3" }}>{i <= atual ? "●" : "○"}</Text>
            <Text style={{ fontSize: 18, fontWeight: i === atual ? "700" : "400", color: COR.asfalto }}>{STATUS[e].nome.slice(2)}{i === atual ? " (agora)" : ""}</Text>
          </View>
        ))}
      </Entra>
    </ScrollView>
  );
}
