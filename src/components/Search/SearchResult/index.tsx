import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper"; // 
interface SearchResultProps {
  load: boolean;
  pesquisaRealizada: boolean;
  escopo: string;
  usuarios: any[];      
  publicacoes: any[];   
}

export default function SearchResult({ 
  load, 
  pesquisaRealizada, 
  escopo, 
  usuarios, 
  publicacoes 
}: SearchResultProps) {


  if (load) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} color="#6200ee" />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      {escopo === "publicacao" ? (
        <Text style={styles.title}>Resultados para Publicações ({publicacoes.length})</Text>
      ) : (
        <Text style={styles.title}>Resultados para Usuários ({usuarios.length})</Text>
      )}
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 8,
  },
});