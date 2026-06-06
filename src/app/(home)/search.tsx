import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import SearchBar from "@/components/Search/SearchBar";
import ScopeTabs from "@/components/Search/ScopeTabs";
import SearchResult from "@/components/Search/SearchResult";
import EmptyState from "@/components/Search/EmptyState";
import FilterModal from "@/components/Search/FIlterModal"; 
import userCard from "@/components/Search/userCard"; 
import { useSearch } from "@/hooks/useSearch";
export default function Search() {
  const search = useSearch();

  return (
    <View style={styles.container}>
      <SearchBar
        value={search.pesquisaPrincipal}
        onChangeText={search.setPesquisaPrincipal}
        onFilterPress={() => search.setModalFiltroVisivel(true)}
      />

      <ScopeTabs
        escopo={search.escopo}
        onChange={search.setEscopo}
      />
      <Button
        mode="contained"
        style={styles.button}
        buttonColor="#0B31A3" 
        textColor="#FFF"
        onPress={search.executarBusca}
      >
        Buscar
      </Button>
      <SearchResult
        load={search.load}
        pesquisaRealizada={search.pesquisaRealizada}
        escopo={search.escopo}
        usuarios={search.usuarios}
        publicacoes={search.publicacoes}
      />

      {!search.pesquisaRealizada && <EmptyState />}

      <FilterModal
        visible={search.modalFiltroVisivel}
        onClose={() => search.setModalFiltroVisivel(false)}
        {...search} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 4,
  },
});