import { usePublicacao } from "@/contexts";
import { useComentarioMutation } from "@/services/ComentarioService";
import { useState } from "react";
import { View } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { style } from "./style";

export function ComentarioSender() {
  const [input, setInput] = useState("");
  const [valid, setValid] = useState(false);
  const { mutate } = useComentarioMutation();
  const { idPublicacao } = usePublicacao();

  function handleInputComentario(inputValue: string) {
    setInput(inputValue);
    if (inputValue.trim() == "") {
      setValid(false);
    } else {
      setValid(true);
    }
  }

  function sendComment() {
    mutate({ idPublicacao: idPublicacao, mensagem: input });

    setInput("");
    setValid(false);
  }

  return (
    <View style={style.container}>
      <TextInput
        mode="outlined"
        value={input}
        onChangeText={handleInputComentario}
        multiline
        numberOfLines={3}
        placeholder="Escreva seu comentário"
        outlineStyle={style.borderInput}
        style={style.input}
        maxLength={100}
      />
      <IconButton
        icon="send"
        mode="contained"
        onPress={sendComment}
        disabled={!valid}
      />
    </View>
  );
}
