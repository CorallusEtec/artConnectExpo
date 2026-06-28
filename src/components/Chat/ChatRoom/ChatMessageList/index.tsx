import { useGetChatMessageHistory } from "@/services/ChatService";
import { useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native";
import { ChatMessage } from "../ChatMessage";
import { style } from "./style";

export function ChatMessageList() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetChatMessageHistory(Number(id));

  if (isLoading) return <></>;
  return (
    <FlatList
      style={style.container}
      inverted
      data={data?.pages.flatMap((page) => page.data.content) ?? []}
      contentContainerStyle={style.content}
      renderItem={({ item }) => <ChatMessage mensagem={item} />}
    />
  );
}
