import { useSearch } from "@/contexts/SearchContext";
import React from "react";
import { ScrollView } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import { FilterArtistaForm } from "./FilterForms/FilterArtistaForm";
import { FilterPublicacaoForm } from "./FilterForms/FilterPublicacaoForm";
import { FilterModalHeader } from "./FilterModalHeader";
import { style } from "./style";


export default function FilterModal() {
  const { modalFiltro, setModalFiltro, tipoFiltro } = useSearch();
  return (
    <Portal>
      <Modal
        visible={modalFiltro}
        onDismiss={() => setModalFiltro(false)}
        contentContainerStyle={style.modalContainer}
      >
        <FilterModalHeader tipoFiltro={tipoFiltro.current} setModal={setModalFiltro} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {tipoFiltro.current == "Usuario" ? <FilterArtistaForm /> : <FilterPublicacaoForm />}
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
