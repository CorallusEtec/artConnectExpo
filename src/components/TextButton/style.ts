import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  containerPrimary: {
    paddingVertical: 5,
    backgroundColor: gStyles.azul[500],
    borderRadius: 3,
    alignItems: "center",
    width: "70%",
  },
  textPrimary: {
    color: "#fff",
    fontWeight: "600",
  },

  containerSecondary: {
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: gStyles.azul[200],
    borderRadius: 4,
    alignItems: "center",
    width: "70%",
  },
  textSecondary: {
    color: gStyles.azul[500],
    fontWeight: "600",
  },
});
