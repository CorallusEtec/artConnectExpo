import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 7,
    padding: 6,
    borderRadius: 7,
    flexDirection: "row",
    backgroundColor: gStyles.cinza[200],
  },
  input: {
    width: "80%",
  },
});
