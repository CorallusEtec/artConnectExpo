import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  containerPrimary: {
    paddingVertical: 5,
    backgroundColor: gStyles.azul[200],
    borderRadius: 7,
    alignItems: "center",
  },
  textPrimary: {
    fontFamily: "Inter_300Light",
    color: "#fff",
    fontWeight: "600",
  },

  containerSecondary: {
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: gStyles.azul[200],
    borderRadius: 7,
    alignItems: "center",
  },
  textSecondary: {
    fontFamily: "Inter_300Light",
    color: gStyles.azul[200],
    fontWeight: "600",
  },
});
