import { useSearch } from "@/contexts/SearchContext";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { style } from "./style";

export function FilterModalHeader() {
  const { setModalFiltro } = useSearch();
  return (
    <View style={style.header}>
      <Text style={style.title}>Filtros Avançados</Text>
      <View style={style.headerRight}>
        <Text style={style.clearText}>Limpar filtros</Text>
        <IconButton
          icon="close"
          size={24}
          iconColor="#666"
          onPress={() => setModalFiltro(false)}
          style={style.closeButton}
        />
      </View>
    </View>
  );
}
