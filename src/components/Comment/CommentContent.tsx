import { useAuthStore } from "@/store";
import { gStyles } from "@/style/gStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Reacao } from "../Reacao";
import { useCommentContext } from "./CommentContext";
import { style } from "./style";

export type CommentContentProps = {};

export function CommentContent({ onLike, onDislike }: { onLike?: () => void, onDislike?: () => void }) {
  const { mensagem, reacoes } = useCommentContext();
  const usuario = useAuthStore((s) => s.usuario);

  const jaLiked = reacoes?.some(
    r => r.usuario?.id === usuario?.id && r.tipoReacao?.nomeTipo === "LIKE"
  );

  const jaDisliked = reacoes?.some(
    r => r.usuario?.id === usuario?.id && r.tipoReacao?.nomeTipo === "DISLIKE"
  );

  const totalLikes = reacoes?.filter(r => r.tipoReacao?.nomeTipo === "LIKE").length ?? 0;
  const totalDislikes = reacoes?.filter(r => r.tipoReacao?.nomeTipo === "DISLIKE").length ?? 0;
  return (
    <View style={style.contentContainer}>
      <View style={style.messageContainer}>
        <Text>{mensagem}</Text>
    </View>
      {/* ACTIONS DO COMENTARIO */}
      <View style={style.contentActionsContainer}>
        <Reacao insight={totalLikes} onPress={onLike}>
          <MaterialCommunityIcons
            name={jaLiked ? "thumb-up" : "thumb-up-outline"}
            size={18}
            color={jaLiked ? gStyles.azul[500] : gStyles.cinza[600]}
          />
        </Reacao>
        <Reacao insight={totalDislikes} onPress={onDislike}>
          <MaterialCommunityIcons
            name={jaDisliked ? "thumb-down" : "thumb-down-outline"}
            size={18}
            color={jaDisliked ? gStyles.vermelho[400] : gStyles.cinza[600]}
          />
        </Reacao>
      </View>
    </View>
  );
}
