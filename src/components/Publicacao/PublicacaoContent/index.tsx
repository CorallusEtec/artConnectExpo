import { usePublicacaoData } from "@/contexts/PublicacaoContext";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import { style } from "./style";

export function PublicacaoContent() {
  const { data } = usePublicacaoData();
  return (
    <>
      {/* CONTENT */}
      <Card.Content>
        <Text>{data.titulo}</Text>
      </Card.Content>
      {/* IMAGEM */}
      <Card.Cover
        style={style.img}
        source={{
          uri: "https://dummyimage.com/800x430/FFFFFF/lorem-ipsum.png&text=jsonplaceholder.org",
        }}
      />
    </>
  );
}
