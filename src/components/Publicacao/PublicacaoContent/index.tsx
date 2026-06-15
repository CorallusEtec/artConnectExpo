import { usePublicacao } from "@/contexts/PublicacaoContext";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import { RenderMidia } from "./Midias/RenderMidia";

export function PublicacaoContent() {
  const { publicacao } = usePublicacao().data;
  return (
    <>
      <Card.Content>
        <Text>{publicacao.legenda}</Text>
      </Card.Content>

      {publicacao.urlMidia && (
        <RenderMidia urlMidia={publicacao.urlMidia} tipoMidia={publicacao.tipoMidia} />
      )}
    </>
  );
}