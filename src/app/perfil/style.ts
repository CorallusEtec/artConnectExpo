import { gStyles } from "@/style/gStyle";
import iconSet from "@expo/vector-icons/build/Fontisto";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    gap: 5,
    flex: 1,
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
    height: 92,
    width: 92,
    borderRadius: "100%",
  },

  nomeProfile: {
    width: 150,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
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
    marginTop: 10,
    width: 100,
    height: 100,
  },

  users: {
    marginTop: 30,
    flexDirection: "row",
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
    height: "10%",
    width: "100%",
  },

  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: '30%',
    margin: 25
  },

  posts: {
    flexDirection: "row",
  },
  thumb: {
    width: '33%',
    height: 200
  },
});