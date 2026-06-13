import { usePublicacao } from "@/contexts/PublicacaoContext";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import { renderMidia } from "./Midias/RenderMidia";

export function PublicacaoContent() {
  const { publicacao } = usePublicacao().data;
  return (
    <>
      <Card.Content>
        {/* LEGENDA */}
        <Text>{publicacao.legenda}</Text>
      </Card.Content>
      {/*MIDIA*/}
      {publicacao.urlMidia &&
        renderMidia(publicacao.urlMidia!, publicacao.tipoMidia)}
    </>
  );
}
