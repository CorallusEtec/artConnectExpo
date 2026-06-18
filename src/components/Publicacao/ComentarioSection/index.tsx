import { ComentarioProvider, usePublicacao } from "@/contexts";
import { useComentarioListQuery } from "@/services/ComentarioService";
import { FlatList, Modal } from "react-native";
import { Card, Divider, PaperProvider, useTheme } from "react-native-paper";
import { Comentario } from "./Comentario";
import { ComentarioSectionHeader } from "./ComentarioSectionHeader";
import { ComentarioSender } from "./ComentarioSender";
import { style } from "./style";

export function ComentarioSection() {
  // ID da publicação
  const { idPublicacao, comentarioSection } = usePublicacao();
  const theme = useTheme();

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
      <PaperProvider theme={theme}>
        <Card style={style.contentContainer} mode="elevated">
          <ComentarioSectionHeader />
          <ComentarioSender />
          <Divider />

          {isLoading ? (
            <></>
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
      </PaperProvider>
    </Modal>
  );
}
