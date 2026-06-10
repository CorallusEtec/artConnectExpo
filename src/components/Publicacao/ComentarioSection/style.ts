import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    padding: 5,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,

    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    marginTop: 400,
  },
  headerContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontWeight: "medium",
  },
});
