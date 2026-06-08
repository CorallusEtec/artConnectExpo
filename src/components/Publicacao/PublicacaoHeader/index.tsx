import { usePublicacaoData } from "@/contexts/PublicacaoContext";
import { AppUtils } from "@/services/AppUtils";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import { Avatar, Card, IconButton, Menu } from "react-native-paper";
import { style } from "./style";

/**
 *
 * @returns Header da publicação
 */
export function PublicacaoHeader() {
  const [menu, setMenu] = useState(false);
  const publicacao = usePublicacaoData().data.publicacao;

  return (
    <Card.Content style={style.headerContainer}>
      <View style={style.headerContent}>
        {/* ENQUANTO NÃO CARREGA A FOTO DE PERFIL OU SE NÃO TIVER */}
        <Avatar.Text label={publicacao.autor.nome.charAt(0)} size={32} />
        <View style={style.metadataPubli}>
          <Text style={style.autorLabel}>{publicacao.autor.nome}</Text>
          <Text style={style.publishDateLabel}>
            {AppUtils.labelData(
              AppUtils.converterData(new Date(publicacao.dataPublicacao)),
            )}
          </Text>
        </View>
      </View>
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
