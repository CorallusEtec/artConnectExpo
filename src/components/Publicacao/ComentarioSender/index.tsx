import { useState } from "react";
import { View } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { style } from "./style";

export function ComentarioSender() {
  const [input, setInput] = useState("");
  const [valid, setValid] = useState(false);

  function handleInputComentario(inputValue: string) {
    setInput(inputValue);
    if (inputValue.trim() == "") {
      setValid(false);
    } else {
      setValid(true);
    }
  }

  return (
    <View style={style.container}>
      <TextInput
        mode="outlined"
        value={input}
        onChangeText={handleInputComentario}
        placeholder="Escreva seu comentário"
        outlineStyle={style.borderInput}
        style={style.input}
        maxLength={100}
      />
      <IconButton icon="send" mode="contained" disabled={!valid} />
    </View>
  );
}
