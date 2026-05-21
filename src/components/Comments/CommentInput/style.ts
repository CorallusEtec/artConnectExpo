import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    backgroundColor: gStyles.cinza[100],
    borderRadius: 14

  },

  input: {
    width: "85%",
    padding: 2
  },

  actionsContainer: {

    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },

  // SEND BUTTON THEMES

  sendBtnEnable: {
    backgroundColor: gStyles.azul[400],
    padding: 5,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: "center",

    borderRadius: 12
  },
  sendBtnDisable: {
    backgroundColor: gStyles.cinza[300],
    padding: 5,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: "center",

    borderRadius: 12
  },

  // ICON THEMES
  sendIconEnable: {
    aspectRatio: 1,
    color: gStyles.cinza[0],
    textAlign: "center",
  },
  sendIconDisable: {
    aspectRatio: 1,
    color: gStyles.cinza[0],
    textAlign: "center",
  }
});
