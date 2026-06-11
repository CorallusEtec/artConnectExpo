import { Publicacao } from "@/components/Publicacao";
import { RetryFetch } from "@/components/RetryFetch";
import { PublicacaoProvider } from "@/contexts/PublicacaoContext";
import { usePublicacaoQuery } from "@/services/PublicacaoService";
import { style } from "@/style/pages/(home)/home";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Home() {
  const { data, error, isError, isPending, refetch } = usePublicacaoQuery();

  if (isPending) return <ActivityIndicator />;
  if (isError)
    return (
      <RetryFetch onRetry={() => refetch()}>
        <Text style={{ fontWeight: "500" }}>{error.message}</Text>
      </RetryFetch>
    );

  return (
    <View style={style.container}>
      <FlatList
        contentContainerStyle={style.listaContainer}
        data={data?.data.content}
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
