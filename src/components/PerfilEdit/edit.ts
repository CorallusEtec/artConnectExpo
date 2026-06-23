import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    gap: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  linhaAvatar: {
    alignItems: "center",
    marginVertical: 8,
  },

  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: gStyles.cinza[100],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },

  iniciaisAvatar: {
    fontSize: 28,
    fontWeight: "bold",
    color: gStyles.cinza[600],
  },

  editarAvatar: {
    position: "absolute",
    right: 40,
    top: 60,
    padding: 8,
    borderRadius: 20,
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
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 14,
  },

  textoSalvar: {
    color: "#fff",
    fontWeight: "bold",
  },

  headerProfile: {
    height: 92,
    width: 92,
    borderRadius: "100%",
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
  },

  textoAdicionarContato: {
    color: "#fff",
    fontWeight: "bold",
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },

  chip: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },

  chipSelected: {
    backgroundColor: gStyles.azul[200],
    borderColor: gStyles.azul[200],
  },

  chipText: {
    color: "#333",
  },

  chipTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
});