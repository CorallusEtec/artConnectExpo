// SearchBar.tsx - Versão corrigida
import { useSearch } from "@/contexts/SearchContext";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { style } from "./style";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const { setModalFiltro, tipoFiltro, form } = useSearch();

  useEffect(() => {
    const valorAtual = tipoFiltro.current === "Publicacao" 
      ? form.current.legenda 
      : form.current.nome;
    setInput(valorAtual || "");
  }, [tipoFiltro.current]);

  function handleInput(text: string) {
    if (tipoFiltro.current === "Publicacao") {
      form.current.legenda = text;
    } else {
      form.current.nome = text;
    }
    setInput(text);
  }

  return (
    <View style={style.row}>
      <TextInput
        mode="outlined"
        placeholder="Pesquisar"
        value={input}
        onChangeText={handleInput}
        style={style.input}
      />
    </View>
  );
}
/**
 * 
 * 
 * <IconButton
        icon="tune"
        mode="contained"
        size={28}
        onPress={() => setModalFiltro(true)}
        style={style.filterButton}
      />
 */
