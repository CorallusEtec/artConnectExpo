import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Chip } from "react-native-paper";

interface FilterChipsProps {
  escopo: string;
}

export default function FilterChips({ escopo }: FilterChipsProps) {
  return (
    // ScrollView horizontal permite que os chips rolem de lado se forem muitos
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.container}
    >
      <Chip 
        mode="flat" 
        style={styles.chip} 
        onClose={() => { /* lógica para remover filtro */ }}
      >
        {escopo === "publicacao" ? "Publicações" : "Usuários"}
      </Chip>

      <Chip 
        mode="flat" 
        style={styles.chip} 
        onClose={() => {}}
      >
        Artista
      </Chip>

      <Chip 
        mode="flat" 
        style={styles.chip} 
        onClose={() => {}}
      >
        SP
      </Chip>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 10,
  },
  chip: {
    backgroundColor: "#E8EAF6", // Um tom de azul bem clarinho para o fundo do chip
    borderRadius: 8,
  },
});