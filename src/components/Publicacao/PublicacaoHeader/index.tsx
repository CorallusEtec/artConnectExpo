import { AvatarRender } from "@/components/AvatarRender";
import { useAuth } from "@/contexts";
import { usePublicacao } from "@/contexts/PublicacaoContext";
import { usePublicacaoQuery } from "@/services/PublicacaoService";
import { AppUtils } from "@/utils/AppUtils";
import { navegarParaPerfil } from "@/utils/NavigationUtils";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Card, IconButton, Menu } from "react-native-paper";
import { style } from "./style";

/**
 *
 * @returns Header da publicação
 */
export function PublicacaoHeader() {
  const [menu, setMenu] = useState(false);
  const { idPublicacao } = usePublicacao();
  const { getValidateId } = useAuth();
  const { data, isLoading } = usePublicacaoQuery(idPublicacao);

  if (isLoading) return <></>;

  return (
    <Card.Content style={style.headerContainer}>
      <Pressable
        style={style.headerContent}
        onPress={() =>
          navegarParaPerfil(getValidateId(), data?.data.publicacao.autor.id)
        }
      >
        <AvatarRender
          size={35}
          nome={data?.data.publicacao.autor.nome}
          uri={data?.data.publicacao.autor.fotoPerfilUrl}
        />
        <View style={style.metadataPubli}>
          <Text style={style.autorLabel}>
            {data?.data.publicacao.autor.nome}
          </Text>
          <Text style={style.publishDateLabel}>
            {AppUtils.labelData(
              AppUtils.converterData(
                new Date(data!.data.publicacao.dataPublicacao),
              ),
            )}
          </Text>
        </View>
      </Pressable>

      <Menu
        visible={menu}
        anchor={
          <IconButton icon="dots-vertical" onPress={() => setMenu(true)} />
        }
        anchorPosition="bottom"
        onDismiss={() => setMenu(false)}
      >
        <Menu.Item
          title="Denunciar"
          leadingIcon={() => (
            <Feather name="alert-circle" size={24} color="black" />
          )}
        />
      </Menu>
    </Card.Content>
  );
}
