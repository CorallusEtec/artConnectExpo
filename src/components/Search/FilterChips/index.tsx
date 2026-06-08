import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Chip } from "react-native-paper";

interface FilterChipsProps {
  escopo: string;
}

export default function FilterChips({ escopo }: FilterChipsProps) {
  return (

    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.container}
    >
      <Chip 
        mode="flat" 
        style={styles.chip} 
        onClose={() => { }}
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
    backgroundColor: "#E8EAF6", 
    borderRadius: 8,
  },
});