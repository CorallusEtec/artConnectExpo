import * as ImagePicker from "expo-image-picker";
import { Button, Modal, Portal } from "react-native-paper";

interface FotoModalProps {
  visible: boolean;
  imagem: ImagePicker.ImagePickerResult;
  onDismiss: () => void;
  onPegarImagem: () => void;
  onExcluir: () => void;
}

export function FotoModal({ visible, imagem, onDismiss, onPegarImagem, onExcluir }: FotoModalProps) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          backgroundColor: "white",
          marginHorizontal: 30,
          borderRadius: 20,
          paddingVertical: 10,
          width: 200,
          height: 125,
          alignSelf: "center",
        }}
      >
        <Button icon="image-edit-outline" mode="text" onPress={onPegarImagem}>
          Alterar foto
        </Button>

        {imagem.assets && (
          <Button icon="delete" textColor="red" mode="text" onPress={onExcluir}>
            Excluir foto
          </Button>
        )}

        <Button mode="text" onPress={onDismiss}>
          Fechar
        </Button>
      </Modal>
    </Portal>
  );
}