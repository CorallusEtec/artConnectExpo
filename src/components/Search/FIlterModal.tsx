import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Modal, Portal, TextInput, Button, IconButton } from "react-native-paper";
import { style } from "./modal.style";

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

  const formatarData = (texto: string) => {
  
    const numeros = texto.replace(/\D/g, "");

    
    const numerosLimitados = numeros.slice(0, 8);

    if (numerosLimitados.length <= 2) {
      return numerosLimitados;
    }
    if (numerosLimitados.length <= 4) {
      return `${numerosLimitados.slice(0, 2)}/${numerosLimitados.slice(2)}`;
    }
    return `${numerosLimitados.slice(0, 2)}/${numerosLimitados.slice(2, 4)}/${numerosLimitados.slice(4, 8)}`;
  };

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
                value={filtroNome}
                onChangeText={setFiltroNome}
              />

              <Text style={style.label}>Cidade</Text>
              <TextInput 
                mode="outlined" 
                placeholder="Ex: São Paulo" 
                style={style.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#0B31A3"
                value={filtroCidade}
                onChangeText={setFiltroCidade}
              />

              <Text style={style.label}>Estado</Text>
              <TextInput 
                mode="outlined" 
                placeholder="Ex: SP" 
                style={style.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#0B31A3"
                value={filtroEstado}
                onChangeText={setFiltroEstado}
              />

              <Text style={style.label}>Tipo de Usuário</Text>
              <View style={style.row}>
                {/* Botão Artista */}
                <Button 
                  mode={filtroTipoUsuario === "ARTISTA" ? "contained-tonal" : "outlined"} 
                  compact 
                  style={[style.flex1, style.typeButton]}
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
                  style={[style.flex1, style.typeButton]}
                  buttonColor={filtroTipoUsuario === "CONTRATANTE" ? "#E8EAF6" : undefined}
                  textColor={filtroTipoUsuario === "CONTRATANTE" ? "#0B31A3" : "#666"}
                  onPress={() => setFiltroTipoUsuario("CONTRATANTE")} 
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
                value={filtroLegenda}
                onChangeText={setFiltroLegenda}
              />

              <Text style={style.label}>Nome do Autor</Text>
              <TextInput 
                mode="outlined" 
                placeholder="Ex: André" 
                style={style.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#0B31A3"
                value={filtroNomeAutor}
                onChangeText={setFiltroNomeAutor}
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
                    value={filtroDataInicio}
                    onChangeText={(txt) => setFiltroDataInicio(formatarData(txt))}
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
                    value={filtroDataFim}
                    onChangeText={(txt) => setFiltroDataFim(formatarData(txt))}
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
            onPress={lidarComAplicarFiltros}
          >
            Aplicar filtros
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
}
