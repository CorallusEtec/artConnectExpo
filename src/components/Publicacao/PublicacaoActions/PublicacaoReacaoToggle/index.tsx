import { usePublicacao } from "@/contexts/PublicacaoContext";
import { TipoReacao } from "@/models/enumeration/enumeration";
import { useRef } from "react";
import { Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { ICON_SIZE } from "../../style";
import { style } from "../style";

/**
 * Props do componente
 */
export type PublicacaoReacaoToggleProps = {
  /** Indice da curtida no array de reações do back-end */
  index: number;
  key?: number;
  /** T */
  tipoReacao: TipoReacao;
  /** Carrega os icones com os estados reagido e não reagido da reação */
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
  index,
}: PublicacaoReacaoToggleProps) {
  // Contexto
  const { data, setData } = usePublicacao();
  /** Estado que carrega o total da reacao*/
  const insight = useRef(data.reacoes[index].total);

  /**
   * Ao reagir altera a reação feita pelo usuário
   */
  function toggleReagir() {
    setData((prevState) => ({
      ...prevState,
      publicacao: {
        ...prevState.publicacao,
        ["reacaoUsuario"]: tipoReacao != data.reacaoUsuario ? tipoReacao : null,
      },
    }));
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
        onPress={() => toggleReagir()}
      />
      <Text style={style.actionInsight}>
        {tipoReacao == data.reacaoUsuario
          ? insight.current + 1
          : insight.current}
      </Text>
    </View>
  );
}
