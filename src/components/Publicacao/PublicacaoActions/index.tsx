import { usePublicacao } from "@/contexts/PublicacaoContext";
import { usePublicacaoQuery } from "@/services/PublicacaoService";
import { Text, View } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { ComentarioSection } from "../ComentarioSection";
import { PublicacaoReacaoToggle } from "./PublicacaoReacaoToggle";
import { style } from "./style";

export function PublicacaoActions() {
  const { idPublicacao, setComentarioSection } = usePublicacao();
  const { data } = usePublicacaoQuery(idPublicacao);

  return (
    <Card.Actions style={style.cardActionContainer}>
      {/* ACTIONS LEFT */}
      <View style={style.actionsLeftContainer}>
        <PublicacaoReacaoToggle
          tipoReacao="LIKE"
          insigth={data?.data.likes || 0}
        />
        <PublicacaoReacaoToggle
          tipoReacao="DISLIKE"
          insigth={data?.data.dislikes || 0}
        />
        {/* COMMENT */}
        <View style={style.actionContainer}>
          <IconButton
            icon="message-text-outline"
            onPress={() => setComentarioSection(true)}
          />
          <Text style={style.actionInsight}>{data?.data.totalComentarios}</Text>
        </View>
      </View>

      <ComentarioSection />

      {/* ACTIONS RIGHT 
      <View>
        <IconButton icon="bookmark-outline" />
      </View>
      */}
    </Card.Actions>
  );
}
