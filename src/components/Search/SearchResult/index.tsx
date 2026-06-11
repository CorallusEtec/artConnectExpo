import { Publicacao } from "@/components/Publicacao";
import { PublicacaoProvider } from "@/contexts/PublicacaoContext";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper"; //
import UserCard from "../UserCard";
interface SearchResultProps {
  load: boolean;
  pesquisaRealizada: boolean;
  escopo: string;
  usuarios: any;
  publicacoes: any;
}

export default function SearchResult({
  load,
  pesquisaRealizada,
  escopo,
  usuarios,
  publicacoes,
}: SearchResultProps) {
  if (load) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} color="#6200ee" />
      </View>
    );
  }
  console.log(publicacoes);
  console.log(usuarios);

  return (
    <View style={styles.container}>
      {escopo === "publicacao" ? (
        <>
          <Text style={styles.title}>
            Resultados para Publicações ({publicacoes.content.length})
          </Text>
          {pesquisaRealizada && (
            <FlatList
              data={publicacoes.content}
              renderItem={({ item }) => (
                <PublicacaoProvider dadosPubli={item}>
                  <Publicacao />
                </PublicacaoProvider>
              )}
            />
          )}
        </>
      ) : (
        <>
          <Text style={styles.title}>
            Resultados para Usuários ({usuarios.content.length})
          </Text>
          {pesquisaRealizada && (
            <FlatList
              data={usuarios.content}
              renderItem={({ item }) => (
                <UserCard
                  nome={item.nome}
                  tipo={item.tipoConta}
                  localizacao={item.cidade ? `${item.cidade} - ${item.uf}` : ""}
                  descricao={item.textoBio}
                />
              )}
            />
          )}
        </>
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
