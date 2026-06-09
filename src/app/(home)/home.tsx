import { Publicacao } from "@/components/Publicacao";
import { PublicacaoProvider } from "@/contexts/PublicacaoContext";
import PublicacoesService from "@/services/PublicacoesService";
import { style } from "@/style/pages/(home)/home";
import { Suspense, use } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

const publicacoesPromise = PublicacoesService.findAll();

export default function Home() {
  const publicacoaData = use(publicacoesPromise);

  console.log(publicacoaData);
  return (
    <View style={style.container}>
      <Suspense fallback={<ActivityIndicator />}>
        <FlatList
          contentContainerStyle={style.listaContainer}
          data={publicacoaData?.content}
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
