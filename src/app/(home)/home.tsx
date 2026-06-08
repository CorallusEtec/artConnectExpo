import { Publicacao } from "@/components/Publicacao";
import { MockData, PublicacaoProvider } from "@/contexts/PublicacaoContext";
import { style } from "@/style/pages/(home)/home";
import { FlatList, View } from "react-native";

export default function Home() {
  const publi: MockData[] = [
    { id: 1, titulo: "Olá Mundo um", dataPublicacao: "2026-05-06T09:06:00Z" },
    {
      id: 3,
      titulo: "Olá Mundo dois",
      dataPublicacao: "2026-05-06T09:06:00Z",
    },
    {
      id: 4,
      titulo: "Olá Mundo dois",
      dataPublicacao: "2026-05-06T09:06:00Z",
    },
    {
      id: 5,
      titulo: "Olá Mundo dois",
      dataPublicacao: "2026-05-06T09:06:00Z",
    },
  ];

  return (
    <View style={style.container}>
      <FlatList
        contentContainerStyle={style.listaContainer}
        data={publi}
        keyExtractor={(publi) => publi.id.toString()}
        renderItem={({ item }) => (
          <PublicacaoProvider dadosPubli={item}>
            <Publicacao />
          </PublicacaoProvider>
        )}
      />
    </View>
  );
}
