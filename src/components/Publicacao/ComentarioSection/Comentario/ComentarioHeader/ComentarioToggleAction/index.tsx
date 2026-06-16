import { useComentario } from "@/contexts";
import { useComentarioQuery } from "@/services/ComentarioService";
import { useReagirComentario } from "@/services/ReacaoService";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { style } from "./style";

export function ComentrarioToggleAction() {
  const { comentarioId } = useComentario();
  const { data } = useComentarioQuery(comentarioId);
  const { mutate, isPending } = useReagirComentario();

  function reagirComentario() {
    mutate({
      idRecurso: comentarioId,
      nomeTipoReacao: "LIKE",
      tipoRecurso: "COMENTARIO",
    });
  }

  return (
    <View style={style.container}>
      <Text style={style.labelInsigth}>{data?.data.likes}</Text>
      <IconButton
        size={18}
        onPress={reagirComentario}
        icon={
          data?.data.reacaoUsuario == "LIKE" ? "thumb-up" : "thumb-up-outline"
        }
      />
    </View>
  );
}
