import { Publicacao } from "@/components/Publicacao";
import { PublicacaoProvider } from "@/contexts/PublicacaoContext";
import { useListarPublicacao } from "@/hooks/query/useListarPublicacao";
import { style } from "@/style/pages/(home)/home";
import { Suspense } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function Home() {
  const { data } = useListarPublicacao();
  return (
    <View style={style.container}>
      <Suspense fallback={<ActivityIndicator />}>
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
      </Suspense>
    </View>
  );
}
