import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fff",
  },

  titleContainer: {
    alignItems: "center",
  },

  avatarViewContainer: {
    marginTop: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    height: 45,
  },

  avatarContainer: {
    alignItems: "center",
    width: 50

  },
  avatarActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  enderencoContainer: {
    paddingHorizontal: 20,
    gap: 7
  },

  button: {
    height: 48, 
    borderRadius: 8, 
    width: '90%'
  },

  btnGroup: {
    marginTop: 12,
    alignItems: 'center'
  },

  cepRow: { flexDirection: "row", justifyContent: "space-between" },
  actionsContainer: {
    marginTop: 20,
    paddingBottom: 40,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
