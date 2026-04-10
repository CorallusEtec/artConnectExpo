import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  root: {
    borderBottomWidth: 1,
    borderBottomColor: gStyles.cinza[200],
  },

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
    gap: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  header: {
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
  },

  headerActionsContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },

  contentTextContainer: {
    padding: 7,
  },
  contentTextText: {
    fontWeight: "500",
    color: gStyles.cinza[600],
    fontSize: 17,
  },

  img: {
    width: "100%",
    height: "auto",
    aspectRatio: 16 / 9,
    resizeMode: "contain",
  },

  actionsRoot: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 7,
    padding: 5,
  },
  actionsGroup: {
    flexDirection: "row",
    gap: 7,
  },

  postActionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
