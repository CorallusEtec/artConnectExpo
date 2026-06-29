import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  // views principais
  container: {
    paddingTop: 50,
    backgroundColor: "#ffffff",
    flex: 1,
    gap: 10,
  },
  view1: {
    gap: 20,
    alignItems: "center",
  },

  // linha divisão
  linhaOuWrapper: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  linhaOu: {
    width: "40%",
    height: 1,
    backgroundColor: "#9b9b9b",
  },

  // inputs
  inputWrapper: {
    width: "85%",
  },

  // tamanho pros textos sem detalhes especificos
  textoPadrão: {
    fontSize: 15,
  },
  titulo: {
    fontSize: 24,
  },
  textoDetalhe: {
    fontSize: 13,
  },

  pageTitle: {
    fontWeight: 600,
    color: "#1A1A1A",
    marginBottom: 2,
    fontSize: 22,
  },

  input: {
    height: 45,
  },

  button: {
    height: 45, 
    borderRadius: 8, 
  },
});
