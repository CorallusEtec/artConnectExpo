import { StyleSheet } from "react-native";
import { gStyles } from "@/style/gStyle";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    gap: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: gStyles.azul[200],
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    minHeight: 120,
    textAlignVertical: "top",
  },

  mediaButton: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  mediaButtonText: {
    color: "#333",
    fontWeight: "500",
  },

  preview: {
    marginTop: 10,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },

  postar: {
    backgroundColor: gStyles.azul[200],
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  postarText: {
    color: "#fff",
    fontWeight: "bold",
  },

  attach: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  paddingVertical: 6,
  paddingHorizontal: 10,
  alignSelf: "flex-start",
},

attachText: {
  color: gStyles.cinza[600],
  fontSize: 14,
},
});