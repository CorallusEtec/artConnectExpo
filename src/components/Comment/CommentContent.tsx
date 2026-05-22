import { Text, View } from "react-native";
import { useCommentContext } from "./CommentContext";
import { style } from "./style";
import { Post } from "../Post";
import { Reacao } from "../Reacao";
import { gStyles } from "@/style/gStyle";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export type CommentContentProps = {};

export function CommentContent({ ...props }: CommentContentProps) {
  const { mensagem } = useCommentContext();
  return (
    <View style={style.contentContainer}>
      <View style={style.messageContainer}>
        <Text>{mensagem}</Text>
    </View>
      {/* ACTIONS DO COMENTARIO */}
      <View style={style.contentActionsContainer}>
        <Reacao insight={0}>
            <MaterialCommunityIcons
                name="thumb-up-outline"
                size={18}
                color={gStyles.cinza[600]}
            />
        </Reacao>
        <Reacao insight={0}>
            <MaterialCommunityIcons
                name="thumb-down-outline"
                size={18}
                color={gStyles.cinza[600]}
            />
        </Reacao>
      </View>
    </View>
  );
}
