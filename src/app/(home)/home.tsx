import { Publicacao } from "@/components/Publicacao";
import { style } from "@/style/pages/(home)/home";
import { FlatList, View } from "react-native";

export default function Home() {
  const publi = [
    { id: 1, titulo: "Olá Mundo" },
    { id: 3, titulo: "Olá Mundo dois" },
    { id: 4, titulo: "Olá Mundo dois" },
    { id: 5, titulo: "Olá Mundo dois" },
    { id: 6, titulo: "Olá Mundo dois" },
    { id: 7, titulo: "Olá Mundo dois" },
    { id: 8, titulo: "Olá Mundo dois" },
  ];

  return (
    <View style={style.container}>
      <FlatList
        contentContainerStyle={style.listaContainer}
        data={publi}
        keyExtractor={(publi) => publi.id.toString()}
        renderItem={({ item }) => <Publicacao />}
      />
    </View>
  );
}
