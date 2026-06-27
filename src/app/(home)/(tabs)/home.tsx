import { Header } from "@/components";
import { Publicacao } from "@/components/Publicacao";
import { RetryFetch } from "@/components/RetryFetch";
import { useAuth } from "@/contexts";
import { PublicacaoProvider } from "@/contexts/PublicacaoContext";
import { useFeedQuery } from "@/services/PublicacaoService";
import { style } from "@/style/pages/home";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Home() {
  const {
    data,
    hasNextPage,
    error,
    isFetchingNextPage,
    isError,
    refetch,
    fetchNextPage,
    isLoading,
  } = useFeedQuery({}, "feed");
  const { getValidateId } = useAuth();

  function renderFooter() {
    if (!isFetchingNextPage) return null;
    return <ActivityIndicator size={"large"} />;
  }

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
            data={data?.pages.flatMap((page) => page.data.content) ?? []}
            keyExtractor={(publi, index) =>
              `${publi.publicacao.id.toString()}-${index}`
            }
            renderItem={({ item }) => (
              <PublicacaoProvider idPublicacaoInit={item.publicacao.id}>
                <Publicacao />
              </PublicacaoProvider>
            )}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            onEndReached={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
          />
        )}
      </View>
    </>
  );
}
