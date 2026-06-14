import { usePerfil } from "@/contexts/PerfilContext";
import { View } from "react-native";
import { Avatar, Text, TouchableRipple } from "react-native-paper";
import { style } from "./style";

export function PainelUsuarioPerfil() {
  const { dataPerfil } = usePerfil();

  console.log(dataPerfil);

  function guestFotoRender() {
    if (dataPerfil?.nome) {
      return <Avatar.Text label={dataPerfil.nome.charAt(0)} size={92} />;
    } else {
      return (
        <Avatar.Image
          source={require("@/assets/template/avatar.png")}
          size={92}
        />
      );
    }
  }
  return (
    <View style={style.fundo}>
      <View style={style.headerRow}>
        <View style={style.profile}>
          {dataPerfil?.fotoPerfilUrl ? (
            <Avatar.Image
              size={92}
              source={{ uri: dataPerfil.fotoPerfilUrl }}
            />
          ) : (
            guestFotoRender()
          )}
          <Text style={style.infoLabel}>{dataPerfil?.nome}</Text>
        </View>
        <View style={style.infosProfile}>
          <View style={style.infoDuo}>
            <Text variant="bodyLarge" style={style.infoLabel}>
              Posts
            </Text>
            <Text variant="titleMedium" style={style.infoValue}>
              {0}
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
          {dataPerfil?.textoBio || "Sem biografia"}
        </Text>
      </View>
    </View>
  );
}
