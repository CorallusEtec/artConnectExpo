import React from "react";

export interface FiltrosState {
  nome: string;
  cidade: string;
  estado: string;
  tipoConta: string;
  legenda: string;
  nomeAutor: string;
  dataInicio: string;
  dataFim: string;
}

export interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  escopo: string;
  filtros: FiltrosState;
  setFiltros: React.Dispatch<React.SetStateAction<FiltrosState>>;
  executarBusca: () => void;
  limparTodosFiltros: () => void;
}