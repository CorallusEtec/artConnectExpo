import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    gap:35,
    backgroundColor: 'white',
    height: '100%'
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  titulo: {
    fontSize: 25,
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
    fontSize: 17,
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

  // toggle para tipo de contratante
  toggleContainer: {
    width: '80%',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10
  },

  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },

  toggleButtonActive: {
    backgroundColor: gStyles.azul[200],
    borderColor: gStyles.azul[200]
  },

  toggleButtonInactive: {
    backgroundColor: 'transparent',
    borderColor: gStyles.cinza[200]
  },

  toggleButtonText: {
    fontSize: 16,
    fontWeight: '600'
  },

  toggleButtonTextActive: {
    color: 'white'
  },

  toggleButtonTextInactive: {
    color: gStyles.azul[200]
  },

  picker: {
    backgroundColor: gStyles.cinza[200],
    borderColor: gStyles.cinza[200],
  }
});