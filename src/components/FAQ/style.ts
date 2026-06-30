import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  categoriaSection: {
    marginBottom: 8,
    borderRadius: 10,
  },
  categoriaLabel: {
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
    marginLeft: 4,
  },
  listSection: {
    marginTop: 0,
    borderRadius: 10,
    padding: 0,
  },
  accordion: {
    backgroundColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 6,
    overflow: "hidden",
  },
  pergunta: {
    fontSize: 14,
    fontWeight: "500",
  },
  resposta: {
    fontSize: 13,
    lineHeight: 20,
  },
});
