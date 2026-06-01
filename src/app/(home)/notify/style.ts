import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    padding: 5,
    gap: 5,
    flex: 1,
  },

  pic: {
    height: 52,
    width: 52,
    borderRadius: 100,
  },
  // No seu StyleSheet
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    color: gStyles.cinza[500],
  },
  subtitle: {
    color: gStyles.cinza[500],
    fontSize: 14,
  },

  notifs: {
    fontWeight: "bold",
    fontSize: 16,
    color: gStyles.cinza[500],
    textAlign: "center",
  },
});
