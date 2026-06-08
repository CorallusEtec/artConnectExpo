import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { ICON_SIZE } from "../style";
import { PublicacaoReacaoToggle } from "./PublicacaoReacaoToggle";
import { style } from "./style";

export function PublicacaoActions() {
  return (
    <Card.Actions style={style.cardActionContainer}>
      {/* ACTIONS LEFT */}
      <View style={{ flexDirection: "row", gap: 5 }}>
        {/* LIKE */}
        <PublicacaoReacaoToggle
          tipoReacao="LIKE"
          reacaoIconStates={{ on: "thumb-up", off: "thumb-up-outline" }}
        />
        {/* DESLIKE */}
        <PublicacaoReacaoToggle
          tipoReacao="DESLIKE"
          reacaoIconStates={{ on: "thumb-down", off: "thumb-down-outline" }}
        />
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
