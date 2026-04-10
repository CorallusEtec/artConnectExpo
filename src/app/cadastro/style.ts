import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    gap:20
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
    gap: 5
  },
});
