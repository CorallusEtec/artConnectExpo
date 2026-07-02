import { AvatarRender } from "@/components/AvatarRender";
import { useAuth, usePublicacao } from "@/contexts";
import { useComentario } from "@/contexts/ComentarioContext";
import { useComentarioQuery } from "@/services/ComentarioService";
import { AppUtils } from "@/utils/AppUtils";
import { navegarParaPerfil } from "@/utils/NavigationUtils";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { ComentarioHeaderMenu } from "./ComentarioHeaderMenu";
import { ComentrarioToggleAction } from "./ComentarioToggleAction";
import { style } from "./style";

export function ComentarioHeader() {
  const [menu, setMenu] = useState(false);
  const { comentarioId } = useComentario();
  const { setComentarioSection } = usePublicacao();
  const { getValidateId } = useAuth();
  const { data } = useComentarioQuery(comentarioId);

  return (
    <Card.Content style={style.headerContainer}>
      <Pressable
        style={style.headerContent}
        onPress={() => {
          setComentarioSection(false);
          navegarParaPerfil(getValidateId(), data?.data.usuario.id);
        }}
      >
        <AvatarRender
          nome={data?.data.usuario.nome}
          uri={data?.data.usuario.fotoPerfilUrl}
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

        <ComentarioHeaderMenu
          toggleVisible={() => setMenu((prev) => !prev)}
          visible={menu}
        />
      </View>
    </Card.Content>
  );
}
