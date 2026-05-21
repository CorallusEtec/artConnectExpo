import ArtistaService from "@/services/ArtistaService";
import { useEffect, useState } from "react";
import {
    FlatList,
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

    const tipos = [...new Set(artistas.map((a: any) => a.tipoArtista).filter(Boolean))] as string[];
    const generos = [...new Set(artistas.map((a: any) => a.genero).filter(Boolean))] as string[];
    const estilos = [...new Set(
        artistas
            .filter((a: any) => !generoSel || a.genero === generoSel)
            .map((a: any) => a.estilo)
            .filter(Boolean)
    )] as string[];

    // filtragem
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

            <TouchableOpacity style={styles.botaoBuscar} onPress={() => { }}>
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
         padding: 16,
          backgroundColor:
           "#fff" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 12
    },
    filterSection: {
        marginBottom: 10
    },

    filterLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: "#999",
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginBottom: 6
    },
    chipRow: {
        flexDirection: "row",
        gap: 6
    },
    chip:
    {
        paddingHorizontal: 12,
        paddingVertical: 5, borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "#ccc",
        backgroundColor: "#fff"
    },
    chipText: {
        fontSize: 12,
        color: "#666"
    },
    card: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    },
    nome: {
        fontWeight: "bold",
        fontSize: 15
    },
    subNome: {
        fontSize: 13,
        color: "#888",
        marginTop: 1
    },
    tagRow: {
        flexDirection: "row",
        gap: 4, marginTop: 6,
        flexWrap: "wrap"
    },

    tag: {
        fontSize: 11,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        fontWeight: "500"
    },
    tagTipo: {
        backgroundColor: "#EEEDFE",
        color: "#534AB7"
    },
    tagGenero: {
        backgroundColor:
            "#E1F5EE",
        color: "#0F6E56"
    },
    tagEstilo:
    {
        backgroundColor: "#FAEEDA",
        color: "#854F0B"
    },
    empty:
    {
        textAlign: "center",
        color: "#aaa",
        marginTop: 40,
        fontSize: 14
    },
    botaoBuscar: {
        backgroundColor: "#1A56DB",
        borderRadius: 10,
        padding: 14,
        alignItems: "center",
        marginBottom: 16,
    },
    textoBotao: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 15,
    },
});