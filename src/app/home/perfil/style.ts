import { gStyles } from "@/style/gStyle";
import iconSet from "@expo/vector-icons/build/Fontisto";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    gap: 5,
    flex: 1,
    backgroundColor: 'white'
  },

  navbarMom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 7,
    backgroundColor: gStyles.azul[500],
  },
  navbarSon1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 7,
  },
  navbarSon2: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 7,
  },

  banner: {
    width: 150,
    maxHeight: 50,
    resizeMode: "contain",
  },

  headerProfile: {
    marginHorizontal: 10,
    height: 92,
    width: 92,
    borderRadius: "100%",
  },

  nomeProfile: {
    width: 175,
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 25
  },

  profile: {
    width: 300,
    height: 25,
    flexDirection: "row",
  },

  infosProfile: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 12.5,
  },

  infoDuo: {
    justifyContent: "center",
    alignContent: "center",
  },

  info: {
    width: 100,
    textAlign: "center",
    fontSize: 18,
    color: "white"
  },

  botaoEdit: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1
  },

  users: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  user: {
    height: 72,
    width: 72,
    borderRadius: "100%",
  },

  fundo: {
    backgroundColor: gStyles.azul[500],
  },

  onda: {
    marginTop: 90,
    height: "10%",
    width: "100%",
    position: "absolute",
    backgroundColor: gStyles.azul[500],
  },

  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: '30%',
    marginTop: 50,
    margin: 15,
  },

  posts: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  thumb: {
    width: '100%',
    height: 160,
    margin: 4
  },

  shadow: {
    flex: 1,
    backgroundColor: 'rgba(0,0,100,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleModal: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 20
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 55,
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 5,
  },
  modalBotao: {
    backgroundColor: gStyles.azul[500],
    width: 100,
    borderRadius: 8,
    padding: 4,
    marginBottom: 25,
  },
  modalFechar: {
    backgroundColor: gStyles.azul[500],
    width: 100,
    borderRadius: 8,
    padding: 4,
  },
  modalText: {
    fontWeight: 600,
    color: "#fff",
    textAlign: "center",
  },
  textInput: {
    textAlign: "center",
    backgroundColor: "#c0c0c0",
    borderRadius: 8,
    width: 150,
    padding: 4,
  },
  textInputEdit: {
    backgroundColor: "#c0c0c0",
    borderRadius: 8,
    width: 150,
    padding: 4,
  },
});