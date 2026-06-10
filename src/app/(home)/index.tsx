import { Publicacao } from "@/components/Publicacao";
import { RetryFetch } from "@/components/RetryFetch";
import { PublicacaoProvider } from "@/contexts/PublicacaoContext";
import { usePublicacaoQuery } from "@/hooks/usePublicacaoQuery";
import { style } from "@/style/pages/(home)/home";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Home() {
  const theme = useTheme();
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
