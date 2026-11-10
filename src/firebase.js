import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// COLE AQUI o mesmo firebaseConfig usado na web
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "000000000000",
  appId: "SEU_APP_ID",
};

export const db = getFirestore(initializeApp(firebaseConfig));

export const STATUS = {
  aberta: { nome: "○ Aberta", cor: "#b42318" },
  em_andamento: { nome: "◐ Em andamento", cor: "#b54708" },
  resolvida: { nome: "✓ Resolvida", cor: "#027a48" },
};
export const CATEGORIAS = ["Buraco", "Iluminação", "Lixo"];
export const COR = { asfalto: "#1f2933", fundo: "#f2f5f7", faixa: "#ffc400", suave: "#4a5865" };
