import { Post } from "@/components/Post";
import { Action } from "@/components/Post/Action";
import { TextButton } from "@/components/TextButton";
import { gStyles } from "@/style/gStyle";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { style } from "./style";

// No React Native, o require precisa ser estático. 
// Passamos a referência da imagem diretamente no objeto.
const ART_POSTS = [
  {
    id: "1",
    usuario: "Beatriz Telas",
    data: new Date("2026-04-28T09:00:00"),
    legenda: "Explorando texturas com tinta a óleo hoje. O que acham dessa paleta de azuis?",
    likes: 124,
    comentarios: 12,
    imagem: require("@/assets/template/pintura.jpg"), // Caminho solicitado
  },
  {
    id: "2",
    usuario: "Marcos Escultor",
    data: new Date("2026-04-27T15:30:00"),
    legenda: "Finalizando o busto em argila. A paciência é a maior ferramenta do artista.",
    likes: 89,
    comentarios: 5,
    imagem: require("@/assets/template/argila.jpg"),
  },
  {
    id: "3",
    usuario: "Ana Aquarela",
    data: new Date("2026-04-27T10:00:00"),
    legenda: "O controle da água na aquarela é quase uma meditação. ✨",
    likes: 256,
    comentarios: 24,
    imagem: require("@/assets/template/aquarela.jpg"),
  },
  {
    id: "4",
    usuario: "Galeria Urbana",
    data: new Date("2026-04-26T20:00:00"),
    legenda: "Novo grafite finalizado no centro da cidade. A arte pertence às ruas!",
    likes: 1042,
    comentarios: 88,
    imagem: require("@/assets/template/violão.jpg"),
  },
  {
    id: "5",
    usuario: "Lucas Digital Art",
    data: new Date("2026-04-26T14:20:00"),
    legenda: "Concept art para o meu novo projeto de RPG. O que acharam do design do personagem?",
    likes: 432,
    comentarios: 31,
    imagem: require("@/assets/template/dj.avif"),
  },
  {
    id: "6",
    usuario: "Carla Fotografia",
    data: new Date("2026-04-25T18:45:00"),
    legenda: "A luz de ouro (Golden Hour) faz toda a diferença na fotografia de retrato.",
    likes: 156,
    comentarios: 9,
    imagem: require("@/assets/template/canto.jpg"),
  },
  {
    id: "7",
    usuario: "Renato Design",
    data: new Date("2026-04-25T11:00:00"),
    legenda: "Minimalismo: Menos é mais. Estudando a escola Bauhaus hoje.",
    likes: 77,
    comentarios: 4,
    imagem: require("@/assets/template/mini.jpg"),
  },
  {
    id: "8",
    usuario: "Sofia Bordados",
    data: new Date("2026-04-24T16:15:00"),
    legenda: "Bordado livre inspirado na flora brasileira. Cada ponto conta uma história.",
    likes: 312,
    comentarios: 18,
    imagem: require("@/assets/template/bordado.webp"),
  },
  {
    id: "9",
    usuario: "Tati Ilustra",
    data: new Date("2026-04-24T08:00:00"),
    legenda: "Sketchbook de domingo. Às vezes o rascunho é melhor que a arte final!",
    likes: 2100,
    comentarios: 150,
    imagem: require("@/assets/template/sketch.jpg"),
  },
  {
    id: "10",
    usuario: "Tati Ilustra",
    data: new Date("2026-04-23T19:30:00"),
    legenda: "Sketchbook de domingo. Às vezes o rascunho é melhor que a arte final!",
    likes: 540,
    comentarios: 42,
    imagem: require("@/assets/template/avatar.png"),
  }
];

export default function Home() {
  return (
    <>
      <View style={style.navbar}>
        <Image
          style={style.banner}
          source={require("@/assets/img/banner.png")}
        />
        <TouchableOpacity>
          <AntDesign name="message" color={gStyles.cinza[600]} size={22} />
        </TouchableOpacity>
      </View>
      
      <View style={style.container}>
        <FlatList
          data={ART_POSTS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 30, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <Post.root>
              <Post.header nomePerfil={item.usuario} data={item.data}>
                <Post.headerActions>
                  <TextButton title="Seguir" theme="secondary" />
                </Post.headerActions>
              </Post.header>

              <Post.legend data={item.legenda} />

              {/* Agora a imagem vem dinamicamente do objeto do post */}
              <Image 
                source={item.imagem} 
                style={{ width: '100%', height: 300, borderRadius: 8 }}
                resizeMode="cover"
              />

              <Post.actions>
                <Action insight={item.likes}>
                  <FontAwesome name="heart-o" size={24} color={gStyles.vermelho[400]} />
                </Action>
                <Action insight={item.comentarios}>
                  <Feather name="message-circle" size={24} color={gStyles.cinza[600]} />
                </Action>
              </Post.actions>
            </Post.root>
          )}
        />
      </View>
    </>
  );
}