import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Modal, Portal, TextInput, Button, IconButton } from "react-native-paper";
import { style } from "./modal.style";
import { AppUtils } from "../../services/AppUtils";
import { FiltrosState, FilterModalProps } from "./types";

const executarAcaoFiltrar = (executarBusca: () => void, onClose: () => void) => {
  executarBusca();
  onClose();
};
const modificarCampoObjeto = (
  setFiltros: React.Dispatch<React.SetStateAction<FiltrosState>>,
  campo: keyof FiltrosState,
  valor: string
) => {
  setFiltros((prevState) => ({
    ...prevState,
    [campo]: valor,
  }));
};

export default function FilterModal({
  visible,
  onClose,
  escopo,
  filtros,
  setFiltros,
  executarBusca,
  limparTodosFiltros,
}: FilterModalProps) {

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={style.modalContainer}
      >
        {/* Cabeçalho */}
        <View style={style.header}>
          <Text style={style.title}>Filtros Avançados</Text>
          <View style={style.headerRight}>
            <Text style={style.clearText} onPress={limparTodosFiltros}>Limpar filtros</Text>
            <IconButton icon="close" size={24} iconColor="#666" onPress={onClose} style={style.closeButton} />
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {escopo === "artista" || escopo === "usuario" ? (
            <View>
              <Text style={style.label}>Nome do Usuário</Text>
              <TextInput 
                mode="outlined" 
                placeholder="Ex: Samuel" 
                style={style.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#0B31A3"
                value={filtros.nome}
                onChangeText={(txt) => modificarCampoObjeto(setFiltros, "nome", txt)}
              />
              <Text style={style.label}>Cidade</Text>
              <TextInput 
                mode="outlined" 
                placeholder="Ex: São Paulo" 
                style={style.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#0B31A3"
                value={filtros.cidade}
                onChangeText={(txt) => modificarCampoObjeto(setFiltros, "cidade", txt)}
              />
              <Text style={style.label}>Estado</Text>
              <TextInput 
                mode="outlined" 
                placeholder="Ex: SP" 
                style={style.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#0B31A3"
                value={filtros.estado}
                onChangeText={(txt) => modificarCampoObjeto(setFiltros, "estado", txt)}
              />
              <Text style={style.label}>Tipo de Usuário</Text>
              <View style={style.row}>
                <Button 
                  mode={filtros.tipoUsuario === "ARTISTA" ? "contained-tonal" : "outlined"} 
                  compact 
                  style={[style.flex1, style.typeButton]}
                  buttonColor={filtros.tipoUsuario === "ARTISTA" ? "#E8EAF6" : undefined}
                  textColor={filtros.tipoUsuario === "ARTISTA" ? "#0B31A3" : "#666"}
                  onPress={() => modificarCampoObjeto(setFiltros, "tipoUsuario", "ARTISTA")} 
                >
                  Artista
                </Button>

                <Button 
                  mode={filtros.tipoUsuario === "CONTRATANTE" ? "contained-tonal" : "outlined"} 
                  compact 
                  style={[style.flex1, style.typeButton]}
                  buttonColor={filtros.tipoUsuario === "CONTRATANTE" ? "#E8EAF6" : undefined}
                  textColor={filtros.tipoUsuario === "CONTRATANTE" ? "#0B31A3" : "#666"}
                  onPress={() => modificarCampoObjeto(setFiltros, "tipoUsuario", "CONTRATANTE")} 
                >
                  Contratante
                </Button>
              </View>
            </View>
          ) : (
            <View>
              <Text style={style.label}>Legenda</Text>
              <TextInput 
                mode="outlined" 
                placeholder="Palavra-chave..." 
                style={style.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#0B31A3"
                value={filtros.legenda}
                onChangeText={(txt) => modificarCampoObjeto(setFiltros, "legenda", txt)}
              />
              <Text style={style.label}>Nome do Autor</Text>
              <TextInput 
                mode="outlined" 
                placeholder="Ex: André" 
                style={style.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#0B31A3"
                value={filtros.nomeAutor}
                onChangeText={(txt) => modificarCampoObjeto(setFiltros, "nomeAutor", txt)}
              />
              <View style={style.row}>
                <View style={style.flex1}>
                  <Text style={style.label}>Data Início</Text>
                  <TextInput 
                    mode="outlined" 
                    placeholder="25/05/2026" 
                    keyboardType="numeric"
                    style={style.input} 
                    outlineColor="#E0E0E0" 
                    activeOutlineColor="#0B31A3" 
                    value={filtros.dataInicio}
                    onChangeText={(txt) => modificarCampoObjeto(setFiltros, "dataInicio", AppUtils.formatarData(txt))}
                  />
                </View>
                <View style={style.flex1}>
                  <Text style={style.label}>Data Fim</Text>
                  <TextInput 
                    mode="outlined" 
                    placeholder="30/05/2026" 
                    keyboardType="numeric"
                    style={style.input} 
                    outlineColor="#E0E0E0" 
                    activeOutlineColor="#0B31A3" 
                    value={filtros.dataFim}
                    onChangeText={(txt) => modificarCampoObjeto(setFiltros, "dataFim", AppUtils.formatarData(txt))}
                  />
                </View>
              </View>
            </View>
          )}
          {/* Botão de Ação */}
          <Button 
            mode="contained" 
            buttonColor="#2563EB" 
            textColor="#FFF"
            style={style.applyButton}
            labelStyle={style.applyButtonLabel}
            onPress={() => executarAcaoFiltrar(executarBusca, onClose)}
          >
            Aplicar filtros
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
}