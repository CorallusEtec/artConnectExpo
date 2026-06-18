import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fff",
  },

  titleContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  avatarViewContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-around",
    gap: 50,
  },

  avatarContainer: {
    alignItems: "center",
  },
  avatarActionsContainer: {
    justifyContent: "space-between",
  },
  enderencoContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  cepRow: { flexDirection: "row", justifyContent: "space-between" },
  actionsContainer: {
    marginTop: 20,
    paddingBottom: 40,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
