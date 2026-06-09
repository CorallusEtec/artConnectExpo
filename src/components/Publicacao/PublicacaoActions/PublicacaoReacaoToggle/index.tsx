import { usePublicacaoData } from "@/contexts/PublicacaoContext";
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
  index?: number;
  key?: number;
  /** T */
  tipoReacao: TipoReacao;
  /** Carrega os icones com os estados reagido e não reagido da reação */
};

/**
 * @param param0 props do componente em {@link PublicacaoReacaoToggleProps}
 * @returns Componente que ativa ou desativa uma reação
 */
export function PublicacaoReacaoToggle({
  tipoReacao,
  index,
}: PublicacaoReacaoToggleProps) {
  const { data, setData } = usePublicacaoData();
  /** Estado que carrega o total da reacao*/
  const insight = useRef(data.reacoes[index].total);

  /**
   * Ao reagir altera a reação feita pelo usuário
   */
  function toggleReagir() {
    setData((prevState) => ({
      ...prevState,
      ["reacaoUsuario"]: tipoReacao != data.reacaoUsuario ? tipoReacao : null,
    }));
    // Código de reagir no banco de dados
  }

  return (
    <View style={style.actionContainer}>
      <IconButton
        icon={
          tipoReacao == data.reacaoUsuario ? "thumb-down" : "thumb-down-outline"
        }
        size={ICON_SIZE}
        onPress={() => toggleReagir()}
      />
      <Text style={style.actionInsight}>
        {data.reacaoUsuario == tipoReacao
          ? insight.current + 1
          : insight.current}
      </Text>
    </View>
  );
}
