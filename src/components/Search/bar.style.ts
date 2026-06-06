import { gStyles } from "@/style/gStyle"
import { StyleSheet } from "react-native"
export const style = StyleSheet.create({
      row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#F5F5F5",
  },
  filterButton: {
    borderRadius: 8,
    margin: 0,
    height: 50,
    width: 50,
  },
})