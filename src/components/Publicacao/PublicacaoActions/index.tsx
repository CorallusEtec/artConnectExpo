import { usePublicacao } from "@/contexts/PublicacaoContext";
import { useState } from "react";
import { Text, View } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { ComentarioSection } from "../ComentarioSection";
import { PublicacaoReacaoToggle } from "./PublicacaoReacaoToggle";
import { style } from "./style";

type ReacaoStateType = { [chave: string]: object };
export function PublicacaoActions() {
  const { data } = usePublicacao();
  const [openComments, setOpenComments] = useState(false);

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
            icon="message-text-outline"
            onPress={() => setOpenComments(true)}
          />
          <Text style={style.actionInsight}>{0}</Text>
        </View>
      </View>

      <ComentarioSection setVisible={setOpenComments} visible={openComments} />

      {/* ACTIONS RIGHT 
      <View>
        <IconButton icon="bookmark-outline" />
      </View>
      */}
    </Card.Actions>
  );
}
