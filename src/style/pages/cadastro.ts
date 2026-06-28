import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 6,
  },

  formContainer: {
    marginTop: 20,
    flex: 1,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },

  pageTitle: {
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 2,
    fontSize: 22,
  },

  subtitle: {
    color: "#666666",
    marginBottom: 12,
    fontSize: 14,
  },

  tipoContaContainer: {
    marginBottom: 24,
  },

  tipoContaLabel: {
    color: "#333333",
    marginBottom: 4,
    fontWeight: "500",
    fontSize: 14,
  },

  tipoContaOptions: {
    flexDirection: "row",
    gap: 8,
  },

  tipoContaOption: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#666666",
    alignItems: "center",
    justifyContent: "center",
  },

  optionText: {
    color: "#666666",
    fontWeight: "500",
    fontSize: 14,
  },

  input: {
    height: 45,
  },

  button: {
    height: 48, 
    borderRadius: 8, 
  },

  senhaHelper: {
    color: "#666666",
    fontSize: 10,
    marginTop: 0,
    marginLeft: 4,
  },

  btnGroup: {
    marginTop: 12,
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginTop: 12,
    marginBottom: 6,
  },

  loginText: {
    color: "#666666",
    fontSize: 13,
  },

  linhaOuWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 18,
  },

  linhaOu: {
    flex: 1,
    height: 1,
    backgroundColor: "#D9D9D9",
  },

  textoOu: {
    marginHorizontal: 14,
    color: "#9B9B9B",
    fontSize: 14,
  },

  tipoContaContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});