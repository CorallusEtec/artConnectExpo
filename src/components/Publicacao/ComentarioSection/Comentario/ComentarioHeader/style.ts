import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionContainer: {
    flexDirection: "row",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  metadataPubli: {
    justifyContent: "flex-end",
  },
  autorLabel: {
    fontWeight: "500",
  },
  publishDateLabel: {
    fontSize: 13,
    fontWeight: "400",
  },
});
