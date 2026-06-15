import { usePublicacao } from "@/contexts/PublicacaoContext";
import { Text, View } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { ComentarioSection } from "../ComentarioSection";
import { PublicacaoReacaoToggle } from "./PublicacaoReacaoToggle";
import { style } from "./style";

type ReacaoStateType = { [chave: string]: object };
export function PublicacaoActions() {
  const { data, setComentarioSection, comentarioSection } = usePublicacao();

  return (
    <Card.Actions style={style.cardActionContainer}>
      {/* ACTIONS LEFT */}
      <View style={style.actionsLeftContainer}>
        <PublicacaoReacaoToggle tipoReacao="LIKE" />
        <PublicacaoReacaoToggle tipoReacao="DISLIKE" />
        {/* COMMENT */}
        <View style={style.actionContainer}>
          <IconButton
            icon="message-text-outline"
            onPress={() => setComentarioSection(true)}
          />
          <Text style={style.actionInsight}>{data.totalComentarios}</Text>
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
