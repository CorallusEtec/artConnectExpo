import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  root: {},

  headerProfile: {
    height: 32,
    width: 32,
    borderRadius: "100%",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: gStyles.cinza[600],
  },

  headerContainer: {
    alignItems: "center",
    gap: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: gStyles.cinza[200],
  },

  header: {
    alignItems: "center",
    gap: 5,
    flexDirection: "row",
  },

  headerActionsContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
});
