import { CommentSection } from "@/components/CommentSection";
import { Post } from "@/components/Post";
import { Reacao } from "@/components/Reacao";
import { TextButton } from "@/components/TextButton";
import { PublicacaoResponse } from "@/models/response/PublicacaoResponse";
import PublicacoesService from "@/services/PublicacoesService";
import UsuarioService from "@/services/UsuarioService";
import { gStyles } from "@/style/gStyle";

import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { useState } from "react";

import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { style } from "./style";

type TipoEscopo = "artista" | "publicacao";

export default function Busca() {
  // =========================
  // ESTADOS GERAIS
  // =========================
  const [escopo, setEscopo] = useState<TipoEscopo>("publicacao");

  const [pesquisaPrincipal, setPesquisaPrincipal] = useState("");

  const [load, setLoad] = useState(false);

  const [modalFiltroVisivel, setModalFiltroVisivel] = useState(false);

  const [pesquisaRealizada, setPesquisaRealizada] = useState(false);

  // RESULTADOS

  const [publicacoes, setPublicacoes] = useState<PublicacaoResponse[]>([]);

  const [usuarios, setUsuarios] = useState<any[]>([]);

  // =========================
  // FILTROS USUÁRIOS
  // =========================
  const [filtroNome, setFiltroNome] = useState("");

  const [filtroCidade, setFiltroCidade] = useState("");

  const [filtroEstado, setFiltroEstado] = useState("");

  const [filtroTipoUsuario, setFiltroTipoUsuario] = useState<
    "ARTISTA" | "CONTRATANTE" | ""
  >("");

  // =========================
  // FILTROS PUBLICAÇÃO
  // =========================
  const [filtroLegenda, setFiltroLegenda] = useState("");

  const [filtroNomeAutor, setFiltroNomeAutor] = useState("");

  const [filtroDataInicio, setFiltroDataInicio] = useState("");

  const [filtroDataFim, setFiltroDataFim] = useState("");

  // =========================
  // MODAL COMENTÁRIOS
  // =========================
  const [modalStatus, setModalStatus] = useState(false);

  const [postId, setPostId] = useState<number>();

  // =========================
  // FORMATAR DATA
  // =========================
  const formatarData = (texto: string) => {
    const numeros = texto.replace(/\D/g, "");

    if (numeros.length <= 2) {
      return numeros;
    }

    if (numeros.length <= 4) {
      return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
    }

    return `${numeros.slice(0, 2)}/${numeros.slice(
      2,
      4,
    )}/${numeros.slice(4, 8)}`;
  };

  // =========================
  // BUSCA
  // =========================
  const executarBusca = async () => {
    setLoad(true);

    setPesquisaRealizada(true);

    try {
      if (escopo === "artista") {
        const filtrosUsuario = {
          nome: filtroNome || pesquisaPrincipal || undefined,

          tipoConta: filtroTipoUsuario || undefined,

          cidade: filtroCidade || undefined,

          uf: filtroEstado || undefined,
        };

        const response = await UsuarioService.listar(filtrosUsuario);

        setUsuarios(response);
      }

      // ====================================
      // BUSCA DE PUBLICAÇÕES
      // ====================================
      else {
        const filtrosPublicacao = {
          legenda: filtroLegenda || pesquisaPrincipal || undefined,

          nomeAutor: filtroNomeAutor || undefined,

          dataInicio: filtroDataInicio
            ? new Date(
                filtroDataInicio.split("/").reverse().join("-"),
              ).toISOString()
            : undefined,

          dataFim: filtroDataFim
            ? new Date(
                filtroDataFim.split("/").reverse().join("-"),
              ).toISOString()
            : undefined,
        };

        const response = await PublicacoesService.listar(filtrosPublicacao);

        setPublicacoes(response);
      }
    } catch (erro) {
      console.error("Erro ao realizar busca:", erro);
    } finally {
      setLoad(false);
    }
  };

  const limparTodosFiltros = () => {
    setFiltroNome("");
    setFiltroCidade("");
    setFiltroEstado("");
    setFiltroTipoUsuario("");
    setFiltroLegenda("");
    setFiltroNomeAutor("");
    setFiltroDataInicio("");
    setFiltroDataFim("");
    setPesquisaPrincipal("");
    setPesquisaRealizada(false);
    setUsuarios([]);
    setPublicacoes([]);
  };
  return (
    <>
      {/* CONTAINER */}
      <View style={style.container}>
        {/* PESQUISA */}
        <View style={style.searchRow}>
          <TextInput
            style={style.inputPesquisa}
            placeholder={
              escopo === "artista"
                ? "Buscar usuário..."
                : "Buscar publicação..."
            }
            value={pesquisaPrincipal}
            onChangeText={setPesquisaPrincipal}
            placeholderTextColor={gStyles.cinza[400]}
          />
          <TouchableOpacity
            style={style.botaoFiltro}
            onPress={() => setModalFiltroVisivel(true)}
          >
            <Feather name="sliders" size={20} color={gStyles.cinza[600]} />
          </TouchableOpacity>
        </View>

        {/* ABAS */}
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            marginVertical: 4,
          }}
        >
          {/* PUBLICAÇÃO */}
          <TouchableOpacity
            style={[
              {
                flex: 1,
                height: 40,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: gStyles.cinza[100],
              },

              escopo === "publicacao" && {
                backgroundColor: "#113093",
              },
            ]}
            onPress={() => {
              setEscopo("publicacao");

              setPesquisaRealizada(false);
            }}
          >
            <Text
              style={{
                color: escopo === "publicacao" ? "#FFF" : gStyles.cinza[500],

                fontWeight: "600",
              }}
            >
              Publicações
            </Text>
          </TouchableOpacity>

          {/* USUÁRIOS */}
          <TouchableOpacity
            style={[
              {
                flex: 1,
                height: 40,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: gStyles.cinza[100],
              },

              escopo === "artista" && {
                backgroundColor: "#113093",
              },
            ]}
            onPress={() => {
              setEscopo("artista");

              setPesquisaRealizada(false);
            }}
          >
            <Text
              style={{
                color: escopo === "artista" ? "#FFF" : gStyles.cinza[500],

                fontWeight: "600",
              }}
            >
              Usuários
            </Text>
          </TouchableOpacity>
        </View>

        {/* BOTÃO BUSCAR */}
        <TouchableOpacity
          style={style.botaoBuscarPrincipal}
          onPress={executarBusca}
        >
          <Text style={style.textoBotaoBuscar}>Buscar</Text>
        </TouchableOpacity>

        {/* RESULTADOS */}
        {load ? (
          <ActivityIndicator
            size="large"
            color="#113093"
            style={{ marginTop: 24 }}
          />
        ) : (
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 24,
            }}
          >
            {/* SEM PESQUISA */}
            {!pesquisaRealizada && (
              <View
                style={{
                  alignItems: "center",
                  marginTop: 40,
                }}
              >
                <Feather name="search" size={40} color={gStyles.cinza[300]} />

                <Text
                  style={{
                    color: gStyles.cinza[400],
                    marginTop: 8,
                    fontSize: 14,
                  }}
                >
                  Digite algo ou use os filtros
                </Text>
              </View>
            )}

            {/* RESULTADOS USUÁRIOS */}
            {pesquisaRealizada &&
              escopo === "artista" &&
              usuarios.map((usuario) => {
                return (
                  <View key={usuario.id} style={style.cardResultado}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      {/* ÍCONE PERFIL */}
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          backgroundColor: "#E5E7EB",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Feather name="user" size={24} color="#6B7280" />
                      </View>

                      {/* INFOS */}
                      <View style={{ flex: 1 }}>
                        <Text style={style.tituloCard}>
                          {usuario.nomeLog ? `${usuario.nome}` : usuario.nome}
                        </Text>

                        {(usuario.cidade || usuario.uf) && (
                          <Text style={style.subtituloCard}>
                            {[usuario.cidade, usuario.uf]
                              .filter(Boolean)
                              .join(" - ")}
                          </Text>
                        )}

                        {!!usuario.textoBio && (
                          <Text
                            style={[
                              style.subtituloCard,
                              {
                                marginTop: 2,
                              },
                            ]}
                          >
                            {usuario.textoBio}
                          </Text>
                        )}

                        <Text
                          style={[
                            style.subtituloCard,
                            {
                              color: "#113093",
                              fontWeight: "600",
                              marginTop: 4,
                            },
                          ]}
                        >
                          {usuario.tipoConta
                            ?.replace("_CPF", "")
                            ?.replace("_CNPJ", "")
                            ?.replace("_", " ")}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}

            {/* NENHUM USUÁRIO */}
            {pesquisaRealizada &&
              escopo === "artista" &&
              usuarios.length === 0 && (
                <Text
                  style={{
                    textAlign: "center",
                    color: gStyles.cinza[400],
                    marginTop: 16,
                  }}
                >
                  Nenhum usuário encontrado.
                </Text>
              )}

            {/* RESULTADOS PUBLICAÇÕES */}
            {pesquisaRealizada &&
              escopo === "publicacao" &&
              publicacoes.map((item) => (
                <Post.root key={item.id}>
                  <Post.header
                    nomePerfil={item.autor?.nome ?? "Usuário"}
                    dataPublicacao={new Date(item.dataPublicacao)}
                  >
                    <Post.headerActions>
                      <TextButton title="Seguir" theme="secondary" />
                    </Post.headerActions>
                  </Post.header>

                  <Post.legend data={item.legenda} />

                  {item.urlMidia && <Post.image url={item.urlMidia} />}

                  <Post.actions>
                    <Reacao insight={0}>
                      <MaterialCommunityIcons
                        name="thumb-up-outline"
                        size={24}
                        color={gStyles.cinza[600]}
                      />
                    </Reacao>

                    <Reacao
                      insight={item.totalComentarios}
                      onPress={() => {
                        setModalStatus(true);

                        setPostId(item.id as number);
                      }}
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color={gStyles.cinza[600]}
                      />
                    </Reacao>
                  </Post.actions>
                </Post.root>
              ))}

            {/* NENHUMA PUBLICAÇÃO */}
            {pesquisaRealizada &&
              escopo === "publicacao" &&
              publicacoes.length === 0 && (
                <Text
                  style={{
                    textAlign: "center",
                    color: gStyles.cinza[400],
                    marginTop: 16,
                  }}
                >
                  Nenhuma publicação encontrada.
                </Text>
              )}

            {/* MODAL COMENTÁRIOS */}
            <CommentSection
              setModalStatus={setModalStatus}
              postId={postId}
              visible={modalStatus}
            />
          </ScrollView>
        )}
      </View>

      {/* MODAL FILTROS */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalFiltroVisivel}
        onRequestClose={() => setModalFiltroVisivel(false)}
      >
        <View style={style.modalOverlay}>
          <View style={style.modalConteudo}>
            {/* HEADER */}
            <View style={style.modalHeader}>
              <Text style={style.modalTitulo}>Filtros Avançados</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <TouchableOpacity onPress={limparTodosFiltros}>
                  <Text style={style.textoLimpar}>Limpar filtros</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalFiltroVisivel(false)}>
                  <Feather name="x" size={22} color={gStyles.cinza[500]} />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* FILTROS USUÁRIO */}
              {escopo === "artista" && (
                <View style={{ gap: 12 }}>
                  <View>
                    <Text style={style.labelFiltro}>Nome</Text>

                    <TextInput
                      style={style.modalInput}
                      value={filtroNome}
                      onChangeText={setFiltroNome}
                      placeholder="Ex: Samuel"
                      placeholderTextColor={gStyles.cinza[400]}
                    />
                  </View>

                  <View>
                    <Text style={style.labelFiltro}>Cidade</Text>

                    <TextInput
                      style={style.modalInput}
                      value={filtroCidade}
                      onChangeText={setFiltroCidade}
                      placeholder="Ex: São Paulo"
                      placeholderTextColor={gStyles.cinza[400]}
                    />
                  </View>

                  <View>
                    <Text style={style.labelFiltro}>UF</Text>

                    <TextInput
                      style={style.modalInput}
                      value={filtroEstado}
                      onChangeText={setFiltroEstado}
                      placeholder="Ex: SP"
                      placeholderTextColor={gStyles.cinza[400]}
                      maxLength={2}
                      autoCapitalize="characters"
                    />
                  </View>

                  <View>
                    <Text style={style.labelFiltro}>Tipo de Conta</Text>

                    <View style={style.containerBotoesTipo}>
                      <TouchableOpacity
                        style={[
                          style.botaoTipo,

                          filtroTipoUsuario === "ARTISTA" &&
                            style.botaoTipoAtivo,
                        ]}
                        onPress={() => setFiltroTipoUsuario("ARTISTA")}
                      >
                        <Text
                          style={[
                            style.textoBotaoTipo,

                            filtroTipoUsuario === "ARTISTA" &&
                              style.textoBotaoTipoAtivo,
                          ]}
                        >
                          Artista
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          style.botaoTipo,

                          filtroTipoUsuario === "CONTRATANTE" &&
                            style.botaoTipoAtivo,
                        ]}
                        onPress={() => setFiltroTipoUsuario("CONTRATANTE")}
                      >
                        <Text
                          style={[
                            style.textoBotaoTipo,

                            filtroTipoUsuario === "CONTRATANTE" &&
                              style.textoBotaoTipoAtivo,
                          ]}
                        >
                          Contratante
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {/* FILTROS PUBLICAÇÃO */}
              {escopo === "publicacao" && (
                <View style={{ gap: 12 }}>
                  <View>
                    <Text style={style.labelFiltro}>Legenda</Text>

                    <TextInput
                      style={style.modalInput}
                      value={filtroLegenda}
                      onChangeText={setFiltroLegenda}
                      placeholder="Palavra-chave..."
                      placeholderTextColor={gStyles.cinza[400]}
                    />
                  </View>

                  <View>
                    <Text style={style.labelFiltro}>Nome do Autor</Text>

                    <TextInput
                      style={style.modalInput}
                      value={filtroNomeAutor}
                      onChangeText={setFiltroNomeAutor}
                      placeholder="Ex: André"
                      placeholderTextColor={gStyles.cinza[400]}
                    />
                  </View>

                  <View>
                    <Text style={style.labelFiltro}>Data Início</Text>

                    <TextInput
                      style={style.modalInput}
                      value={filtroDataInicio}
                      onChangeText={(text) =>
                        setFiltroDataInicio(formatarData(text))
                      }
                      placeholder="25/05/2026"
                      placeholderTextColor={gStyles.cinza[400]}
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  </View>

                  <View>
                    <Text style={style.labelFiltro}>Data Fim</Text>

                    <TextInput
                      style={style.modalInput}
                      value={filtroDataFim}
                      onChangeText={(text) =>
                        setFiltroDataFim(formatarData(text))
                      }
                      placeholder="30/05/2026"
                      placeholderTextColor={gStyles.cinza[400]}
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  </View>
                </View>
              )}
            </ScrollView>

            {/* BOTÃO APLICAR */}
            <TouchableOpacity
              style={style.botaoAplicar}
              onPress={() => {
                setModalFiltroVisivel(false);

                executarBusca();
              }}
            >
              <Text style={style.textoBotaoAplicar}>Aplicar filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
