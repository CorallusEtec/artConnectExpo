import { useComentarioList } from "@/contexts/ComentarioContext";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import { ComentarioHeader } from "./ComentarioHeader";

export function Comentario() {
  const { data } = useComentarioList();

  return (
    <>
      <ComentarioHeader />
      <Card.Content>
        <Text>{data.mensagem}</Text>
      </Card.Content>
    </>
  );
}
