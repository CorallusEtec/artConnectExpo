import { AvatarRender } from "@/components/AvatarRender";
import { usePerfil } from "@/contexts";
import { AppUtils } from "@/utils/AppUtils";
import { iconePorTipoContato } from "@/utils/ContatoUtils";
import { View } from "react-native";
import { Icon, Text, TouchableRipple } from "react-native-paper";
import { style } from "./style";

export function PainelUsuarioPerfil() {
  const { dataPerfil } = usePerfil();

  const contatos = dataPerfil?.contatos ?? [];

  return (
    <View style={style.fundo}>
      <View style={style.headerRow}>
        <View style={style.profile}>
          <AvatarRender
            nome={dataPerfil?.nome}
            size={92}
            uri={dataPerfil?.fotoPerfilUrl}
          />
          <Text style={style.infoLabel}>{dataPerfil?.nome}</Text>
          {dataPerfil && (
            <Text style={style.infoLabel}>
              {AppUtils.capitalize(dataPerfil.tipoConta)}
            </Text>
          )}
        </View>
        <View style={style.infosProfile}>
          <View style={style.infoDuo}>
            <Text variant="bodyLarge" style={style.infoLabel}>
              Posts
            </Text>
            <Text variant="titleMedium" style={style.infoValue}>
              {(dataPerfil?.publicacoes && dataPerfil.publicacoes.length) || 0}
            </Text>
          </View>

          <TouchableRipple onPress={() => {}} rippleColor="rgba(255, 255, 255, .2)">
            <View style={style.infoDuo}>
              <Text variant="bodyLarge" style={style.infoLabel}>
                Seguidores
              </Text>
              <Text variant="titleMedium" style={style.infoValue}>
                0
              </Text>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={() => {}} rippleColor="rgba(255, 255, 255, .2)">
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

      {contatos.length > 0 && (
        <View style={style.contatosContainer}>
          {contatos.map((contato, index) => (
            <View key={contato.idContato ?? index} style={style.contatoRow}>
              <Icon
                source={iconePorTipoContato(contato.tipoContato?.idTipoContato)}
                size={18}
                color="white"
              />
              <Text style={style.contatoText}>{contato.valorContato}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}