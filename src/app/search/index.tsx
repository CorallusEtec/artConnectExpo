import ArtistaService from "@/services/ArtistaService";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Search() {
  const [artistas, setArtistas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const data = await ArtistaService.listar();
        setArtistas(data);
      } catch (erro) {
        console.log(erro);
      }
    }

    carregar();
  }, []);

  const artistasFiltrados = artistas.filter((item: any) =>
    item.nomeArtistico
      ?.toLowerCase()
      .includes(pesquisa.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar artista..."
        value={pesquisa}
        onChangeText={setPesquisa}
        style={styles.input}
      />

      <FlatList
        data={artistasFiltrados}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.nome}>
              {item.nomeArtistico}
            </Text>

            <Text>{item.nome}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },

  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  nome: {
    fontWeight: "bold",
    fontSize: 16,
  },
});