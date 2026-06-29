import { useAuth, usePublicacao } from "@/contexts";
import { usePublicacaoQuery } from "@/services/PublicacaoService";
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
  const { data, isLoading } = usePublicacaoQuery(idPublicacao);

  return (
    <Menu
      visible={visible}
      contentStyle={{ backgroundColor: theme.colors.background }}
      anchor={<IconButton icon="dots-vertical" onPress={toggleVisible} />}
      anchorPosition="bottom"
      onDismiss={toggleVisible}
    >
      <Menu.Item title="TReste" />
      {getValidateId() !== data?.data.publicacao.autor.id && (
        <Menu.Item
          title="Denunciar"
          onPress={() => console.log("Teste")}
          leadingIcon={() => (
            <Icon size={22} color="black" source="flag-outline" />
          )}
        />
      )}
    </Menu>
  );
}
