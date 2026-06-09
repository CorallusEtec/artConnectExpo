import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    paddingTop: 50,
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
    fontSize: 22,
    fontWeight: "medium",
  },

  inputContainer: {
    alignItems: "center",
  },
  // relacionado aos inputs
  inputGroup: {
    width: "80%",
    gap: 10,
  },

  label: {
    fontSize: 14,
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
    borderColor: gStyles.cinza[200],
  },
});
