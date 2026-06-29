import { AvatarRender } from "@/components/AvatarRender";
import { useAuth, usePerfil } from "@/contexts";
import { GeneroArteResponse } from "@/models/response/GeneroArteResponse";
import { usePerfilPublicacaoQuery } from "@/services/PublicacaoService";
import { AppUtils } from "@/utils/AppUtils";
import { iconePorTipoContato, linkPorContato } from "@/utils/ContatoUtils";
import { Linking, Pressable, View } from "react-native";
import {
  ActivityIndicator,
  Chip,
  Icon,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { style } from "./style";

type AcaoBotao = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  buttonColor?: string;
};

type Props = {
  acaoBotao?: AcaoBotao;
};

export function PainelUsuarioPerfil({ acaoBotao }: Props) {
  const { dataPerfil } = usePerfil();
  const { getValidateId } = useAuth();
  const theme = useTheme();
  const { data: publicacoesData } = usePerfilPublicacaoQuery(
    dataPerfil?.id ?? 0,
  );
  const totalPublicacoes =
    publicacoesData?.totalElements ?? dataPerfil?.publicacoes?.length ?? 0;

  const contatos = dataPerfil?.contatos ?? [];
  const arte = dataPerfil?.arte;
  const generosArte: GeneroArteResponse[] = dataPerfil?.generosArte ?? [];

  async function handleAbrirContato(link: string | null) {
    if (!link) return;
    const suportado = await Linking.canOpenURL(link);
    if (suportado) Linking.openURL(link);
  }

  return (
    <View style={[style.fundo, { backgroundColor: theme.colors.primary }]}>
      <View style={style.headerRow}>
        <View style={style.avatarWrapper}>
          <View style={style.avatarBorder}>
            <AvatarRender
              nome={dataPerfil?.nome}
              size={80}
              uri={dataPerfil?.fotoPerfilUrl}
            />
          </View>
          <Text style={style.nomeLabel} numberOfLines={2}>
            {dataPerfil?.nome}
          </Text>
          {dataPerfil && (
            <Text style={style.tipoContaLabel}>
              {AppUtils.capitalize(dataPerfil.tipoConta)}
            </Text>
          )}
        </View>

        <View style={style.statsRow}>
          <View
            style={[
              style.statCard,
              { backgroundColor: "rgba(255,255,255,0.15)" },
            ]}
          >
            <Icon source="text-box-outline" size={24} color="white" />
            <Text style={style.statLabel}>Posts</Text>
            <Text style={style.statValue}>{totalPublicacoes}</Text>
          </View>

          <TouchableRipple
            style={[
              style.statCard,
              { backgroundColor: "rgba(255,255,255,0.15)" },
            ]}
            onPress={() => {}}
            rippleColor="rgba(255,255,255,0.2)"
            borderless
          >
            <View style={style.statCardInner}>
              <Icon source="account-group-outline" size={24} color="white" />
              <Text style={style.statLabel}>Seguidores</Text>
              <Text style={style.statValue}>
                {dataPerfil?.totalSeguindo ?? 0}
              </Text>
            </View>
          </TouchableRipple>

          <TouchableRipple
            style={[
              style.statCard,
              { backgroundColor: "rgba(255,255,255,0.15)" },
            ]}
            onPress={() => {}}
            rippleColor="rgba(255,255,255,0.2)"
            borderless
          >
            <View style={style.statCardInner}>
              <Icon source="account-outline" size={24} color="white" />
              <Text style={style.statLabel}>Seguindo</Text>
              <Text style={style.statValue}>
                {dataPerfil?.totalSeguidores ?? 0}
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
                style={style.contatoRow}
                disabled={!link}
                onPress={() => handleAbrirContato(link)}
              >
                <Icon
                  source={iconePorTipoContato(
                    contato.tipoContato?.idTipoContato,
                  )}
                  size={18}
                  color="white"
                />
                <Text style={style.contatoText}>{contato.valorContato}</Text>
              </Pressable>
            );
          })}
        </View>
      )}

      <View style={style.actionContainer}>
        {acaoBotao && (
          <Pressable
            style={[
              style.actionButton,
              acaoBotao.buttonColor
                ? { backgroundColor: acaoBotao.buttonColor }
                : {},
            ]}
            onPress={acaoBotao.onPress}
            disabled={acaoBotao.loading}
          >
            {acaoBotao.loading ? (
              <ActivityIndicator size={18} color={theme.colors.primary} />
            ) : (
              <Text
                style={[
                  style.actionButtonText,
                  {
                    color: acaoBotao.buttonColor
                      ? "white"
                      : theme.colors.primary,
                  },
                ]}
              >
                {acaoBotao.label}
              </Text>
            )}
          </Pressable>
        )}
        {dataPerfil?.id != getValidateId() && (
          <Pressable
            style={[
              style.reportButton,
              { backgroundColor: theme.colors.backdrop },
            ]}
          >
            <Icon
              source="flag-outline"
              size={22}
              color={theme.colors.onPrimary}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}
