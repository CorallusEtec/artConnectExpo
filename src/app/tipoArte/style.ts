import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    gap:110,
    backgroundColor: 'white',
    height: '100%',
  },

    label: {
    fontSize: 18,
    fontFamily: "Inter_400Regular",
  },

  pickerContainer: {
    alignItems: 'center',
  },

  picker: {
    width: '100%',
    fontSize: 15,
    borderRadius: 7,
    backgroundColor: gStyles.cinza[200],
    borderColor: gStyles.cinza[200],
    fontFamily: "Inter_400Regular",
  },

  bottomPage: {
    alignItems: 'center',
    gap: 20,
  },
  
    btnContainer: {
    gap:15,
    alignItems: 'center',
  },

  btnWrapper: {
    width: '50%',
    gap: 5,
  },

//   texto

  textContainer: {
    alignItems: 'center',
    marginTop: 100,
  },

  titulo: {
    fontSize: 32,
    color: '#6b7280',
    fontFamily: "Inter_400Regular",
  },

  subTitulo: {
    fontSize: 20,
    width: '85%',
    textAlign: 'center',
    color: '#6b7280',
    fontFamily: "Inter_400Regular",
  },
});


