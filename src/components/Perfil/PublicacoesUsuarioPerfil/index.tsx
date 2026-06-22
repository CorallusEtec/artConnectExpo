import { Publicacao } from "@/components/Publicacao";
import { usePerfil } from "@/contexts";
import { PublicacaoProvider } from "@/contexts/PublicacaoContext";
import { usePerfilPublicacaoQuery } from "@/services/PublicacaoService";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { style } from "./style";

export function PublicacoesUsuarioPerfil() {
  const { dataPerfil } = usePerfil();

  const { data, isLoading } = usePerfilPublicacaoQuery(dataPerfil?.id ?? 0);

  if (!dataPerfil || isLoading) return <></>;

  return (
    <View style={style.container}>
      <FlatList
        style={style.postFlatContainer}
        ListHeaderComponent={
          <Text variant="headlineMedium">Publicações</Text>
        }
        contentContainerStyle={style.postContentContainer}
        nestedScrollEnabled
        scrollEnabled={false}
        data={data?.content}
        renderItem={({ item }) => (
          <PublicacaoProvider
            key={item.publicacao.id}
            idPublicacaoInit={item.publicacao.id}
          >
            <Publicacao />
          </PublicacaoProvider>
        )}
      />
    </View>
  );
}