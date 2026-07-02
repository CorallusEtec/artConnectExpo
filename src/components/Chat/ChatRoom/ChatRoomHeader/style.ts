import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",
  },
  leftActionContainer: {
    flexDirection: "row",
    gap: 10,
    width: "80%",
    alignItems: "center",
  },
  content: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
