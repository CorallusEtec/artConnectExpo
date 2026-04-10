import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    padding: 5,
    gap: 5,
    flex: 1,
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
});
