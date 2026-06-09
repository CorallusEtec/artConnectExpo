import { usePublicacaoData } from "@/contexts/PublicacaoContext";
import { Text } from "react-native";
import { Card, Divider } from "react-native-paper";
import { style } from "./style";

export function PublicacaoContent() {
  const publicacao = usePublicacaoData().data.publicacao;
  return (
    <>
      <Card.Content>
        {/* LEGENDA */}
        <Text>{publicacao.legenda}</Text>
      </Card.Content>
      {/* IMAGEM SE TIVER */}
      {publicacao.urlMidia && (
        <>
          <Card.Cover
            style={style.img}
            source={{
              uri: "https://dummyimage.com/800x430/FFFFFF/lorem-ipsum.png&text=jsonplaceholder.org",
            }}
          />
          <Divider />
        </>
      )}
    </>
  );
}
