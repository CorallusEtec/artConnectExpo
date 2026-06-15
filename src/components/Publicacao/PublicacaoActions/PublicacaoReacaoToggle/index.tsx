import { useAuth } from "@/contexts/AuthContext";
import { usePublicacao } from "@/contexts/PublicacaoContext";
import { TipoReacao } from "@/models/enumeration/enumeration";
import { usePublicacaoQuery } from "@/services/PublicacaoService";
import { useReagir } from "@/services/ReacaoService";
import { Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { ICON_SIZE } from "../../style";
import { style } from "../style";

/**
 * Props do componente
 */
export type PublicacaoReacaoToggleProps = {
  /** Carrega os icones com os estados reagido e não reagido da reação */
  tipoReacao: TipoReacao;
  /** Traz o total da reação */
  insigth: number;
};

const reacaoStateIcons = {
  LIKE: { on: "thumb-up", off: "thumb-up-outline" },
  DISLIKE: { on: "thumb-down", off: "thumb-down-outline" },
};

/**
 * @param param0 props do componente em {@link PublicacaoReacaoToggleProps}
 * @returns Componente que ativa ou desativa uma reação
 */
export function PublicacaoReacaoToggle({
  tipoReacao,
  insigth,
}: PublicacaoReacaoToggleProps) {
  const { getValidateToken } = useAuth();
  const { idPublicacao } = usePublicacao(); // Contexto
  const { data } = usePublicacaoQuery(idPublicacao);
  const { mutate } = useReagir(); // Mutate para perssistir reação

  /** Ao reagir altera a reação feita pelo usuário
   */
  function toggleReagir() {
    // Código de reagir no banco de dados
    mutate({
      idRecurso: idPublicacao,
      nomeTipoReacao: tipoReacao,
      tipoRecurso: "PUBLICACAO",
      token: getValidateToken(),
    });
  }

  return (
    <View style={style.actionContainer}>
      <IconButton
        icon={
          data?.data.reacaoUsuario == tipoReacao
            ? reacaoStateIcons[tipoReacao].on
            : reacaoStateIcons[tipoReacao].off
        }
        size={ICON_SIZE}
        onPress={toggleReagir}
      />
      <Text style={style.actionInsight}>{insigth}</Text>
    </View>
  );
}
