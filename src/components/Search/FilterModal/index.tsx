import { useSearch } from "@/contexts/SearchContext";
import React from "react";
import { ScrollView } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import { FilterArtistaForm } from "./FilterForms/FilterArtistaForm";
import { FilterModalHeader } from "./FilterModalHeader";
import { style } from "./style";

interface FilterModalProps {
  onAplicar?: () => void;
}

export default function FilterModal({ onAplicar }: FilterModalProps) {
  const {
    modalFiltro,
    setModalFiltro,
    tipoFiltro,
    aplicarFiltros,
    limparFiltros,
    form,
    setForm,          
    filtrosAtivos,  
    resetCounter,  
  } = useSearch();

  function handleAplicar() {
    aplicarFiltros();
    setModalFiltro(false);
    onAplicar?.();
  }

  function handleFechar() {
    setForm({ ...filtrosAtivos });
    setModalFiltro(false);
  }

  return (
    <Portal>
      <Modal
        visible={modalFiltro}
        onDismiss={handleFechar} 
        contentContainerStyle={style.modalContainer}
      >
        <FilterModalHeader
          tipoFiltro={tipoFiltro}
          setModal={setModalFiltro}
          onLimpar={limparFiltros}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <FilterArtistaForm
            form={form}
            setForm={setForm}
            modalFiltro={modalFiltro}
            resetCounter={resetCounter}
          />
          
          <Button
            mode="contained"
            style={style.applyButton}
            labelStyle={style.applyButtonLabel}
            onPress={handleAplicar}
          >
            Aplicar filtros
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
}