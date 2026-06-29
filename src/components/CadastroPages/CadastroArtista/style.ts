import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 25,
    gap: 6,
  },

  title: {
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    opacity: 0.6,
    textAlign: "center",
  },

  section: {
    marginBottom: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  card: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f7f7f7",
    marginTop: 10,
  },

  chipSection: {
    alignItems: "center",
    marginVertical: 10,
  },

  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  footer: {
    marginTop: "auto",
    paddingVertical: 20,
  },

  button: { 
    borderRadius: 8, 
  },
});