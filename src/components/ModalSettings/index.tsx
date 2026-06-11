import { useAuth } from "@/contexts/AuthContext";
import { View } from "react-native";
import {
  IconButton,
  Menu,
  Modal,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import { style } from "./style";

type ModalSettings = {
  modal: boolean;
  setModal: (value: boolean) => void;
};

export function ModalSettings({ modal, setModal }: ModalSettings) {
  const { signOut } = useAuth();

  const theme = useTheme();
  return (
    <Portal>
      <Modal
        dismissable={false}
        style={{ paddingHorizontal: 20 }}
        visible={modal}
        dismissableBackButton={false}
        contentContainerStyle={style.modal}
      >
        <View style={style.headerContainer}>
          <Text variant="titleMedium">Configurações</Text>
          <IconButton icon="close" onPress={() => setModal(false)} />
        </View>
        <Menu.Item
          leadingIcon="account-cog"
          titleStyle={{ color: theme.colors.primary }}
          style={{ borderColor: theme.colors.primary }}
          title="Preferências do usuários"
          onPress={() => signOut()}
        />
        <Menu.Item
          leadingIcon="message-question-outline"
          titleStyle={{ color: theme.colors.primary }}
          style={{ borderColor: theme.colors.primary }}
          title="FAQ - Perguntas frenquêntes"
          onPress={() => signOut()}
        />
        <Menu.Item
          leadingIcon="logout"
          titleStyle={{ color: theme.colors.error }}
          title="Sair"
          onPress={() => signOut()}
        />
      </Modal>
    </Portal>
  );
}
