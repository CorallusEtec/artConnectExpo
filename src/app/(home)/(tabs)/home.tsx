import { Header } from "@/components";
import { Publicacao } from "@/components/Publicacao";
import { RetryFetch } from "@/components/RetryFetch";
import { PublicacaoProvider } from "@/contexts/PublicacaoContext";
import { useFeedQuery } from "@/services/PublicacaoService";
import { style } from "@/style/pages/home";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Home() {
  const { data, error, isError, refetch, isLoading } = useFeedQuery({}, "feed");
  if (isError)
    return (
      <RetryFetch onRetry={() => refetch()}>
        <Text style={{ fontWeight: "500" }}>{error.message}</Text>
      </RetryFetch>
    );
  return (
    <>
      <Header />
      <View style={style.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            contentContainerStyle={style.listaContainer}
            data={data?.data.content}
            keyExtractor={(publi) => publi.publicacao.id.toString()}
            renderItem={({ item }) => (
              <PublicacaoProvider idPublicacaoInit={item.publicacao.id}>
                <Publicacao />
              </PublicacaoProvider>
            )}
          />
        )}
      </View>
    </>
  );
}
