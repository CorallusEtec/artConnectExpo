import { usePublicacao } from "@/contexts/PublicacaoContext";
import { TipoReacao } from "@/models/enumeration/enumeration";
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
}: PublicacaoReacaoToggleProps) {
  // Contexto
  const { data, dispatch } = usePublicacao();

  /** Ao reagir altera a reação feita pelo usuário
   */
  function toggleReagir() {
    dispatch({ type: tipoReacao });
    // Código de reagir no banco de dados
  }

  return (
    <View style={style.actionContainer}>
      <IconButton
        icon={
          tipoReacao == data.reacaoUsuario
            ? reacaoStateIcons[tipoReacao].on
            : reacaoStateIcons[tipoReacao].off
        }
        size={ICON_SIZE}
        onPress={toggleReagir}
      />
      <Text style={style.actionInsight}>
        {tipoReacao == "LIKE" ? data.likes : data.dislikes}
      </Text>
    </View>
  );
}
