import { View } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { style } from "./style";

export function ComentarioSender() {
  return (
    <View>
      <TextInput mode="outlined" style={style.input} maxLength={100} />
      <View style={style.actionContainer}>
        <IconButton icon="sticker-emoji" />
        <IconButton icon="send" mode="contained" disabled />
      </View>
    </View>
  );
}
