import { useAuth } from "@/contexts/AuthContext";
import { ComentarioProvider } from "@/contexts/ComentarioContext";
import { usePublicacaoData } from "@/contexts/PublicacaoContext";
import { useComentarioQuery } from "@/services/ComentarioService";
import { useState } from "react";
import { ActivityIndicator, FlatList, Modal, View } from "react-native";
import { Card, Divider, IconButton, Text } from "react-native-paper";
import { Comentario } from "../Comentario";
import { ComentarioSender } from "../ComentarioSender";
import { style } from "./style";

type ComentarioSectionProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export function ComentarioSection({
  visible,
  setVisible,
}: ComentarioSectionProps) {
  // ID da publicação
  const { id } = usePublicacaoData().data.publicacao;
  const auth = useAuth();
  let tokenValidado = "";
  if (auth.token != null) {
    tokenValidado = auth.token.token;
  }

  const { data, isLoading } = useComentarioQuery(id, tokenValidado);

  const [comentarios, setComentarios] = useState(data?.data.content);
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      style={style.container}
    >
      <Card style={style.contentContainer} mode="elevated">
        <View style={style.headerContainer}>
          <Text variant="headlineSmall" style={style.headerTitle}>
            Comentários
          </Text>
          <IconButton icon="close" onPress={() => setVisible(false)} />
        </View>
        <ComentarioSender />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Divider />
            <FlatList
              data={comentarios}
              keyExtractor={(id) => id.id.toString()}
              renderItem={({ item }) => (
                <ComentarioProvider initialData={item}>
                  <Comentario />
                </ComentarioProvider>
              )}
            />
          </>
        )}
      </Card>
    </Modal>
  );
}
