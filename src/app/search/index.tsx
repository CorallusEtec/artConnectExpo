import ArtistaService from "@/services/ArtistaService";
import { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

function ChipRow({ label, items, selecionado, corAtiva, onPress }: any) {
  if (!items.length) return null;
  return (
    <View style={styles.filterSection}>
      <Text style={styles.filterLabel}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chipRow}>
          {items.map((item: string) => {
            const ativo = selecionado === item;
            return (
              <TouchableOpacity
                key={item}
                onPress={() => onPress(ativo ? "" : item)}
                style={[
                  styles.chip,
                  ativo && { backgroundColor: corAtiva.bg, borderColor: corAtiva.border },
                ]}
              >
                <Text style={[styles.chipText, ativo && { color: corAtiva.text, fontWeight: "600" }]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

export default function Search() {
  const [artistas, setArtistas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [tipoSel, setTipoSel] = useState("");
  const [generoSel, setGeneroSel] = useState("");
  const [estiloSel, setEstiloSel] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const data = await ArtistaService.listar();
      setArtistas(data);
    } catch (erro) {
      console.log(erro);
    }
  }

  async function buscar() {
    Keyboard.dismiss();
    try {
      const data = await ArtistaService.listar({
        nome: pesquisa || undefined,
        tipoArtista: tipoSel || undefined,
        genero: generoSel || undefined,
        estilo: estiloSel || undefined,
      });
      setArtistas(data);
    } catch (erro) {
      console.log(erro);
    }
  }

  const tipos = [...new Set(artistas.map((a: any) => a.tipoArtista).filter(Boolean))] as string[];
  const generos = [...new Set(artistas.map((a: any) => a.genero).filter(Boolean))] as string[];
  const estilos = [...new Set(
    artistas
      .filter((a: any) => !generoSel || a.genero === generoSel)
      .map((a: any) => a.estilo)
      .filter(Boolean)
  )] as string[];

  const artistasFiltrados = artistas.filter((item: any) => {
    if (pesquisa && !item.nomeArtistico?.toLowerCase().includes(pesquisa.toLowerCase()))
      return false;
    if (tipoSel && item.tipoArtista !== tipoSel) return false;
    if (generoSel && item.genero !== generoSel) return false;
    if (estiloSel && item.estilo !== estiloSel) return false;
    return true;
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar artista..."
        value={pesquisa}
        onChangeText={setPesquisa}
        style={styles.input}
      />

      <TouchableOpacity style={styles.botaoBuscar} onPress={buscar}>
        <Text style={styles.textoBotao}>Buscar</Text>
      </TouchableOpacity>

      <ChipRow
        label="Tipo"
        items={tipos}
        selecionado={tipoSel}
        onPress={(v: string) => setTipoSel(v)}
        corAtiva={{ bg: "#EEEDFE", border: "#AFA9EC", text: "#3C3489" }}
      />

      <ChipRow
        label="Gênero"
        items={generos}
        selecionado={generoSel}
        onPress={(v: string) => { setGeneroSel(v); setEstiloSel(""); }}
        corAtiva={{ bg: "#E1F5EE", border: "#5DCAA5", text: "#085041" }}
      />

      <ChipRow
        label="Estilo"
        items={estilos}
        selecionado={estiloSel}
        onPress={(v: string) => setEstiloSel(v)}
        corAtiva={{ bg: "#FAEEDA", border: "#EF9F27", text: "#633806" }}
      />

      <FlatList
        data={artistasFiltrados}
        keyExtractor={(item: any) => String(item.id)}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum artista encontrado</Text>
        }
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/artista/${item.id}` as any)}
          >
            <Text style={styles.nome}>{item.nomeArtistico}</Text>
            <Text style={styles.subNome}>{item.nome}</Text>
            <View style={styles.tagRow}>
              {item.tipoArtista && <Text style={[styles.tag, styles.tagTipo]}>{item.tipoArtista}</Text>}
              {item.genero && <Text style={[styles.tag, styles.tagGenero]}>{item.genero}</Text>}
              {item.estilo && <Text style={[styles.tag, styles.tagEstilo]}>{item.estilo}</Text>}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
    padding: 20,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: "#1A1A2E",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  botaoBuscar: {
    backgroundColor: "#1A56DB",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#1A56DB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
  },

  filterSection: {
    marginBottom: 14,
  },

  filterLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 8,
  },

  chipRow: {
    flexDirection: "row",
    gap: 8,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },

  chipText: {
    fontSize: 13,
    color: "#64748B",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  nome: {
    fontWeight: "700",
    fontSize: 16,
    color: "#1A1A2E",
    marginBottom: 2,
  },

  subNome: {
    fontSize: 13,
    color: "#94A3B8",
    marginBottom: 4,
  },

  tagRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 8,
    flexWrap: "wrap",
  },

  tag: {
    fontSize: 11,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    fontWeight: "600",
    overflow: "hidden",
  },

  tagTipo: {
    backgroundColor: "#EEF2FF",
    color: "#4338CA",
  },

  tagGenero: {
    backgroundColor: "#ECFDF5",
    color: "#065F46",
  },

  tagEstilo: {
    backgroundColor: "#FFFBEB",
    color: "#92400E",
  },

  empty: {
    textAlign: "center",
    color: "#CBD5E1",
    marginTop: 60,
    fontSize: 14,
    fontWeight: "500",
  },
});