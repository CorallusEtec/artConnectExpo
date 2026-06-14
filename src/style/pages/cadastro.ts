import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },

  btnGroup: {
    width: "80%",
    gap: 20,
  },
});
