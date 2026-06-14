import { useAuth } from "@/contexts/AuthContext";
import { ComentarioProvider } from "@/contexts/ComentarioContext";
import { usePublicacao } from "@/contexts/PublicacaoContext";
import { useComentarioQuery } from "@/services/ComentarioService";
import { ActivityIndicator, FlatList, Modal } from "react-native";
import { Card, Divider } from "react-native-paper";
import { Comentario } from "../Comentario";
import { ComentarioSender } from "../ComentarioSender";
import { ComentarioSectionHeader } from "./ComentarioSectionHeader";
import { style } from "./style";

export function ComentarioSection() {
  // ID da publicação
  const { data, comentarioSection } = usePublicacao();
  const { getValidateToken } = useAuth();

  const { data: comentarioData, isLoading } = useComentarioQuery(
    data.publicacao.id,
    getValidateToken(),
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
              <ComentarioProvider initialData={item}>
                <Comentario />
              </ComentarioProvider>
            )}
          />
        )}
      </Card>
    </Modal>
  );
}
