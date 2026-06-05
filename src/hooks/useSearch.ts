import { useState } from "react";

import UsuarioService from "@/services/UsuarioService";
import PublicacoesService from "@/services/PublicacoesService";

type Escopo = "artista" | "publicacao";

export function useSearch() {
  const [escopo, setEscopo] =
    useState<Escopo>("publicacao");

  const [pesquisaPrincipal,
    setPesquisaPrincipal] =
    useState("");

  const [load, setLoad] =
    useState(false);

  const [pesquisaRealizada,
    setPesquisaRealizada] =
    useState(false);

  const [modalFiltroVisivel,
    setModalFiltroVisivel] =
    useState(false);

  const [usuarios, setUsuarios] =
    useState<any[]>([]);

  const [publicacoes,
    setPublicacoes] =
    useState<any[]>([]);

  const [filtroNome,
    setFiltroNome] =
    useState("");

  const [filtroCidade,
    setFiltroCidade] =
    useState("");

  const [filtroEstado,
    setFiltroEstado] =
    useState("");

  const [
    filtroTipoUsuario,
    setFiltroTipoUsuario
  ] = useState("");

  const [filtroLegenda,
    setFiltroLegenda] =
    useState("");

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

  async function executarBusca() {
    try {
      setLoad(true);
      setPesquisaRealizada(true);

      if (escopo === "artista") {
        const response =
          await UsuarioService.listar({
            nome:
              filtroNome ||
              pesquisaPrincipal,

            cidade:
              filtroCidade,

            uf:
              filtroEstado,

            tipoConta:
              filtroTipoUsuario,
          });

        setUsuarios(response);
      } else {
        const response =
          await PublicacoesService.listar({
            legenda:
              filtroLegenda ||
              pesquisaPrincipal,

            nomeAutor:
              filtroNomeAutor,

            dataInicio:
              filtroDataInicio,

            dataFim:
              filtroDataFim,
          });

        setPublicacoes(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  }

  function limparTodosFiltros() {
    setFiltroNome("");
    setFiltroCidade("");
    setFiltroEstado("");
    setFiltroTipoUsuario("");

    setFiltroLegenda("");
    setFiltroNomeAutor("");

    setFiltroDataInicio("");
    setFiltroDataFim("");

    setPesquisaPrincipal("");

    setUsuarios([]);
    setPublicacoes([]);

    setPesquisaRealizada(false);
  }

  return {
    escopo,
    setEscopo,

    pesquisaPrincipal,
    setPesquisaPrincipal,

    pesquisaRealizada,

    modalFiltroVisivel,
    setModalFiltroVisivel,

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