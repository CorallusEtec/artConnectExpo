import { useAuth, useComentario } from "@/contexts";
import { useComentarioQuery } from "@/services/ComentarioService";
import { Icon, IconButton, Menu } from "react-native-paper";

type ComentarioHeaderMenu = {
  visible: boolean;
  toggleVisible: () => void;
};

export function ComentarioHeaderMenu({
  toggleVisible,
  visible,
}: ComentarioHeaderMenu) {
  const { getValidateId } = useAuth();
  const { comentarioId } = useComentario();
  const { data } = useComentarioQuery(comentarioId);

  return (
    <Menu
      visible={visible}
      anchor={<IconButton icon="dots-vertical" onPress={toggleVisible} />}
      anchorPosition="bottom"
      onDismiss={toggleVisible}
    >
      <Menu.Item title="Teste" />
      {getValidateId() !== data?.data.usuario.id && (
        <Menu.Item
          title="Denunciar"
          leadingIcon={() => (
            <Icon size={22} color="black" source="flag-outline" />
          )}
        />
      )}
    </Menu>
  );
}
