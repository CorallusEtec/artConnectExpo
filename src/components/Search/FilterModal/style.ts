import { StyleSheet } from "react-native";
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
    maxHeight: "92%",
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
});