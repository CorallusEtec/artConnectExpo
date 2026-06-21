import { gStyles } from "@/style/gStyle";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { style } from "./style";

import { adicionarContato, atualizarContato } from "./Actions";
import { Contato, ContatoInputProps } from "./types";
import { TipoContato } from "@/models/enumeration/TipoContato";
import { MaskedTextInput } from "react-native-mask-text";


export default function ContatoInput({
  titulo,
  valorInicial = [],
  tipo,
  placeholder,
  onChange,
  onRemover,
}: ContatoInputProps) {
  const [lista, setLista] = useState<Contato[]>(valorInicial);
  const temContato = lista.length > 0;
  const isTelefone = tipo === TipoContato.TELEFONE;

  useEffect(() => {
    onChange(lista);
  }, [lista]);

  async function handleRemover(index: number) {
    await onRemover(index);

    setLista((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  }

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={style.label}>{titulo}</Text>

      {lista.map((contato, index) => (
        <View key={index} style={style.contatoRow}>
          {isTelefone ? (
            <MaskedTextInput
              mask="(99) 99999-9999"
              style={[style.input, style.contatoInput]}
              placeholder={placeholder}
              placeholderTextColor={gStyles.cinza[500]}
              value={contato.valor}
              keyboardType="numeric"
              onChangeText={(text, rawText) => atualizarContato(setLista, index, rawText)}
            />
          ) : (
            <TextInput
              style={[style.input, style.contatoInput]}
              placeholder={placeholder}
              placeholderTextColor={gStyles.cinza[500]}
              value={contato.valor}
              onChangeText={(text) => atualizarContato(setLista, index, text)}
            />
          )}


          <TouchableOpacity onPress={() => handleRemover(index)}>
            <Feather name="trash-2" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ))}

      {!temContato && (
        <TouchableOpacity
          style={[style.input, style.botaoAdicionarContato]}
          onPress={() => adicionarContato(setLista, tipo)}
        >
          <Text style={style.textoAdicionarContato}>+ Adicionar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}