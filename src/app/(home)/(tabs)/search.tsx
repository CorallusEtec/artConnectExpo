import { Header } from "@/components";
import EmptyState from "@/components/Search/EmptyState";
import FilterModal from "@/components/Search/FilterModal";
import { ScopeTabs } from "@/components/Search/ScopeTabs";
import SearchBar from "@/components/Search/SearchBar";
import { SearchResult } from "@/components/Search/SearchResult";
import { SearchProvider } from "@/contexts/SearchContext";
import { style } from "@/style/pages/search";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
export default function Search() {
  return (
    <SearchProvider initialState={false}>
      <Header />
      <View style={style.container}>
        <SearchBar />

        <ScopeTabs />
        <Button mode="contained" style={style.button}>
          Buscar
        </Button>
        <SearchResult />

        <EmptyState />

        <FilterModal />
      </View>
    </SearchProvider>
  );
}
