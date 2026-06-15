import { Publicacao } from "@/components/Publicacao";
import { useAuth } from "@/contexts/AuthContext";
import { PublicacaoProvider } from "@/contexts/PublicacaoContext";
import { useFeedQuery } from "@/services/PublicacaoService";
import { ActivityIndicator, FlatList, View } from "react-native";
import { style } from "./style";

export function PublicacoesUsuarioPerfil() {
  const { getValidateId } = useAuth();

  const { data, isLoading } = useFeedQuery(
    {
      idUsuario: getValidateId(),
    },
    "perfil",
  );

  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={style.container}>
      <FlatList
        style={style.postFlatContainer}
        contentContainerStyle={style.postContentContainer}
        nestedScrollEnabled
        data={data?.data.content}
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
