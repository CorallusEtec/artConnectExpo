import { AvatarRender } from "@/components/AvatarRender";
import { useGetChatHistory } from "@/services/ChatService";
import { AppUtils } from "@/utils/AppUtils";
import { router } from "expo-router";
import { FlatList } from "react-native";
import { ActivityIndicator, List, Text } from "react-native-paper";

export function ChatContactsHistoryList() {
  const { data, isLoading } = useGetChatHistory();

  if (isLoading) return <ActivityIndicator />;

  if (data?.data != undefined && data?.data.length > 0) {
    <FlatList
      scrollEnabled={false}
      data={data?.data ?? []}
      renderItem={({ item }) => (
        <List.Item
          onPress={() => router.navigate(`/chat/${item.id}`)}
          left={() => (
            <AvatarRender uri={item.fotoPerfilUrl} nome={item.nome} size={40} />
          )}
          description={
            <Text variant="bodySmall">
              {AppUtils.capitalize(item.tipoConta)}
            </Text>
          }
          title={<Text variant="titleSmall">{item.nome}</Text>}
        />
      )}
    />;
  } else {
    return (
      <List.Item
        title={
          <Text variant="labelMedium">
            Seu histórico de conversas aparecerá aqui
          </Text>
        }
      />
    );
  }
}
