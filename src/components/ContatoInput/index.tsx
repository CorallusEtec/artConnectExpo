import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { style } from "@/components/ContatoInput/style";
import { gStyles } from "@/style/gStyle";

import { Contato, ContatoInputProps } from "./types";
import {
  adicionarContato,
  atualizarContato,
  removerContato,
} from "./Actions";

export default function ContatoInput({
  titulo,
  lista,
  setLista,
  tipo,
  placeholder,
  maskFn,
  onMaskChange,
}: ContatoInputProps) {
  const placeholderColor = gStyles.cinza[500];

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={style.label}>{titulo}</Text>

      {lista.map((contato, index) => (
        <View key={index} style={style.contatoRow}>
          <TextInput
            style={[style.input, style.contatoInput]}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            keyboardType={maskFn ? "phone-pad" : "default"}
            value={maskFn ? maskFn(contato.valor) : contato.valor}
            onChangeText={(text) =>
              atualizarContato(
                setLista,
                index,
                onMaskChange
                  ? onMaskChange(contato.valor, text)
                  : text
              )
            }
          />

          <TouchableOpacity onPress={() => removerContato(setLista, index)}>
            <Feather name="trash-2" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={[style.input, style.botaoAdicionarContato]}
        onPress={() => adicionarContato(setLista, tipo)}
      >
        <Text style={style.textoAdicionarContato}> + Adicionar </Text>
      </TouchableOpacity>
    </View>
  );
}