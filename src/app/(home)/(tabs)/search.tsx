import { Header } from "@/components";
import FilterModal from "@/components/Search/FilterModal";
import { ScopeTabs } from "@/components/Search/ScopeTabs";
import SearchBar from "@/components/Search/SearchBar";
import { SearchProvider } from "@/contexts/SearchContext";
import { style } from "@/style/pages/search";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
export default function Search() {
  return (
    <SearchProvider initialState={false}>
      <Header />
      <View style={style.container}>
        <Text variant="labelLarge">Pesquisar usuários</Text>
        <SearchBar />

        <ScopeTabs />

        <FilterModal />
      </View>
    </SearchProvider>
  );
}
