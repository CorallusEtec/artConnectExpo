import { useSearch } from "@/contexts/SearchContext";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { style } from "./style";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const { setModalFiltro, tipoFiltro, form, setForm, filtrosAtivos } = useSearch();

  const isUsuario = tipoFiltro.current === "Usuario";

  useEffect(() => {
    const valorAtual = tipoFiltro.current === "Publicacao" 
      ? form.legenda  
      : form.nome;    
    setInput(valorAtual || "");
  }, [tipoFiltro.current, filtrosAtivos]); 

  function handleInput(text: string) {
    setInput(text);
    
    setForm((prev) => ({
      ...prev,
      [tipoFiltro.current === "Publicacao" ? "legenda" : "nome"]: text,
    }));
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
      {isUsuario && (
        <IconButton
          icon="tune"
          mode="contained"
          size={28}
          onPress={() => setModalFiltro(true)}
          style={style.filterButton}
        />
      )}
    </View>
  );
}