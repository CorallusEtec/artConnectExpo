import { gStyles } from "@/style/gStyle";
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
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    marginBottom: 6,
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
    paddingTop: 18,
    paddingBottom: 26,
    paddingHorizontal: 16,
  },

  bioContainer: {
    marginTop: 8,
    marginBottom: 6,
    paddingHorizontal: 6,
  },

  bioText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
  },

  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: '20%',
    marginTop: 12,
    margin: 8,
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
});