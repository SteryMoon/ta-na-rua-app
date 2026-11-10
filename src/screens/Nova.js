import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput } from "react-native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, CATEGORIAS, COR } from "../firebase";
import Botao from "../Botao";

const campo = { minHeight: 56, backgroundColor: "#fff", borderRadius: 12, borderWidth: 2, borderColor: COR.asfalto, padding: 12, fontSize: 18, marginBottom: 16, color: COR.asfalto };
const rotulo = { fontSize: 18, fontWeight: "700", color: COR.asfalto, marginBottom: 6 };

export default function Nova({ navigation }) {
  const [categoria, setCategoria] = useState("Buraco");
  const [titulo, setTitulo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar() {
    if (!titulo.trim() || !endereco.trim()) return Alert.alert("Faltam dados", "Preencha o título e o endereço.");
    setEnviando(true);
    try {
      await addDoc(collection(db, "ocorrencias"), { titulo: titulo.trim(), categoria, endereco: endereco.trim(), descricao: descricao.trim(), status: "aberta", criadoEm: serverTimestamp() });
      navigation.goBack();
    } catch (e) {
      Alert.alert("Não foi possível enviar", "Verifique a internet e tente de novo.");
      setEnviando(false);
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COR.fundo }} contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
      <Text style={rotulo}>Tipo de problema</Text>
      <ScrollView horizontal={false} style={{ marginBottom: 16 }}>
        {CATEGORIAS.map((c) => {
          const ativo = c === categoria;
          return (
            <Pressable key={c} accessibilityRole="radio" accessibilityState={{ selected: ativo }} accessibilityLabel={c} onPress={() => setCategoria(c)}
              style={{ minHeight: 56, borderRadius: 12, borderWidth: 2, borderColor: COR.asfalto, backgroundColor: ativo ? COR.asfalto : "#fff", justifyContent: "center", paddingHorizontal: 16, marginBottom: 8 }}>
              <Text style={{ fontSize: 18, fontWeight: "700", color: ativo ? "#fff" : COR.asfalto }}>{ativo ? "✓ " : ""}{c}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <Text style={rotulo}>Título</Text>
      <TextInput accessibilityLabel="Título da ocorrência" style={campo} value={titulo} onChangeText={setTitulo} placeholder="Ex.: Buraco na Rua das Flores" />
      <Text style={rotulo}>Endereço</Text>
      <TextInput accessibilityLabel="Endereço do problema" style={campo} value={endereco} onChangeText={setEndereco} placeholder="Rua e número" />
      <Text style={rotulo}>Descrição (opcional)</Text>
      <TextInput accessibilityLabel="Descrição do problema" style={[campo, { minHeight: 100, textAlignVertical: "top" }]} value={descricao} onChangeText={setDescricao} multiline placeholder="Conte o que está acontecendo" />
      <Botao titulo={enviando ? "Enviando..." : "Enviar ocorrência"} onPress={enviar} desabilitado={enviando} />
    </ScrollView>
  );
}
