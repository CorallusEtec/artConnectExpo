import { gStyles } from "@/style/gStyle"
import { StyleSheet } from "react-native"
export const style = StyleSheet.create({
    modalContainer: {
    backgroundColor: "white",
    padding: 24,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
  },
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
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#F9FAFB",
    marginBottom: 12,
    height: 48,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  flex1: {
    flex: 1,
  },
  typeButton: {
    borderRadius: 8,
  },
  applyButton: {
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 6,
  },
  applyButtonLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
})