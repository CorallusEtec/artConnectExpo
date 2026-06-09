import { usePublicacaoData } from "@/contexts/PublicacaoContext";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { ICON_SIZE } from "../style";
import { PublicacaoReacaoToggle } from "./PublicacaoReacaoToggle";
import { style } from "./style";

type ReacaoStateType = { [chave: string]: object };
export function PublicacaoActions() {
  const { data } = usePublicacaoData();
  const reacaoIconStates: ReacaoStateType = {
    LIKE: { on: "thumb-up", off: "thumb-up-outline" },
    DISLIKE: { on: "thumb-down", off: "thumb-down-outline" },
  };

  return (
    <Card.Actions style={style.cardActionContainer}>
      {/* ACTIONS LEFT */}
      <View style={{ flexDirection: "row", gap: 5 }}>
        {/* RENDERIZA AS REAÇÕES */}
        {data.reacoes.map((r, index) => (
          <PublicacaoReacaoToggle
            key={index}
            index={index}
            tipoReacao={r.tipoReacao}
          />
        ))}
        {/* COMMENT */}
        <View style={style.actionContainer}>
          <IconButton
            icon={() => (
              <Feather name="message-circle" size={ICON_SIZE} color="black" />
            )}
          />
          <Text style={style.actionInsight}>0</Text>
        </View>
      </View>
      {/* ACTIONS RIGHT 
      <View>
        <IconButton icon="bookmark-outline" />
      </View>
      */}
    </Card.Actions>
  );
}
