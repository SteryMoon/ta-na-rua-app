import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, STATUS, COR } from "../firebase";
import Entra from "../Entra";
import Botao from "../Botao";

export default function Lista({ navigation }) {
  const [itens, setItens] = useState([]);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "ocorrencias"), orderBy("criadoEm", "desc"));
    return onSnapshot(q, (s) => setItens(s.docs.map((d) => ({ id: d.id, ...d.data() }))), () => setErro(true));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COR.fundo, padding: 16 }}>
      {erro && <Text style={{ fontSize: 16, color: "#b42318", marginBottom: 8 }}>Não foi possível carregar. Verifique a internet.</Text>}
      <FlatList
        data={itens}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={<Text style={{ fontSize: 18, color: COR.suave }}>Nenhuma ocorrência ainda. Toque em "Nova ocorrência".</Text>}
        renderItem={({ item, index }) => {
          const st = STATUS[item.status] || STATUS.aberta;
          return (
            <Entra atraso={index * 60}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${item.titulo}. Status: ${st.nome.slice(2)}. Toque para ver detalhes.`}
                onPress={() => navigation.navigate("Detalhe", { id: item.id })}
                style={{ minHeight: 64, backgroundColor: "#fff", borderRadius: 12, borderLeftWidth: 8, borderLeftColor: st.cor, padding: 16, marginBottom: 12 }}
              >
                <Text style={{ fontSize: 18, fontWeight: "700", color: COR.asfalto }}>{item.titulo}</Text>
                <Text style={{ fontSize: 16, color: COR.suave }}>{item.categoria} · {item.endereco}</Text>
                <Text style={{ fontSize: 16, fontWeight: "700", color: st.cor, marginTop: 4 }}>{st.nome}</Text>
              </Pressable>
            </Entra>
          );
        }}
      />
      <Botao titulo="Nova ocorrência" onPress={() => navigation.navigate("Nova")} />
    </View>
  );
}
