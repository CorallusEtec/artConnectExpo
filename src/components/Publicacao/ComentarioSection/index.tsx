import { usePublicacaoData } from "@/contexts/PublicacaoContext";
import { View } from "react-native";
import { IconButton, Modal, Portal, Text } from "react-native-paper";
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

  return (
    <Portal>
      <Modal
        visible={visible}
        style={style.container}
        contentContainerStyle={style.contentContainer}
      >
        <View style={style.headerContainer}>
          <Text variant="headlineSmall">Comentários</Text>
          <IconButton icon="close" onPress={() => setVisible(false)} />
        </View>
      </Modal>
    </Portal>
  );
}
