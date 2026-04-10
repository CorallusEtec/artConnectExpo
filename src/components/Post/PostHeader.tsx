import { ReactNode } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { style } from "./style";

type PostHeaderProps = {
  children?: ReactNode;
  nomePerfil?: string;
  data?: Date;
  onProfile?: () => void;
};

export function PostHeader({
  nomePerfil = "",
  children = <></>,
  ...props
}: PostHeaderProps) {
  return (
    <View style={style.headerContainer}>
      <View style={style.header}>
        <Pressable onPress={props.onProfile}>
          <Image
            style={style.headerProfile}
            source={require("@/assets/template/perfil.jpg")}
          />
        </Pressable>
        <View>
          <Text style={style.headerTitle}>{nomePerfil}</Text>
          {props.data && <Text>{props.data.toLocaleString()}</Text>}
        </View>
      </View>
      {children}
    </View>
  );
}
