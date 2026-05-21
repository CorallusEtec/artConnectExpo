import { Image, View } from "react-native";
import { CommentInput } from "../CommentInput";
import { style } from "./style";

export function CommentWriter() {
  return (
    <View style={style.container}>
      {/* SUBSTITUIR PELA FOTO DO USUARIO */}
      <View style={style.imgContainer}>
        <Image
        style={style.img}
        source={require("@/assets/template/avatar.png")}
        />
      </View>
      <View style={style.inputContainer}>
        <CommentInput placeholder="Escreva seu comentário" />
      </View>
    </View>
  );
}
