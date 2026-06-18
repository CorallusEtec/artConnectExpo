import { useComentario } from "@/contexts/ComentarioContext";
import { useComentarioQuery } from "@/services/ComentarioService";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import { ComentarioHeader } from "./ComentarioHeader";

export function Comentario() {
  const { comentarioId } = useComentario();
  const { data } = useComentarioQuery(comentarioId);

  return (
    <>
      <ComentarioHeader />
      <Card.Content>
        <Text>{data?.data.mensagem}</Text>
      </Card.Content>
    </>
  );
}
