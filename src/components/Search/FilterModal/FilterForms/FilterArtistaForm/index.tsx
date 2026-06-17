import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { style } from "./style";

export function FilterArtistaForm() {
  return (
    <View>
 
      <Text style={style.label}>Cidade</Text>
      <TextInput
        mode="outlined"
        placeholder="Ex: São Paulo"
        style={style.input}
        outlineColor="#E0E0E0"
        activeOutlineColor="#0B31A3"
      />
      <Text style={style.label}>Estado</Text>
      <TextInput
        mode="outlined"
        placeholder="Ex: SP"
        style={style.input}
        outlineColor="#E0E0E0"
        activeOutlineColor="#0B31A3"
      />
      <Text style={style.label}>Tipo de Usuário</Text>
      <View style={style.row}>
        <Button
          mode={"contained-tonal"}
          compact
          style={[style.flex1, style.typeButton]}
        >
          Artista
        </Button>

        <Button
          mode={"outlined"}
          compact
          style={[style.flex1, style.typeButton]}
        >
          Contratante
        </Button>
      </View>
    </View>
  );
}
