import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  img: {
    marginTop: 5,
    borderRadius: 0,
  },

  audioCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ccc",
    marginTop: 5,
  },

  audioText: {
    fontSize: 14,
    color: "#444",
  },

  audioPlayer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    backgroundColor: "#f5f5f5",
  },

  audioBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: gStyles.azul[200],
    alignItems: "center",
    justifyContent: "center",
  },

  audioBtnIcon: {
    color: "#fff",
    fontSize: 18,
  },

  audioBarWrapper: {
    flex: 1,
    gap: 4,
  },

  audioBarBg: {
    height: 10,
    justifyContent: "center",
    borderRadius: 2,
    overflow: "hidden",
  },

  audioBarFill: {
    height: 4,
    backgroundColor: gStyles.azul[200],
    borderRadius: 2,
  },

  audioTempos: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  audioTempoText: {
    fontSize: 11,
    color: "#888",
  },
});
