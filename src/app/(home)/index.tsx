import { Publicacao } from "@/components/Publicacao";
import { PublicacaoProvider } from "@/contexts/PublicacaoContext";
import { useListarPublicacao } from "@/hooks/query/useListarPublicacao";
import { style } from "@/style/pages/(home)/home";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Home() {
  const { data, isError, error, isPending } = useListarPublicacao();
  if (isPending) return <ActivityIndicator />;
  return (
    <View style={style.container}>
      {isError && <Text>{error.message}</Text>}
      <FlatList
        contentContainerStyle={style.listaContainer}
        data={data?.content}
        keyExtractor={(publi) => publi.publicacao.id.toString()}
        renderItem={({ item }) => (
          <PublicacaoProvider dadosPubli={item}>
            <Publicacao />
          </PublicacaoProvider>
        )}
      />
    </View>
  );
}
