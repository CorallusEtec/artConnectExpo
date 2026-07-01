import { DenunciaModal } from "@/components/DenunciaModal";
import { useAuth, useComentario } from "@/contexts";
import { useComentarioQuery } from "@/services/ComentarioService";
import { useState } from "react";
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
  const [modal, setModal] = useState(false);

  return (
    <>
      <Menu
        visible={visible}
        anchor={<IconButton icon="dots-vertical" onPress={toggleVisible} />}
        anchorPosition="bottom"
        onDismiss={toggleVisible}
      >
        {getValidateId() !== data?.data.usuario.id && (
          <Menu.Item
            title="Denunciar"
            onPress={() => setModal(true)}
            leadingIcon={() => (
              <Icon size={22} color="black" source="flag-outline" />
            )}
          />
        )}
      </Menu>
      <DenunciaModal
        idRecurso={comentarioId}
        tipoDenuncia="COMENTARIO"
        toggleVIsible={() => setModal((prev) => !prev)}
        visible={modal}
      />
    </>
  );
}
