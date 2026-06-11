import React from "react";
import { View } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { style } from "./style";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
}
export default function SearchBar({ value, onChangeText, onFilterPress }: SearchBarProps) {
  return (
    <View style={style.row}>
      <TextInput
        mode="outlined"
        placeholder="Buscar publicação..."
        value={value}
        onChangeText={onChangeText}
        style={style.input}
        outlineColor="#E0E0E0"
        activeOutlineColor="#0B31A3"
      />
      <IconButton
        icon="tune" 
        mode="contained"
        containerColor="#E0E0E0"
        iconColor="#111"
        size={28}
        style={style.filterButton}
        onPress={onFilterPress}
      />
    </View>
  );
}

