import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { style } from "./style";

export function FilterModalHeader({setModal, tipoFiltro}: {tipoFiltro: any, setModal: (value: boolean)=>void}) {

  
  return (
    <View style={style.header}>
      <Text style={style.title}>Filtros de {tipoFiltro=="Usuario"?"Usuário":"Publicação"}</Text>
      <View style={style.headerRight}>
        <Text style={style.clearText}>Limpar filtros</Text>
        <IconButton
          icon="close"
          size={24}
          iconColor="#666"
          onPress={() =>setModal(false)}
          style={style.closeButton}
        />
      </View>
    </View>
  );
}
