import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    gap: 35,
    backgroundColor: "white",
    height: "100%",
  },

  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  titulo: {
    fontSize: 25,
    fontWeight: "bold",
  },

  // relacionado aos inputs
  inputContainer: {
    gap: 17,
    alignItems: "center",
  },

  inputWrapper: {
    width: "80%",
    gap: 5,
  },

  label: {
    fontSize: 17,
    fontWeight: "500",
  },

  // relacionado aos botões
  btnContainer: {
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  btnWrapper: {
    width: "45%",
    gap: 5,
  },

  // relacionado ao picker
  picker: {
    width: "100%",
    fontSize: 15,
    borderRadius: 7,
    backgroundColor: gStyles.cinza[200],
    borderColor: gStyles.cinza[200],
  },
});
