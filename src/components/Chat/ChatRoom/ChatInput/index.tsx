import { useChat } from "@/hooks/useChat";
import { ChatMessageResponse } from "@/models/response/ChatMessageResponse";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { IconButton, TextInput, useTheme } from "react-native-paper";
import { style } from "./style";

export function ChatInput() {
  const { id } = useLocalSearchParams();
  const [mensagens, setMensagens] = useState<ChatMessageResponse[]>([]);
  const queryClient = useQueryClient();

  const { sendMessage } = useChat(Number(id), (msg: ChatMessageResponse) => {
    if (msg.sender.id == Number(id)) {
      queryClient.invalidateQueries({ queryKey: [Number(id), "chatRoom"] });
    }
  });

  const theme = useTheme();
  const [valid, setValid] = useState(false);
  const [input, setInput] = useState("");

  function handleInputChat(inputValue: string) {
    setInput(inputValue);
    if (inputValue.trim() == "") {
      setValid(false);
    } else {
      setValid(true);
    }
  }

  function send() {
    sendMessage(Number(id), input);

    setInput("");
    setValid(false);
  }

  return (
    <View style={style.container}>
      <TextInput
        mode="outlined"
        multiline
        value={input}
        onChangeText={handleInputChat}
        style={style.input}
        placeholder="Mensagem"
      />
      <IconButton
        iconColor={theme.colors.onPrimary}
        containerColor={theme.colors.primary}
        mode="contained"
        disabled={!valid}
        onPress={() => send()}
        icon="send"
      />
    </View>
  );
}
