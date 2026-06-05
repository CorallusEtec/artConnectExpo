import { useState } from "react";

export function useSearch() {
  const [escopo, setEscopo] =
    useState<"artista" | "publicacao">(
      "publicacao"
    );

  const [pesquisaPrincipal, setPesquisaPrincipal] =
    useState("");

  const [load, setLoad] =
    useState(false);

  const [modalFiltroVisivel,
    setModalFiltroVisivel] =
    useState(false);

  const [pesquisaRealizada,
    setPesquisaRealizada] =
    useState(false);

  const [usuarios, setUsuarios] =
    useState([]);

  const [publicacoes, setPublicacoes] =
    useState([]);

  const [filtroNome, setFiltroNome] =
    useState("");

  const [filtroCidade, setFiltroCidade] =
    useState("");

  const [filtroEstado, setFiltroEstado] =
    useState("");

  const [
    filtroTipoUsuario,
    setFiltroTipoUsuario
  ] = useState("");

  const [
    filtroLegenda,
    setFiltroLegenda
  ] = useState("");

  const [
    filtroNomeAutor,
    setFiltroNomeAutor
  ] = useState("");

  const [
    filtroDataInicio,
    setFiltroDataInicio
  ] = useState("");

  const [
    filtroDataFim,
    setFiltroDataFim
  ] = useState("");

  const executarBusca = async () => {
     // sua lógica atual
  };

  const limparTodosFiltros = () => {
     // sua lógica atual
  };

  return {
    escopo,
    setEscopo,

    pesquisaPrincipal,
    setPesquisaPrincipal,

    modalFiltroVisivel,
    setModalFiltroVisivel,

    pesquisaRealizada,

    usuarios,
    publicacoes,

    load,

    filtroNome,
    setFiltroNome,

    filtroCidade,
    setFiltroCidade,

    filtroEstado,
    setFiltroEstado,

    filtroTipoUsuario,
    setFiltroTipoUsuario,

    filtroLegenda,
    setFiltroLegenda,

    filtroNomeAutor,
    setFiltroNomeAutor,

    filtroDataInicio,
    setFiltroDataInicio,

    filtroDataFim,
    setFiltroDataFim,

    executarBusca,
    limparTodosFiltros,
  };
}