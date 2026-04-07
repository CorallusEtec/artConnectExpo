import { gStyles } from "@/app/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    gap: 7,
    padding: 6,
    borderRadius: 7,
    flexDirection: "row",
    backgroundColor: gStyles.cinza[200],
  },
  input: {
    width: "100%",
  },
});
