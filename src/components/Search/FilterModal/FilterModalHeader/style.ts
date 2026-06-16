import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  clearText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "600",
  },
  closeButton: {
    margin: 0,
  },
});
