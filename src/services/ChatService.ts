import { useAuth } from "@/contexts";
import { ChatMessageResponse } from "@/models/response/ChatMessageResponse";
import { PagedResponse } from "@/models/response/PagedResponse";
import { UsuarioResponse } from "@/models/response/UsuarioResponse";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import config from "./config";

export function useGetChatHistory() {
  const { getValidateId, getValidateToken } = useAuth();
  const query = useQuery({
    queryKey: [getValidateId(), "chatHistory"],
    queryFn: () => ChatService.getHistory(getValidateToken()),
  });
  return query;
}

export function useGetChatMessageHistory(recipientId: number) {
  const { getValidateToken } = useAuth();
  const query = useInfiniteQuery({
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.last
        ? undefined
        : lastPage.data.pageable.pageNumber + 1;
    },
    queryKey: [recipientId, "chatRoom"],
    enabled: !!recipientId,
    queryFn: () =>
      ChatService.getMessageHistory(recipientId, getValidateToken()),
  });

  return query;
}

class ChatService {
  static async getHistory(token: string) {
    const response = await config.axiosClient.get<UsuarioResponse[]>(
      `${config.apiUrl}/message/contactsHistory`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response;
  }

  static async getMessageHistory(recipientId: number, token: string) {
    const response = await config.axiosClient.get<
      PagedResponse<ChatMessageResponse>
    >(`${config.apiUrl}/message/messageHistory/${recipientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }
}
