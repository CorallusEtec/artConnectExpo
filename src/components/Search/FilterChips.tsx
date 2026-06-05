
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
 
interface FilterChipsProps {
  filters?: string[];
  selected?: string;
  onSelect?: (filter: string) => void;
}
 
export default function FilterChips({ filters = [], selected, onSelect }: FilterChipsProps) {
  return (
    <View style={styles.container}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[styles.chip, selected === filter && styles.chipSelected]}
          onPress={() => onSelect?.(filter)}
        >
          <Text style={[styles.text, selected === filter && styles.textSelected]}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  chipSelected: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  textSelected: {
    color: "#fff",
  },
});