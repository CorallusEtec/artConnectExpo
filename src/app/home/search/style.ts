import { gStyles } from "@/style/gStyle";
import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const style = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    flex: 1,
    backgroundColor: "#FFFFFF", // ou gStyles.branco se houver
  },

  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 7,
    borderBottomWidth: 1,
    borderBottomColor: gStyles.cinza[100],
  },

  banner: {
    width: 150,
    maxHeight: 50,
    resizeMode: "contain",
  },

  // SEÇÃO DE PESQUISA SUPERIOR
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  inputPesquisa: {
    flex: 1,
    height: 48,
    backgroundColor: gStyles.cinza[100],
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: gStyles.cinza[500], // Ajuste conforme os índices do seu gStyles
  },

  botaoFiltro: {
    width: 48,
    height: 48,
    backgroundColor: gStyles.cinza[100],
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  // BOTÃO DE BUSCAR PRINCIPAL
  botaoBuscarPrincipal: {
    backgroundColor: "#113093", // Azul escuro do seu print
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotaoBuscar: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  // CARD DE RESULTADOS (Cinza do mockup)
  cardResultado: {
    backgroundColor: gStyles.cinza[300], // Tom de cinza para os cards desativados/mockup
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  tituloCard: {
    fontSize: 16,
    fontWeight: "bold",
    color: gStyles.cinza[500],
  },

  subtituloCard: {
    fontSize: 14,
    color: gStyles.cinza[600],
    marginTop: 4,
  },

  // ESTRUTURA DO MODAL DE FILTROS AVANÇADOS
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  modalConteudo: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: height * 0.85,
    gap: 16,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: gStyles.cinza[500],
  },

  textoLimpar: {
    color: "#EF4444", // Vermelho padrão para ações de limpar/deletar
    fontSize: 14,
    fontWeight: "600",
  },

  labelFiltro: {
    fontSize: 14,
    fontWeight: "600",
    color: gStyles.cinza[500],
    marginTop: 12,
    marginBottom: 6,
  },

  modalInput: {
    backgroundColor: gStyles.cinza[50],
    borderWidth: 1,
    borderColor: gStyles.cinza[200],
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 12,
    fontSize: 15,
    color: gStyles.cinza[500],
  },

  // BOTÕES INTERNOS DE SELEÇÃO (Tipo de Usuário)
  containerBotoesTipo: {
    flexDirection: "row",
    gap: 12,
  },

  botaoTipo: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: gStyles.cinza[300],
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: gStyles.cinza[50],
  },

  botaoTipoAtivo: {
    backgroundColor: "#2563EB", // Azul de destaque
    borderColor: "#2563EB",
  },

  textoBotaoTipo: {
    color: gStyles.cinza[500],
    fontWeight: "500",
  },

  textoBotaoTipoAtivo: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  // BOTÃO APLICAR FILTROS (Azul Royal inferior do modal)
  botaoAplicar: {
    backgroundColor: "#2563EB",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  textoBotaoAplicar: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});