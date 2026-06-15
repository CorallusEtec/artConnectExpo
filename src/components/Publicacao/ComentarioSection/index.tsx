import { ComentarioProvider } from "@/contexts/ComentarioContext";
import { usePublicacao } from "@/contexts/PublicacaoContext";
import { useComentarioListQuery } from "@/services/ComentarioService";
import { ActivityIndicator, FlatList, Modal } from "react-native";
import { Card, Divider } from "react-native-paper";
import { Comentario } from "../Comentario";
import { ComentarioSender } from "../ComentarioSender";
import { ComentarioSectionHeader } from "./ComentarioSectionHeader";
import { style } from "./style";

export function ComentarioSection() {
  // ID da publicação
  const { idPublicacao, comentarioSection } = usePublicacao();

  const { data: comentarioData, isLoading } = useComentarioListQuery(
    idPublicacao,
    comentarioSection,
  );

  return (
    <Modal
      transparent
      animationType="slide"
      visible={comentarioSection}
      style={style.container}
    >
      <Card style={style.contentContainer} mode="elevated">
        <ComentarioSectionHeader />
        <ComentarioSender />
        <Divider />

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={comentarioData?.data.content}
            keyExtractor={(id) => id.id.toString()}
            renderItem={({ item }) => (
              <ComentarioProvider comentarioIdInitial={item.id}>
                <Comentario />
              </ComentarioProvider>
            )}
          />
        )}
      </Card>
    </Modal>
  );
}
