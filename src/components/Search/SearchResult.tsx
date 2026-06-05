import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SearchResultProps {
  title?: string;
  description?: string;
  onPress?: () => void;
}

export default function SearchResult({ title = "", description = "", onPress }: SearchResultProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});