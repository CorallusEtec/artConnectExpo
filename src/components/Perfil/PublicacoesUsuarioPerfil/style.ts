import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },

  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 12,
    paddingHorizontal: 4,
  },

  postFlatContainer: {
    padding: 12,
  },

  postContentContainer: {
    gap: 12,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 32,
    marginBottom: 20,
  },
});