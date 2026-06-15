import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  paperButton: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 20,
  },
  botaoEditContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
    marginBottom: 6,
  },
  paperButtonLabel: {
    color: "white",
    fontSize: 14,
    fontWeight: "medium",
  },

  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "20%",
    marginTop: 12,
    margin: 8,
  },
  posts: {
    flex: 1,
    width: "100%",
  },
});
