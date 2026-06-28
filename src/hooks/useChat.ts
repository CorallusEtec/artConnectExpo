import { useAuth } from "@/contexts";
import { ChatMessageRequest } from "@/models/request/ChatMessageRequest";
import { ChatMessageResponse } from "@/models/response/ChatMessageResponse";
import config from "@/services/config";
import { Client, Versions } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import SockJS from "sockjs-client";

export function useChat(
  idContato: number,
  onMessageReceived: (novaMsg: ChatMessageResponse) => void,
) {
  const [connected, setConnected] = useState(false);
  const { getValidateId } = useAuth();
  const queryClient = useQueryClient();
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(config.wsUrl),
      reconnectDelay: 5000, // Tenta reconectar a cada 5 segundos se cair
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      stompVersions: new Versions(["1.1"]),
      debug: (str) => console.log("STOMP DEBUG: ", str),
    });

    client.onConnect = (frame) => {
      setConnected(true);
      console.log("Conectado ao STOMP:", frame);
      const menorId = Math.min(getValidateId(), idContato);
      const maiorId = Math.max(getValidateId(), idContato);

      const canalUnico = `/topic/chat.${menorId}-${maiorId}`;

      //`/user/${idContato}/queue/messages`

      client.subscribe(canalUnico, (message) => {
        if (message.body) {
          const chatMessage = JSON.parse(message.body);
          onMessageReceived(chatMessage);
          queryClient.invalidateQueries({
            queryKey: [getValidateId(), "chatHistory"],
          });
          queryClient.invalidateQueries({
            queryKey: [idContato, "chatRoom"],
          });
        }
      });
    };
    client.onDisconnect = () => {
      setConnected(false);
      console.log("Desconectado do STOMP");
    };

    client.onStompError = (frame) => {
      console.error("Erro no STOMP:", frame.headers["message"]);
    };

    client.activate();
    stompClientRef.current = client;

    // Desconecta automaticamente quando o componente for desmontado
    return () => {
      if (stompClientRef.current) stompClientRef.current.deactivate();
    };
  }, [getValidateId()]);

  // Função para enviar mensagem equivalente ao SEND do Postman
  const sendMessage = (recipientId: number, content: string) => {
    if (stompClientRef.current && connected) {
      const payload: ChatMessageRequest = {
        senderId: getValidateId(),
        recipientId: recipientId,
        mensagem: content,
      };

      stompClientRef.current.publish({
        destination: "/app/send",
        body: JSON.stringify(payload),
      });

      queryClient.invalidateQueries({
        queryKey: [getValidateId(), "chatHistory"],
      });
    } else {
      console.warn("Não foi possível enviar: Cliente não conectado.");
    }
  };

  return { connected, sendMessage };
}
