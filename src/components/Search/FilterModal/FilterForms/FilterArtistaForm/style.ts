import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F9FAFB",
    height: 48,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  ufContainer: {
    width: 72,
  },
  menuAnchor: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    height: 48,
  },
  menuTextSelected: {
    color: "#111827",
    fontSize: 14,
  },
  menuTextPlaceholder: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  chipsScroll: {
    marginBottom: 4,
  },
  chipsRow: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    borderColor: "#0B31A3",
  },
  chipSelected: {
    backgroundColor: "#0B31A3",
  },
});