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
import { router } from "expo-router";

export function ModalSettings({
  modalConfig,
  setModalConfig,
}: {
  modalConfig: boolean;
  setModalConfig: (valor: boolean) => void;
}) {
  const { signOut } = useAuth();

  function handleFaq() {
    setModalConfig(false);
    router.navigate("/(home)/faq");
  }

  const theme = useTheme();
  return (
    <Portal>
      <Modal
        dismissable={false}
        style={{ paddingHorizontal: 20 }}
        visible={modalConfig}
        dismissableBackButton={false}
        contentContainerStyle={style.modal}
      >
        <View style={style.headerContainer}>
          <Text variant="titleMedium">Configurações</Text>
          <IconButton icon="close" onPress={() => setModalConfig(false)} />
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
          onPress={handleFaq}
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
