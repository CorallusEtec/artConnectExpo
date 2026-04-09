import { Image, Text, View } from "react-native";
import { style } from "./style";

export default function Home() {
  return (
    <View style={style.container}>
      <Text>Teste</Text>

       <Image source={{uri: "https://reactnative.dev/img/tiny_logo.png"}} />
    </View>
  );
}
