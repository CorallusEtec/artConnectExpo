import { AvatarRender } from "@/components/AvatarRender";
import { useAuth } from "@/contexts/AuthContext";
import { useUsuarioByIdQuery } from "@/services/UsuarioService";
import { AppUtils } from "@/utils/AppUtils";
import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { style } from "./style";

export function PainelUsuarioPerfil() {
  const { getValidateId } = useAuth();

  const { data } = useUsuarioByIdQuery(getValidateId());

  return (
    <View style={style.fundo}>
      <View style={style.headerRow}>
        <View style={style.profile}>
          <AvatarRender
            nome={data?.data.nome}
            size={92}
            uri={data?.data.fotoPerfilUrl}
          />
          <Text style={style.infoLabel}>{data?.data.nome}</Text>
          {data?.data && (
            <Text style={style.infoLabel}>
              {AppUtils.capitalize(data.data.tipoConta)}
            </Text>
          )}
        </View>
        <View style={style.infosProfile}>
          <View style={style.infoDuo}>
            <Text variant="bodyLarge" style={style.infoLabel}>
              Posts
            </Text>
            <Text variant="titleMedium" style={style.infoValue}>
              {(data?.data.publicacoes && data.data.publicacoes.length) || 0}
            </Text>
          </View>

          <TouchableRipple
            onPress={() => {}}
            rippleColor="rgba(255, 255, 255, .2)"
          >
            <View style={style.infoDuo}>
              <Text variant="bodyLarge" style={style.infoLabel}>
                Seguidores
              </Text>
              <Text variant="titleMedium" style={style.infoValue}>
                0
              </Text>
            </View>
          </TouchableRipple>

          <TouchableRipple
            onPress={() => {}}
            rippleColor="rgba(255, 255, 255, .2)"
          >
            <View style={style.infoDuo}>
              <Text variant="bodyLarge" style={style.infoLabel}>
                Seguindo
              </Text>
              <Text variant="titleMedium" style={style.infoValue}>
                0
              </Text>
            </View>
          </TouchableRipple>
        </View>
      </View>

      <View style={style.bioContainer}>
        <Text variant="bodyMedium" style={style.bioText}>
          {data?.data.textoBio || "Sem biografia"}
        </Text>
      </View>
    </View>
  );
}
