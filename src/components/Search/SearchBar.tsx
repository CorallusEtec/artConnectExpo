import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, IconButton } from "react-native-paper";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
}

export default function SearchBar({ value, onChangeText, onFilterPress }: SearchBarProps) {
  return (
    <View style={styles.row}>
      <TextInput
        mode="outlined"
        placeholder="Buscar publicação..."
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        outlineColor="#E0E0E0"
        activeOutlineColor="#0B31A3"
      />
      <IconButton
        icon="tune" // Ícone de filtro/ajustes do Material Design
        mode="contained"
        containerColor="#E0E0E0"
        iconColor="#111"
        size={28}
        style={styles.filterButton}
        onPress={onFilterPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#F5F5F5",
  },
  filterButton: {
    borderRadius: 8,
    margin: 0,
    height: 50,
    width: 50,
  },
});