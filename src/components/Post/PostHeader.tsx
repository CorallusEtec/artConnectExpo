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
  function converterData(data: Date) {
    const dataAtual = new Date(Date.now());
    if (data.getFullYear() < dataAtual.getFullYear()) {
      return `${dataAtual.getFullYear() - data.getFullYear()} anos atrás`;
    } else if (data.getMonth() < dataAtual.getMonth()) {
      return `${dataAtual.getMonth() - data.getMonth()} meses atrás`;
    } else if (data.getDate() < dataAtual.getDate()) {
      return `${dataAtual.getDate() - data.getDate()} dias atrás`;
    }
  }

  return (
    <View style={style.headerContainer}>
      <View style={style.header}>
        <Pressable onPress={props.onProfile}>
          <Image
            style={style.headerProfile}
            source={require("@/assets/template/avatar.png")}
          />
        </Pressable>
        <View>
          <Text style={style.headerTitle}>{nomePerfil}</Text>
          {props.data && <Text>{converterData(props.data)}</Text>}
        </View>
      </View>
      {children}
    </View>
  );
}
