import { ReactNode, useContext } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { style } from "./style";
import { AppUtils } from "@/services/AppUtils";
type PostHeaderProps = {
  children?: ReactNode;
  nomePerfil?: string;
  dataPublicacao?: Date;
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
            source={require("@/assets/template/avatar.png")}
          />
        </Pressable>
        <View>
          <Text style={style.headerTitle}>{nomePerfil}</Text>
          {props.dataPublicacao && <Text>{AppUtils.labelData(AppUtils.converterData(props.dataPublicacao))}</Text>}
        </View>
      </View>
      {children}
    </View>
  );
}
