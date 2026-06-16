import { useSearch } from "@/contexts/SearchContext";
import React from "react";
import { ScrollView } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import { FiltrosState } from "../types";
import { FilterArtistaForm } from "./FilterForms/FilterArtistaForm";
import { FilterPublicacaoForm } from "./FilterForms/FilterPublicacaoForm";
import { FilterModalHeader } from "./FilterModalHeader";
import { style } from "./style";

const executarAcaoFiltrar = (
  executarBusca: () => void,
  onClose: () => void,
) => {
  executarBusca();
  onClose();
};
const modificarCampoObjeto = (
  setFiltros: React.Dispatch<React.SetStateAction<FiltrosState>>,
  campo: keyof FiltrosState,
  valor: string,
) => {
  setFiltros((prevState) => ({
    ...prevState,
    [campo]: valor,
  }));
};

export default function FilterModal() {
  const { modalFiltro, setModalFiltro } = useSearch();
  return (
    <Portal>
      <Modal
        visible={modalFiltro}
        onDismiss={() => setModalFiltro(false)}
        contentContainerStyle={style.modalContainer}
      >
        <FilterModalHeader />
        <ScrollView showsVerticalScrollIndicator={false}>
          {true ? <FilterArtistaForm /> : <FilterPublicacaoForm />}
          {/* Botão de Ação */}
          <Button
            mode="contained"
            style={style.applyButton}
            labelStyle={style.applyButtonLabel}
          >
            Aplicar filtros
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
}
