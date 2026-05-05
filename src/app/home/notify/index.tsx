import { gStyles } from "@/style/gStyle";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Notify() {
  return (
    <View style={style.container}>
      <View style={style.navbar}>
        <Image
          style={style.banner}
          source={require("@/assets/img/banner.png")}
        />
        <TouchableOpacity>
          <AntDesign name="message" color={gStyles.cinza[600]} size={22} />
        </TouchableOpacity>
      </View>

      <View style={style.userRow}>
        <Image
          style={style.pic}
          source={require("@/assets/template/avatar.png")}
        />
        <View>
          <Text style={style.userName}>Djavan</Text>
          <Text style={style.subtitle}>Curtiu sua postagem</Text>
          <FontAwesome name="heart" size={24} color={gStyles.vermelho[400]} />
        </View>
      </View>

      <View style={style.userRow}>
        <Image
          style={style.pic}
          source={require("@/assets/template/avatar.png")}
        />
        <View>
          <Text style={style.userName}>Marcos Zuckberg</Text>
          <Text style={style.subtitle}>Curtiu sua postagem</Text>
          <FontAwesome name="heart" size={24} color={gStyles.vermelho[400]} />
        </View>
  
      </View>

      <View style={style.userRow}>
        <Image
          style={style.pic}
          source={require("@/assets/template/avatar.png")}
        />
        <View>
          <Text style={style.userName}>Clodoaldo</Text>
          <Text style={style.subtitle}>Começou a te seguir</Text>
          <Ionicons name="person" size={24} color={gStyles.azul[400]} />
        </View>
      </View>

      <View style={style.userRow}>
        <Image
          style={style.pic}
          source={require("@/assets/template/avatar.png")}
        />
        <View>
          <Text style={style.userName}>aline </Text>
          <Text style={style.subtitle}>Curtiu sua postagem</Text>
          <FontAwesome name="heart" size={24} color={gStyles.vermelho[400]} />
        </View>
      </View>

      <View style={style.userRow}>
        <Image
          style={style.pic}
          source={require("@/assets/template/avatar.png")}
        />
        <View>
          <Text style={style.userName}>Adoilson Musk</Text>
          <Text style={style.subtitle}>Curtiu sua postagem</Text>
          <FontAwesome name="heart" size={24} color={gStyles.vermelho[400]} />
        </View>
  
      </View>

      <View style={style.userRow}>
        <Image
          style={style.pic}
          source={require("@/assets/template/avatar.png")}
        />
        <View>
          <Text style={style.userName}>neymar </Text>
          <Text style={style.subtitle}>Começou a te seguir</Text>
          <Ionicons name="person" size={24} color={gStyles.azul[400]} />
        </View>
      </View>
    </View>
  );
}
