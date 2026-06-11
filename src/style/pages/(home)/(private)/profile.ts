import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  navbar: {
    backgroundColor: gStyles.azul[500],
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  profile: {
    justifyContent: "center",
    alignItems: "center",
  },

  infosProfile: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  infoDuo: {
    alignItems: "center",
    justifyContent: "center",
  },

  infoLabel: {
    textAlign: "center",
    color: "white",
    fontWeight: "400",
  },

  infoValue: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    marginTop: 2,
  },

  botaoEdit: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
    marginBottom: 6,
  },

  paperButton: {
    backgroundColor: gStyles.azul[500],
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 20,
    minWidth: 130,
  },

  paperButtonLabel: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  fundo: {
    backgroundColor: gStyles.azul[500],
    paddingTop: 10,
    paddingBottom: 35,
    paddingHorizontal: 20,
  },

  bioContainer: {
    marginTop: 16,
    marginBottom: 6,
    paddingHorizontal: 6,
  },

  bioText: {
    color: "white",
    textAlign: "center",
    lineHeight: 20,
  },

  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "20%",
    marginTop: 12,
    margin: 8,
  },

  posts: {
    flex: 1,
    width: "100%",
  },
});
