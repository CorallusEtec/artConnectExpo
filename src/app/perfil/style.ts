import { gStyles } from "@/style/gStyle";
import iconSet from "@expo/vector-icons/build/Fontisto";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    padding: 5,
    gap: 5,
    flex: 1,
  },

  navbarMom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 7,
    borderBottomWidth: 1,
    borderBottomColor: gStyles.cinza[100],
  },
  navbarSon1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 7,
    borderBottomWidth: 1,
    borderBottomColor: gStyles.cinza[100],
  },
  navbarSon2: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 7,
    borderBottomWidth: 1,
    borderBottomColor: gStyles.cinza[100],
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
    width: 125,
    textAlign: "center",
    fontSize: 18
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