import { Publicacao } from "@/components/Publicacao";
import { usePerfil } from "@/contexts";
import { PublicacaoProvider } from "@/contexts/PublicacaoContext";
import { usePerfilPublicacaoQuery } from "@/services/PublicacaoService";
import { gStyles } from "@/style/gStyle";
import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { style } from "./style";

type Tab = "publicacoes" | "salvos";

export function PublicacoesUsuarioPerfil() {
  const { dataPerfil } = usePerfil();
  const theme = useTheme();
  const { data, isLoading } = usePerfilPublicacaoQuery(dataPerfil?.id ?? 0);
  const [activeTab, setActiveTab] = useState<Tab>("publicacoes");

  if (!dataPerfil || isLoading) return <></>;

  return (
    <View style={style.container}>
      <View style={style.tabBar}>
        <Pressable
          style={[
            style.tabItem,
            activeTab === "publicacoes" && {
              borderBottomColor: theme.colors.primary,
              borderBottomWidth: 2,
            },
          ]}
          onPress={() => setActiveTab("publicacoes")}
        >
          <Icon
            source="view-grid-outline"
            size={26}
            color={
              activeTab === "publicacoes"
                ? theme.colors.primary
                : gStyles.cinza[400]
            }
          />
        </Pressable>
      </View>

      {activeTab === "publicacoes" && (
        <>
          {data && data.content.length > 0 ? (
            <FlatList
              style={style.postFlatContainer}
              contentContainerStyle={style.postContentContainer}
              nestedScrollEnabled
              scrollEnabled={false}
              data={data.content}
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
              style={[style.emptyText, { color: gStyles.cinza[500] }]}
              variant="titleMedium"
            >
              Nenhuma publicação disponível
            </Text>
          )}
        </>
      )}
    </View>
  );
}