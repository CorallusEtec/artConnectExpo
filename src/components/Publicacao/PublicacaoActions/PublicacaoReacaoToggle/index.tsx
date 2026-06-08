import { usePublicacaoData } from "@/contexts/PublicacaoContext";
import { TipoReacao } from "@/models/enumeration/enumeration";
import { useState } from "react";
import { Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { ICON_SIZE } from "../../style";
import { style } from "../style";

/**
 * Props do componente
 */
export type PublicacaoReacaoToggleProps = {
  /** T */
  tipoReacao: TipoReacao;
  /** Carrega os icones com os estados reagido e não reagido da reação */
  reacaoIconStates: {
    /** Icone ativo */
    on: string;
    /** Icone não ativo */
    off: string;
  };
};

/**
 * @param param0 props do componente em {@link PublicacaoReacaoToggleProps}
 * @returns Componente que ativa ou desativa uma reação
 */
export function PublicacaoReacaoToggle({
  reacaoIconStates,
  tipoReacao
}: PublicacaoReacaoToggleProps) {
  /** Estado que faz o botão ficar curtido visualmente */
  const [reagido, setReagido] = useState(false);
  const { data } = usePublicacaoData();
  /** Função ativada para reagir ou desreagir essa action */
  function toggleReagir() {
    const reacaoAtiva = data.reacaoUsuario;
    if(reacaoAtiva != tipoReacao) {
      setReagido(prevReacao => !prevReacao);
    }
    
    // Aqui vai ter a lógica de reagir no back end...
  }


  return (
    <View style={style.actionContainer}>
      <IconButton
        icon={reagido ? reacaoIconStates.on : reacaoIconStates.off}
        size={ICON_SIZE}
        onPress={toggleReagir}
      />
      <Text style={style.actionInsight}>0</Text>
    </View>
  );
}
