import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState, useRef } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import { useDynamicThemeStyles } from "@/style/useDynamicThemeStyles";
import { useTheme } from "react-native-paper";
import { MaskedTextInput } from "react-native-mask-text";

import { adicionarContato, atualizarContato } from "./Actions";
import { Contato, ContatoInputProps } from "./types";
import { TipoContato } from "@/models/enumeration/TipoContato";

export default function ContatoInput({
  titulo,
  valorInicial = [],
  tipo,
  placeholder,
  onRemover,
}: Omit<ContatoInputProps, 'onChange'>) {
  const [lista, setLista] = useState<Contato[]>(valorInicial);
  const temContato = lista.length > 0;
  const isTelefone = tipo === TipoContato.TELEFONE;
  const theme = useTheme();
  const dynamic = useDynamicThemeStyles();
  
  const isFirstRender = useRef(true);
  const prevValorInicialRef = useRef<string>('');

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const currentKey = JSON.stringify(valorInicial);
    if (prevValorInicialRef.current === currentKey) {
      return;
    }
    prevValorInicialRef.current = currentKey;

    setLista(valorInicial);
  }, [valorInicial]);

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
      <Text style={[style.label, { color: theme.colors.onSurface }]}>
        {titulo}
      </Text>

      {lista.map((contato, index) => (
        <View key={contato.id || index} style={style.contatoRow}>
          {isTelefone ? (
            <MaskedTextInput
              mask="(99) 99999-9999"
              style={[style.input, style.contatoInput]}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.onSurfaceVariant}
              value={contato.valor}
              keyboardType="numeric"
              onChangeText={(text, rawText) => atualizarContato(setLista, index, rawText)}
            />
          ) : (
            <TextInput
              style={[style.input, style.contatoInput]}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.onSurfaceVariant}
              value={contato.valor}
              onChangeText={(text) => atualizarContato(setLista, index, text)}
            />
          )}

          <TouchableOpacity onPress={() => handleRemover(index)}>
            <Feather name="trash-2" size={24} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      ))}

      {!temContato && (
        <TouchableOpacity
          style={[style.input, style.botaoAdicionarContato, dynamic.bgPrimary]}
          onPress={() => adicionarContato(setLista, tipo)}
        >
          <Text style={style.textoAdicionarContato}>+ Adicionar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}