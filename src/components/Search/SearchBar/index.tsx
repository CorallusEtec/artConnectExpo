import { useSearch } from "@/contexts/SearchContext";
import React, { useState } from "react";
import { View } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { style } from "./style";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const { setModalFiltro } = useSearch();
  return (
    <View style={style.row}>
      <TextInput
        mode="outlined"
        placeholder="Pesquisar"
        value={input}
        onChangeText={setInput}
        style={style.input}
      />
      <IconButton
        icon="tune"
        mode="contained"
        size={28}
        onPress={() => setModalFiltro(true)}
        style={style.filterButton}
      />
    </View>
  );
}
