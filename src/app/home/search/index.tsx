import ArtistaService from "@/services/ArtistaService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "./style";

function ChipRow({
  label,
  items,
  selecionado,
  corAtiva,
  onPress,
}: any) {
  if (!items || !items.length) return null;

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
                  ativo && {
                    backgroundColor: corAtiva.bg,
                    borderColor: corAtiva.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    ativo && {
                      color: corAtiva.text,
                      fontWeight: "600",
                    },
                  ]}
                >
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
  const [dadosFiltros, setDadosFiltros] = useState<any[]>([]);
  const [resultados, setResultados] = useState<any[]>([]);

  const [pesquisa, setPesquisa] = useState("");

  const [tipoSel, setTipoSel] = useState("");
  const [generoSel, setGeneroSel] = useState("");
  const [estiloSel, setEstiloSel] = useState("");

  const [buscaRealizada, setBuscaRealizada] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);

  useEffect(() => {
    carregarOpcoesDosChips();
  }, []);

  async function carregarOpcoesDosChips() {
    try {
      const data = await ArtistaService.listarTodos();

      if (Array.isArray(data)) {
        setDadosFiltros(data);
        return;
      }

      if (data && Array.isArray(data.content)) {
        setDadosFiltros(data.content);
        return;
      }

      setDadosFiltros([]);
    } catch (error) {
      console.log(error);
      setDadosFiltros([]);
    }
  }

  async function buscar() {
    Keyboard.dismiss();

    const textoPesquisa = pesquisa.trim();

    const semPesquisa =
      !textoPesquisa &&
      !tipoSel &&
      !generoSel &&
      !estiloSel;

    if (semPesquisa) {
      setResultados([]);
      setBuscaRealizada(false);
      return;
    }

    if (
      textoPesquisa &&
      textoPesquisa.length < 2
    ) {
      setResultados([]);
      setBuscaRealizada(false);
      return;
    }

    try {
      const filtros = {
        nome: textoPesquisa || undefined,
        tipoArtista: tipoSel || undefined,
        genero: generoSel || undefined,
        estilo: estiloSel || undefined,
      };

      const data = await ArtistaService.listar(filtros);

      if (Array.isArray(data)) {
        setResultados(data);
      } else if (
        data &&
        Array.isArray(data.content)
      ) {
        setResultados(data.content);
      } else {
        setResultados([]);
      }

      setBuscaRealizada(true);
    } catch (error) {
      console.log(error);
      setResultados([]);
      setBuscaRealizada(true);
    }
  }

  useEffect(() => {
    const textoPesquisa = pesquisa.trim();

    const semPesquisa =
      !textoPesquisa &&
      !tipoSel &&
      !generoSel &&
      !estiloSel;

    if (semPesquisa) {
      setBuscaRealizada(false);
      setResultados([]);
    }
  }, [pesquisa, tipoSel, generoSel, estiloSel]);

  const listaSegura = Array.isArray(dadosFiltros)
    ? dadosFiltros
    : [];

  const tipos = [
    ...new Set(
      listaSegura
        .map((a: any) => a?.tipoArtista)
        .filter(Boolean)
    ),
  ] as string[];

  const generos = [
    ...new Set(
      listaSegura
        .map((a: any) => a?.genero)
        .filter(Boolean)
    ),
  ] as string[];

  const estilos = [
    ...new Set(
      listaSegura
        .filter(
          (a: any) =>
            !generoSel || a?.genero === generoSel
        )
        .map((a: any) => a?.estilo)
        .filter(Boolean)
    ),
  ] as string[];

  const totalFiltrosAtivos = [
    tipoSel,
    generoSel,
    estiloSel,
  ].filter(Boolean).length;

  function limparFiltros() {
    setTipoSel("");
    setGeneroSel("");
    setEstiloSel("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBarRow}>
        <TextInput
          placeholder="Buscar artista..."
          value={pesquisa}
          onChangeText={setPesquisa}
          style={styles.inputSearch}
          returnKeyType="search"
          onSubmitEditing={buscar}
        />

        <TouchableOpacity
          style={[
            styles.botaoFiltro,
            totalFiltrosAtivos > 0
              ? styles.botaoFiltroAtivo
              : styles.botaoFiltroInativo,
          ]}
          onPress={() => setModalVisivel(true)}
        >
          <View style={styles.iconFunilContainer}>
            <View style={styles.iconFunilLinhaGrande} />
            <View style={styles.iconFunilLinhaMedia} />
            <View style={styles.iconFunilLinhaPequena} />
          </View>

          {totalFiltrosAtivos > 0 && (
            <View style={styles.badgeFiltro}>
              <Text style={styles.badgeFiltroTexto}>
                {totalFiltrosAtivos}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.botaoBuscar}
        onPress={buscar}
      >
        <Text style={styles.textoBotao}>
          Buscar
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisivel}
        onRequestClose={() =>
          setModalVisivel(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>
                Filtros Avançados
              </Text>

              <TouchableOpacity
                onPress={limparFiltros}
              >
                <Text
                  style={styles.botaoLimparFiltros}
                >
                  Limpar filtros
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 20,
              }}
            >
              <ChipRow
                label="Tipo de Artista"
                items={tipos}
                selecionado={tipoSel}
                onPress={(v: string) =>
                  setTipoSel(v)
                }
                corAtiva={{
                  bg: "#EEEDFE",
                  border: "#AFA9EC",
                  text: "#1A56DB",
                }}
              />

              <ChipRow
                label="Gênero"
                items={generos}
                selecionado={generoSel}
                onPress={(v: string) => {
                  setGeneroSel(v);
                  setEstiloSel("");
                }}
                corAtiva={{
                  bg: "#ECFDF5",
                  border: "#A7F3D0",
                  text: "#065F46",
                }}
              />

              <ChipRow
                label="Estilo"
                items={estilos}
                selecionado={estiloSel}
                onPress={(v: string) =>
                  setEstiloSel(v)
                }
                corAtiva={{
                  bg: "#FFFBEB",
                  border: "#FDE68A",
                  text: "#92400E",
                }}
              />
            </ScrollView>

            <TouchableOpacity
              style={styles.botaoAplicarModal}
              onPress={() =>
                setModalVisivel(false)
              }
            >
              <Text
                style={
                  styles.textoBotaoAplicarModal
                }
              >
                Aplicar filtros
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {buscaRealizada ? (
        <FlatList
          data={resultados}
          keyExtractor={(item: any) =>
            String(item.id)
          }
          contentContainerStyle={
            styles.listContainer
          }
          ListEmptyComponent={
            <Text style={styles.empty}>
              Nenhum artista encontrado.
            </Text>
          }
          renderItem={({ item }: any) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push(
                  `/artista/${item.id}` as any
                )
              }
            >
              <Text style={styles.nome}>
                {item.nomeArtistico}
              </Text>

              <Text style={styles.subNome}>
                {item.nome}
              </Text>

              <View style={styles.tagRow}>
                {item.tipoArtista && (
                  <Text
                    style={[
                      styles.tag,
                      styles.tagTipo,
                    ]}
                  >
                    {item.tipoArtista}
                  </Text>
                )}

                {item.genero && (
                  <Text
                    style={[
                      styles.tag,
                      styles.tagGenero,
                    ]}
                  >
                    {item.genero}
                  </Text>
                )}

                {item.estilo && (
                  <Text
                    style={[
                      styles.tag,
                      styles.tagEstilo,
                    ]}
                  >
                    {item.estilo}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.empty}>
          Digite pelo menos 2 letras ou
          selecione um filtro para buscar.
        </Text>
      )}
    </View>
  );
}