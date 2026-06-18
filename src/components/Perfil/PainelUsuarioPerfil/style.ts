import { ArtConnectColorTheme } from "@/style/appTheme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  fundo: {
    backgroundColor: ArtConnectColorTheme.colors.primary,
    paddingTop: 10,
    paddingBottom: 35,
    paddingHorizontal: 20,
  },
  profile: {
    justifyContent: "center",
    alignItems: "center",
  },
  bioContainer: {
    marginTop: 16,
    marginBottom: 6,
    paddingHorizontal: 6,
  },

  bioText: {
    color: "white",
    textAlign: "center",
    lineHeight: 20,
  },

  infosProfile: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLabel: {
    textAlign: "center",
    color: "white",
    fontWeight: "400",
  },
  infoDuo: {
    alignItems: "center",
    justifyContent: "center",
  },

  infoValue: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    marginTop: 2,
  },
});
