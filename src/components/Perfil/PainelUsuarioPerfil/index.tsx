import { useAuth } from "@/contexts/AuthContext";
import { useUsuarioByIdQuery } from "@/services/UsuarioService";
import { View } from "react-native";
import { Avatar, Text, TouchableRipple } from "react-native-paper";
import { style } from "./style";

export function PainelUsuarioPerfil() {
  const { getValidateId } = useAuth();

  const { data } = useUsuarioByIdQuery(getValidateId());

  function guestFotoRender() {
    if (data?.data.nome) {
      return <Avatar.Text label={data?.data.nome.charAt(0)} size={92} />;
    } else {
      return (
        <Avatar.Image
          source={require("@/assets/template/avatar.png")}
          size={92}
        />
      );
    }
  }

  console.log(data?.data.publicacoes);
  return (
    <View style={style.fundo}>
      <View style={style.headerRow}>
        <View style={style.profile}>
          {data?.data.fotoPerfilUrl ? (
            <Avatar.Image size={92} source={{ uri: data.data.fotoPerfilUrl }} />
          ) : (
            guestFotoRender()
          )}
          <Text style={style.infoLabel}>{data?.data.nome}</Text>
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
