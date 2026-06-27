import { useAuth } from "@/contexts";
import { useComentario } from "@/contexts/ComentarioContext";
import { useComentarioQuery } from "@/services/ComentarioService";
import { AppUtils } from "@/utils/AppUtils";
import { navegarParaPerfil } from "@/utils/NavigationUtils";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Avatar, Card, IconButton, Menu } from "react-native-paper";
import { ComentrarioToggleAction } from "./ComentarioToggleAction";
import { style } from "./style";

export function ComentarioHeader() {
  const [menu, setMenu] = useState(false);
  const { comentarioId } = useComentario();
  const { getValidateId } = useAuth();
  const { data } = useComentarioQuery(comentarioId);

  return (
    <Card.Content style={style.headerContainer}>
      <Pressable
        style={style.headerContent}
        onPress={() =>
          navegarParaPerfil(getValidateId(), data?.data.usuario.id)
        }
      >
        {/* ENQUANTO NÃO CARREGA A FOTO DE PERFIL OU SE NÃO TIVER */}
        <Avatar.Text
          label={data?.data.usuario.nome.charAt(0) || ""}
          size={32}
        />
        <View style={style.metadataPubli}>
          <Text style={style.autorLabel}>{data?.data.usuario.nome}</Text>
          <Text style={style.publishDateLabel}>
            {data?.data.dataComentario &&
              AppUtils.labelData(
                AppUtils.converterData(new Date(data.data.dataComentario)),
              )}
          </Text>
        </View>
      </Pressable>
      <View style={style.actionContainer}>
        <ComentrarioToggleAction />

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
      </View>
    </Card.Content>
  );
}
