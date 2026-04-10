import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    gap:25,
    backgroundColor: 'white'
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold'
  },

  // relacionado aos inputs
  inputContainer: {
    gap:15,
    alignItems: 'center',
  },

  inputWrapper: {
    width: '80%',
    gap: 5
  },

  label: {
    fontSize: 20,
    fontWeight: '500'
  },

  // relacionado aos botões
  btnContainer: {
    gap:15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  btnWrapper: {
    width: '38%',
    gap: 5,
  },

  // relacionado ao picker
  picker: {
    padding: 6,
    fontSize: 15,
    borderRadius: 7,
    backgroundColor: gStyles.cinza[200],
    borderColor: gStyles.azul[200]
  }
});
