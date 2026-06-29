import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { style } from "./style";

export function FilterModalHeader({
  setModal,
  tipoFiltro,
  onLimpar,
}: {
  tipoFiltro: any;
  setModal: (value: boolean) => void;
  onLimpar: () => void;
}) {
  return (
    <View style={style.header}>
      <Text style={style.title}>
        Filtros de {tipoFiltro.current == "Usuario" ? "Usuário" : "Publicação"}
      </Text>
      <View style={style.headerRight}>
        <IconButton icon="filter-off-outline" onPress={onLimpar} size={22} />

        <IconButton
          icon="close"
          size={24}
          iconColor="#666"
          onPress={() => setModal(false)}
          style={style.closeButton}
        />
      </View>
    </View>
  );
}
