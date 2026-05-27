import { style } from "@/components/ContatoInput/style";
import { gStyles } from "@/style/gStyle";
import Feather from "@expo/vector-icons/Feather";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import {
  adicionarContato,
  atualizarContato,
  removerContato,
} from "./Actions";
import { ContatoInputProps } from "./types";

export default function ContatoInput({
  titulo,
  lista,
  setLista,
  tipo,
  placeholder,
  maskFn,
  onMaskChange,
}: ContatoInputProps) {
  const temContato = lista.length > 0;

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={style.label}>{titulo}</Text>

      {lista.map((contato, index) => (
        <View key={index} style={style.contatoRow}>
          <TextInput
            style={[style.input, style.contatoInput]}
            placeholder={placeholder}
            placeholderTextColor={gStyles.cinza[500]}
            keyboardType={maskFn ? "phone-pad" : "default"}
            value={maskFn ? maskFn(contato.valor) : contato.valor}
            maxLength={15}
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

      {!temContato && (
        <TouchableOpacity
          style={[
            style.input,
            style.botaoAdicionarContato,
          ]}
          onPress={() =>
            adicionarContato(setLista, tipo)
          }
        >
          <Text style={style.textoAdicionarContato}>
            + Adicionar
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

