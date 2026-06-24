import { Header } from "@/components";
import FilterModal from "@/components/Search/FilterModal";
import { ScopeTabs } from "@/components/Search/ScopeTabs";
import SearchBar from "@/components/Search/SearchBar";
import { SearchProvider } from "@/contexts/SearchContext";
import { style } from "@/style/pages/search";
import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
export default function Search() {
    const [tipoFiltro, setTipoFiltro] = useState("Usuario");
    const titulo = tipoFiltro === "Usuario" ? "Pesquisar usuários" : "Pesquisar publicações";
  return (
    <SearchProvider initialState={false}>
      <Header />
      <View style={style.container}>
        <Text variant="labelLarge">{titulo}</Text>
        <SearchBar />

        <ScopeTabs setTipoFiltro={setTipoFiltro}/>

        <FilterModal />
      </View>
    </SearchProvider>
  );
}
