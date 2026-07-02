import { useDynamicThemeStyles } from "@/style/useDynamicThemeStyles";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { useTheme } from "react-native-paper";
import { style } from "./style";

import { TipoContato } from "@/models/enumeration/TipoContato";
import { Contato, ContatoInputProps } from "./types";

export default function ContatoInput({
  titulo,
  valorInicial = [],
  tipo,
  placeholder,
  onRemover,
  onChange,
}: ContatoInputProps) {
  const [lista, setLista] = useState<Contato[]>(valorInicial);
  const temContato = lista.length > 0;
  const isTelefone = tipo === TipoContato.TELEFONE;
  const theme = useTheme();
  const dynamic = useDynamicThemeStyles();

  const isFirstRender = useRef(true);
  const prevValorInicialRef = useRef<string>("");

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const currentKey = JSON.stringify(valorInicial);
    if (prevValorInicialRef.current === currentKey) return;
    prevValorInicialRef.current = currentKey;
    setLista(valorInicial);
  }, [valorInicial]);

  function handleAtualizar(index: number, valor: string) {
    const novaLista = [...lista];
    novaLista[index] = { ...novaLista[index], valor };
    setLista(novaLista);
    onChange(novaLista);
  }

  function handleAdicionar() {
    setLista((prev) => {
      const nova = [...prev, { valor: "", tipo, id: undefined }];
      onChange(nova);
      return nova;
    });
  }

  async function handleRemover(index: number) {
    const contato = lista[index];
    await onRemover(contato);
    setLista((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      onChange(copy);
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
              onChangeText={(text, rawText) => handleAtualizar(index, rawText)}
            />
          ) : (
            <TextInput
              style={[style.input, style.contatoInput]}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.onSurfaceVariant}
              value={contato.valor}
              onChangeText={(text) => handleAtualizar(index, text)}
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
          onPress={handleAdicionar}
        >
          <Text style={style.textoAdicionarContato}>+ Adicionar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
