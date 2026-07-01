import { DenunciaModal } from "@/components/DenunciaModal";
import { useAuth, usePublicacao } from "@/contexts";
import { usePublicacaoQuery } from "@/services/PublicacaoService";
import { useState } from "react";
import { Icon, IconButton, Menu, useTheme } from "react-native-paper";

type PublicacaoHeaderMenuProps = {
  visible: boolean;
  toggleVisible: () => void;
};

export function PublicacaoHeaderMenu({
  visible,
  toggleVisible,
}: PublicacaoHeaderMenuProps) {
  const theme = useTheme();
  const { getValidateId } = useAuth();
  const { idPublicacao } = usePublicacao();
  const { data } = usePublicacaoQuery(idPublicacao);
  const [modal, setModal] = useState(false);
  return (
    <>
      <Menu
        visible={visible}
        contentStyle={{ backgroundColor: theme.colors.background }}
        anchor={<IconButton icon="dots-vertical" onPress={toggleVisible} />}
        anchorPosition="bottom"
        onDismiss={toggleVisible}
      >
        {getValidateId() !== data?.data.publicacao.autor.id && (
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
        idRecurso={idPublicacao}
        tipoDenuncia="PUBLICACAO"
        toggleVIsible={() => setModal((prev) => !prev)}
        visible={modal}
      />
    </>
  );
}
