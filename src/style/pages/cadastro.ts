import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "white",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },

  titulo: {
    fontSize: 20,
  },

  titleContainer: {
    gap: 25,
    marginBottom: 20,
  },

  formContainer: {
    alignItems: "center",
    paddingBottom: 100,
  },

  tipoContaGroup: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
  },

  // relacionado aos inputs
  inputGroup: {
    width: "80%",
  },

  // relacionado aos botões
  btnGroup: {
    marginTop: 10,
    width: "80%",
    gap: 20,
  },
});
