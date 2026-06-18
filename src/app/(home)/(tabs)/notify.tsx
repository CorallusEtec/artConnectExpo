import { gStyles } from "@/style/gStyle";
import { style } from "@/style/pages/notify";
import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, View } from "react-native";

export default function Notify() {
  return (
    <View style={style.container}>
      <Text style={style.notifs}>Você tem 2 notificações</Text>
      <View style={style.userRow}>
        <Image
          style={style.pic}
          source={require("@/assets/template/avatar.png")}
        />
        <View>
          <Text style={style.subtitle}>
            <Text style={style.userName}>Djavan</Text> Curtiu sua postagem{" "}
            <FontAwesome name="heart" size={24} color={gStyles.vermelho[400]} />
          </Text>
        </View>
      </View>

      <View style={style.userRow}>
        <Image
          style={style.pic}
          source={require("@/assets/template/avatar.png")}
        />
        <View>
          <Text style={style.subtitle}>
            <Text style={style.userName}>Clodoaldo</Text> Começou a te seguir{" "}
            <Ionicons name="person" size={24} color={gStyles.azul[400]} />
          </Text>
        </View>
      </View>
    </View>
  );
}
