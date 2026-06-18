import { router } from "expo-router";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export function DialogToLogin({ visible }: { visible: boolean }) {
  return (
    <Portal>
      <Dialog visible={visible}>
        <Dialog.Title>Cadastro</Dialog.Title>
        <Dialog.Content>
          <Text>
            Conta criada com sucesso! Agora você pode logar e entrar no Art
            Connect
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => router.dismissTo("/login")}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
