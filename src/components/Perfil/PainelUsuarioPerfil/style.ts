import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  fundo: {
    paddingTop: 10,
    paddingBottom: 35,
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  profile: {
    flexShrink: 1,
    flexGrow: 0,
    alignItems: "center",
    paddingRight: 12,
  },

  nomeLabel: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    fontSize: 15,
    marginTop: 6,
    flexShrink: 1,
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
    flexShrink: 0,
    minWidth: 150,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },

  infoDuoTouchable: {
    borderRadius: 8,
    marginLeft: 10,
  },

  infoDuo: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 2,
  },

  infoLabel: {
    textAlign: "center",
    color: "white",
    fontWeight: "400",
  },

  infoValue: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    marginTop: 2,
  },

  contatosContainer: {
    marginTop: 10,
    paddingHorizontal: 6,
    gap: 6,
  },

  contatoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  contatoText: {
    color: "white",
    fontSize: 13,
  },

  artInfoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    paddingHorizontal: 6,
  },

  artChip: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
  },

  artChipText: {
    color: "white",
    fontSize: 12,
    marginVertical: 0,
  },

});