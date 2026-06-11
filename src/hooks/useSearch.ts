import { FiltrosState } from "@/components/Search/types";
import { PublicacaoService } from "@/services/PublicacaoService";
import UsuarioService from "@/services/UsuarioService";
import { useState } from "react";

type Escopo = "artista" | "publicacao";

export function useSearch() {
  const [escopo, setEscopo] = useState<Escopo>("publicacao");
  const [pesquisaPrincipal, setPesquisaPrincipal] = useState("");
  const [load, setLoad] = useState(false);
  const [pesquisaRealizada, setPesquisaRealizada] = useState(false);
  const [modalFiltroVisivel, setModalFiltroVisivel] = useState(false);
  const [usuarios, setUsuarios] = useState<any>({ content: [] });
  const [publicacoes, setPublicacoes] = useState<any>({ content: [] });
  const [filtros, setFiltros] = useState<FiltrosState>({
    nome: "",
    cidade: "",
    estado: "",
    tipoUsuario: "",
    legenda: "",
    nomeAutor: "",
    dataInicio: "",
    dataFim: "",
  });

  async function executarBusca() {
    try {
      setLoad(true);
      setPesquisaRealizada(true);

      if (escopo === "artista") {
        const response = await UsuarioService.listar({
          nome: filtros.nome || pesquisaPrincipal,
          cidade: filtros.cidade,
          uf: filtros.estado,
          tipoConta: filtros.tipoUsuario,
        });

        setUsuarios(response);
      } else {
        const response = await PublicacaoService.listarAntigo({
          legenda: filtros.legenda || pesquisaPrincipal,
          nomeAutor: filtros.nomeAutor,
          dataInicio: filtros.dataInicio,
          dataFim: filtros.dataFim,
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
    setFiltros({
      nome: "",
      cidade: "",
      estado: "",
      tipoUsuario: "",
      legenda: "",
      nomeAutor: "",
      dataInicio: "",
      dataFim: "",
    });

    setPesquisaPrincipal("");
    setUsuarios({ content: [] });
    setPublicacoes({ content: [] });
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

    filtros,
    setFiltros,

    executarBusca,
    limparTodosFiltros,
  };
}
