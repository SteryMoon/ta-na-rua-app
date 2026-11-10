# Tá na Rua – Aplicativo mobile

Global Solution CitizenTech (FIAP) – parte **mobile** da solução Tá na Rua.

## Integrantes
- Stephanie da Silva Cruz – RM561341

## Descrição da solução
Tá na Rua ajuda o morador a avisar a prefeitura sobre problemas urbanos (buraco, iluminação e lixo) e a acompanhar a resolução.

No app, o cidadão:
1. vê a lista das ocorrências e o status de cada uma;
2. registra uma **nova ocorrência** (categoria, título, endereço e descrição);
3. abre o **detalhe** e acompanha o andamento: Aberta, Em andamento ou Resolvida.

A parte web (painel da prefeitura) está em outro repositório:
- Repositório da web: https://github.com/SteryMoon/ta-na-rua-web
- Plataforma publicada: COLE_AQUI_O_LINK_DA_VERCEL

## Como a integração funciona
App e web usam o mesmo banco **Firebase Firestore**, na coleção `ocorrencias`.
1. O app cria o documento com `status: "aberta"`.
2. A web recebe a ocorrência em tempo real (`onSnapshot`) e a prefeitura altera o `status`.
3. O app recebe a mudança na hora e atualiza a tela de detalhe.

## Tecnologias
React Native com Expo, React Navigation e Firebase Firestore.

## Motion design
- Entrada suave dos cartões da lista, para mostrar que o conteúdo carregou.
- Botões que reagem ao toque, para confirmar a ação.
- "Pulso" no cartão de status quando a web muda o andamento, para mostrar que algo mudou.
- Transição lateral entre telas, para orientar a navegação.
- Todas as animações respeitam a opção "reduzir movimento" do aparelho.

## Acessibilidade
- Botões e campos com no mínimo 56 px de altura.
- Rótulos de acessibilidade em botões, campos e opções.
- Status sempre com texto e símbolo, nunca só cor.
- Contraste alto e texto que acompanha o tamanho de fonte do sistema.
- Linguagem simples e direta.

## Como executar
Pré-requisitos: Node.js e o app **Expo Go** no celular.

```bash
git clone https://github.com/SteryMoon/ta-na-rua-app.git
cd ta-na-rua-app
npm install
npx expo start -c
```

Escaneie o QR code com o Expo Go (celular e computador na mesma rede Wi-Fi). Se não conectar, use `npx expo start --tunnel`.

O arquivo `src/firebase.js` contém a configuração do Firebase usada pelo app.

## ODS
**ODS 11 – Cidades e comunidades sustentáveis.** O app aproxima o cidadão do poder público e ajuda a manter as ruas seguras e conservadas.
