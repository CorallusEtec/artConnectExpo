import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { style } from "./style";

export function FilterPublicacaoForm() {
  return (
    <View>
      <Text style={style.label}>Nome do Autor</Text>
      <TextInput
        mode="outlined"
        placeholder="Ex: André"
        style={style.input}
        outlineColor="#E0E0E0"
        activeOutlineColor="#0B31A3"
      />
      <View style={style.row}>
        <View style={style.flex1}>
          <Text style={style.label}>Data Início</Text>
          <TextInput
            mode="outlined"
            placeholder="25/05/2026"
            style={style.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#0B31A3"
          />
        </View>
        <View style={style.flex1}>
          <Text style={style.label}>Data Fim</Text>
          <TextInput
            mode="outlined"
            placeholder="30/05/2026"
            keyboardType="numeric"
            style={style.input}
            outlineColor="#E0E0E0"
            activeOutlineColor="#0B31A3"
          />
        </View>
      </View>
    </View>
  );
}
