import { useGetChatMessageHistory } from "@/services/ChatService";
import { useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { ChatMessage } from "../ChatMessage";
import { style } from "./style";

export function ChatMessageList() {
  const { id } = useLocalSearchParams();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetChatMessageHistory(Number(id));

  function renderFooter() {
    if (!isFetchingNextPage) return null;
    return <ActivityIndicator size={"large"} />;
  }

  if (isLoading) return <></>;
  return (
    <FlatList
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      style={style.container}
      inverted
      data={data?.pages.flatMap((page) => page.data.content) ?? []}
      contentContainerStyle={style.content}
      renderItem={({ item }) => <ChatMessage mensagem={item} />}
    />
  );
}
