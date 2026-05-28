import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: gStyles.azul[200],
  },

  linhaAvatar: {
    alignItems: "center",
    marginVertical: 8,
  },

  avatarContainer: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: gStyles.cinza[100],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    overflow: "hidden",
  },

  editarAvatar: {
    position: "absolute",
    right: 40,
    top: 60,
    backgroundColor: gStyles.azul[200],
    padding: 8,
    borderRadius: 20,
  },

  headerProfile: {
    width: 92,
    height: 92,
    borderRadius: 46,
  },

  label: {
    color: gStyles.cinza[500],
    marginTop: 6,
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
  },

  textarea: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  linha: {
    flexDirection: "row",
    gap: 10,
  },

  botaoSalvar: {
    backgroundColor: gStyles.azul[200],
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 14,
  },

  textoSalvar: {
    color: "#fff",
    fontWeight: "bold",
  },

  contatoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  contatoInput: {
    flex: 1,
    marginRight: 8,
  },

  botaoAdicionarContato: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: gStyles.azul[200],
    padding: 12,
    borderRadius: 10,
  },

  textoAdicionarContato: {
    color: "#fff",
    fontWeight: "bold",
  },
});