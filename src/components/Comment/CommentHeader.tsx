import { AppUtils } from "@/services/AppUtils";
import { ReactNode } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useCommentContext } from "./CommentContext";
import { style } from "./style";
export type ComentarioHeaderProps = {
  children?: ReactNode;
  onProfile?: () => void;
};

export function CommentHeader({
  children = <></>,
  ...props
}: ComentarioHeaderProps) {
  /* HEADER REUTILIZADO DO COMPONENTE DE PUBLICACAO (MESMO LAYOUT) */

  const { autor, dataComentario } = useCommentContext();
  return (
    <View style={style.headerContainer}>
      <View style={style.header}>
        {/* FOTO DO AUTOR */}
        <Pressable onPress={props.onProfile}>
          <Image
            style={style.headerProfile}
            source={require("@/assets/template/avatar.png")}
          />
        </Pressable>

        {/* NOME E DATA */}
        <View>
          <Text style={style.headerTitle}>{autor.nome}</Text>
          {dataComentario && (
            <Text>
              {AppUtils.labelData(
                AppUtils.converterData(new Date(dataComentario)),
              )}
            </Text>
          )}
          {/* MOCK DE DATA */}
          {
            <Text>
              {AppUtils.labelData(
                AppUtils.converterData(new Date("2023-02-10T09:32:10")),
              )}
            </Text>
          }
        </View>
      </View>
      {children}
    </View>
  );
}
