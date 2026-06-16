import { usePublicacao } from "@/contexts/PublicacaoContext";
import { usePublicacaoQuery } from "@/services/PublicacaoService";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import { RenderMidia } from "./Midias/RenderMidia";

export function PublicacaoContent() {
  const { idPublicacao } = usePublicacao();
  const { data } = usePublicacaoQuery(idPublicacao);

  return (
    <>
      <Card.Content>
        <Text>{data?.data.publicacao.legenda || ""}</Text>
      </Card.Content>

      {data?.data.publicacao.urlMidia && (
        <RenderMidia
          urlMidia={data.data.publicacao.urlMidia}
          tipoMidia={data?.data.publicacao.tipoMidia}
        />
      )}
    </>
  );
}
