import { gStyles } from "@/style/gStyle";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  headerProfile: {
    height: 32,
    width: 32,
    borderRadius: 100,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: gStyles.cinza[600],
  },

  headerContainer: {
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  header: {
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
  },

  headerActionsContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },


  contentContainer: {
    padding: 5,
  },
  messageContainer: {
    marginBottom: 10
  },
  contentActionsContainer: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: gStyles.cinza[200],
    
    flexDirection: "row",
    alignItems: "center",
    gap: 20
  }
})