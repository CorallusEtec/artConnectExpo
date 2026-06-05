import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Modal, Portal, TextInput, Button, IconButton } from "react-native-paper";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  escopo: string;

  filtroNome: string;
  setFiltroNome: (val: string) => void;
  filtroCidade: string;
  setFiltroCidade: (val: string) => void;
  filtroEstado: string;
  setFiltroEstado: (val: string) => void;
  filtroTipoUsuario: string;
  setFiltroTipoUsuario: (val: string) => void;
  filtroLegenda: string;
  setFiltroLegenda: (val: string) => void;
  filtroNomeAutor: string;
  setFiltroNomeAutor: (val: string) => void;
  filtroDataInicio: string;
  setFiltroDataInicio: (val: string) => void;
  filtroDataFim: string;
  setFiltroDataFim: (val: string) => void;
  executarBusca: () => void;
  limparTodosFiltros: () => void;
}

export default function FilterModal({
  visible,
  onClose,
  escopo,
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
}: FilterModalProps) {

  const lidarComAplicarFiltros = () => {
    executarBusca(); 
    onClose();      
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>Filtros Avançados</Text>
          <View style={styles.headerRight}>
            <Text style={styles.clearText} onPress={limparTodosFiltros}>Limpar filtros</Text>
            <IconButton icon="close" size={24} iconColor="#666" onPress={onClose} style={styles.closeButton} />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
       
          {escopo === "artista" || escopo === "usuario" ? (
            <View>
              <Text style={styles.label}>Nome do Usuário</Text>
              <TextInput 
                mode="outlined" 
                placeholder="Ex: Samuel" 
                style={styles.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#0B31A3"
                value={filtroNome}
                onChangeText={setFiltroNome}
              />

              <Text style={styles.label}>Cidade</Text>
              <TextInput 
                mode="outlined" 
                placeholder="Ex: São Paulo" 
                style={styles.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#0B31A3"
                value={filtroCidade}
                onChangeText={setFiltroCidade}
              />

              <Text style={styles.label}>Estado</Text>
              <TextInput 
                mode="outlined" 
                placeholder="Ex: SP" 
                style={styles.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#0B31A3"
                value={filtroEstado}
                onChangeText={setFiltroEstado}
              />

              <Text style={styles.label}>Tipo de Usuário</Text>
              <View style={styles.row}>
                {/* Botão Artista */}
                <Button 
                  mode={filtroTipoUsuario === "ARTISTA" ? "contained-tonal" : "outlined"} 
                  compact 
                  style={[styles.flex1, styles.typeButton]}
                  buttonColor={filtroTipoUsuario === "ARTISTA" ? "#E8EAF6" : undefined}
                  textColor={filtroTipoUsuario === "ARTISTA" ? "#0B31A3" : "#666"}
                  onPress={() => setFiltroTipoUsuario("ARTISTA")} 
                >
                  Artista
                </Button>

                {/* Botão Contratante */}
                <Button 
                  mode={filtroTipoUsuario === "CONTRATANTE" ? "contained-tonal" : "outlined"} 
                  compact 
                  style={[styles.flex1, styles.typeButton]}
                  buttonColor={filtroTipoUsuario === "CONTRATANTE" ? "#E8EAF6" : undefined}
                  textColor={filtroTipoUsuario === "CONTRATANTE" ? "#0B31A3" : "#666"}
                  onPress={() => setFiltroTipoUsuario("CONTRATANTE")} // Altera o estado global para "CONTRATANTE"
                >
                  Contratante
                </Button>
              </View>
            </View>
          ) : (
       
            <View>
              <Text style={styles.label}>Legenda</Text>
              <TextInput 
                mode="outlined" 
                placeholder="Palavra-chave..." 
                style={styles.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#0B31A3"
                value={filtroLegenda}
                onChangeText={setFiltroLegenda}
              />

              <Text style={styles.label}>Nome do Autor</Text>
              <TextInput 
                mode="outlined" 
                placeholder="Ex: André" 
                style={styles.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#0B31A3"
                value={filtroNomeAutor}
                onChangeText={setFiltroNomeAutor}
              />

              <View style={styles.row}>
                <View style={styles.flex1}>
                  <Text style={styles.label}>Data Início</Text>
                  <TextInput 
                    mode="outlined" 
                    placeholder="25/05/2026" 
                    style={styles.input} 
                    outlineColor="#E0E0E0" 
                    activeOutlineColor="#0B31A3" 
                    value={filtroDataInicio}
                    onChangeText={setFiltroDataInicio}
                  />
                </View>
                <View style={styles.flex1}>
                  <Text style={styles.label}>Data Fim</Text>
                  <TextInput 
                    mode="outlined" 
                    placeholder="30/05/2026" 
                    style={styles.input} 
                    outlineColor="#E0E0E0" 
                    activeOutlineColor="#0B31A3" 
                    value={filtroDataFim}
                    onChangeText={setFiltroDataFim}
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
            style={styles.applyButton}
            labelStyle={styles.applyButtonLabel}
            onPress={lidarComAplicarFiltros}
          >
            Aplicar filtros
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 24,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  clearText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "600",
  },
  closeButton: {
    margin: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#F9FAFB",
    marginBottom: 12,
    height: 48,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  flex1: {
    flex: 1,
  },
  typeButton: {
    borderRadius: 8,
  },
  applyButton: {
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 6,
  },
  applyButtonLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
});