import { AvatarRender } from "@/components/AvatarRender";
import { usePerfil } from "@/contexts";
import { AppUtils } from "@/utils/AppUtils";
import { iconePorTipoContato, linkPorContato } from "@/utils/ContatoUtils";
import { Linking, Pressable, View } from "react-native";
import { Icon, Text, TouchableRipple, Chip } from "react-native-paper";
import { style } from "./style";
import { GeneroArteResponse } from "@/models/response/GeneroArteResponse";

export function PainelUsuarioPerfil() {
  const { dataPerfil } = usePerfil();

  const contatos = dataPerfil?.contatos ?? [];
  const arte = dataPerfil?.arte;
  const generosArte: GeneroArteResponse[] = dataPerfil?.generosArte ?? [];

  async function handleAbrirContato(link: string | null) {
    if (!link) return;
    const suportado = await Linking.canOpenURL(link);
    if (suportado) Linking.openURL(link);
  }

  return (
    <View style={style.fundo}>
      <View style={style.headerRow}>
        <View style={style.profile}>
          <AvatarRender
            nome={dataPerfil?.nome}
            size={92}
            uri={dataPerfil?.fotoPerfilUrl}
          />
          <Text style={style.nomeLabel}>{dataPerfil?.nome}</Text>
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

          <TouchableRipple
            style={style.infoDuoTouchable}
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
            style={style.infoDuoTouchable}
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

      {(arte || generosArte.length > 0) && (
        <View style={style.artInfoContainer}>
          {arte && (
            <Chip style={style.artChip} textStyle={style.artChipText} compact>
              {arte.nomeArte}
            </Chip>
          )}
          {generosArte.map((genero, index: number) => (
            <Chip
              key={genero.id ?? index}
              style={style.artChip}
              textStyle={style.artChipText}
              compact
            >
              {genero.nomeGeneroArte}
            </Chip>
          ))}
        </View>
      )}

      <View style={style.bioContainer}>
        <Text variant="bodyMedium" style={style.bioText}>
          {dataPerfil?.textoBio || "Sem biografia"}
        </Text>
      </View>

      {contatos.length > 0 && (
        <View style={style.contatosContainer}>
          {contatos.map((contato, index) => {
            const link = linkPorContato(contato);

            return (
              <Pressable
                key={contato.idContato ?? index}
                style={[style.contatoRow, !link && style.contatoRowDisabled]}
                disabled={!link}
                onPress={() => handleAbrirContato(link)}
              >
                <Icon
                  source={iconePorTipoContato(contato.tipoContato?.idTipoContato)}
                  size={18}
                  color="white"
                />
                <Text style={style.contatoText}>{contato.valorContato}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}