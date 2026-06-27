import { Publicacao } from "@/components/Publicacao";
import { usePerfil } from "@/contexts";
import { PublicacaoProvider } from "@/contexts/PublicacaoContext";
import { usePerfilPublicacaoQuery } from "@/services/PublicacaoService";
import { gStyles } from "@/style/gStyle";
import { FlatList, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { style } from "./style";

export function PublicacoesUsuarioPerfil() {
  const { dataPerfil } = usePerfil();
  const theme = useTheme();
  const { data, isLoading } = usePerfilPublicacaoQuery(dataPerfil?.id ?? 0);

  if (!dataPerfil || isLoading) return <></>;

  return (
    <View style={style.container}>
      {data && data?.content.length > 0 ? (
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
      ) : (
        <Text
          style={{
            color: gStyles.cinza[500],
            textAlign: "center",
            marginBottom: 20,
          }}
          variant="titleMedium"
        >
          Nenhuma publicação disponível
        </Text>
      )}
    </View>
  );
}
