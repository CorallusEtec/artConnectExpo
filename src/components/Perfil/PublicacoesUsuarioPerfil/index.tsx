import { Publicacao } from "@/components/Publicacao";
import { useAuth } from "@/contexts/AuthContext";
import { PublicacaoProvider } from "@/contexts/PublicacaoContext";
import { usePerfilPublicacaoQuery } from "@/services/PublicacaoService";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { style } from "./style";

export function PublicacoesUsuarioPerfil() {
  const { getValidateId } = useAuth();

  const { data, isLoading } = usePerfilPublicacaoQuery(getValidateId());

  if (isLoading) return <></>;

  return (
    <View style={style.container}>
      <FlatList
        style={style.postFlatContainer}
        ListHeaderComponent={
          <Text variant="headlineMedium">Suas publicações</Text>
        }
        contentContainerStyle={style.postContentContainer}
        nestedScrollEnabled
        scrollEnabled={false}
        data={data?.content}
        renderItem={({ item }) => (
          <PublicacaoProvider
            key={getValidateId()}
            idPublicacaoInit={item.publicacao.id}
          >
            <Publicacao />
          </PublicacaoProvider>
        )}
      />
    </View>
  );
}
