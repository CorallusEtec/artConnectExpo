import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  fundo: {
    paddingTop: 16,
    paddingBottom: 28,
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, 
  },

  avatarWrapper: {
    alignItems: "center",
    flexShrink: 0,
    width: 120, 
  },

  avatarBorder: {
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: 'white',
    padding: 3,
  },

  nomeLabel: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
    marginTop: 6,
    textAlign: "center",
    flexWrap: "wrap",
    maxWidth: 120, 
  },

  tipoContaLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
  },

  statsRow: {
    flexDirection: "row",
    gap: 4, 
    flexShrink: 1,
  },

  statCard: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 6, 
    paddingHorizontal: 2, 
    alignItems: "center",
    justifyContent: "center",
    gap: 2, 
    minWidth: 50, 
  },

  statCardInner: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  statLabel: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12, 
    textAlign: "center",
  },

  statValue: {
    color: "white",
    fontWeight: "700",
    fontSize: 16, 
    textAlign: "center",
  },

  bioContainer: {
    marginTop: 16,
    paddingHorizontal: 4,
  },

  bioText: {
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    lineHeight: 20,
  },

  contatosContainer: {
    marginTop: 10,
    paddingHorizontal: 4,
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
    marginTop: 12,
    paddingHorizontal: 4,
  },

  artChip: {
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  artChipText: {
    color: "white",
    fontSize: 12,
    marginVertical: 0,
  },

  actionButton: {
    marginTop: 16,
    marginHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "white",
    paddingVertical: 8,
    alignItems: "center",
  },

  actionButtonText: {
    fontWeight: "600",
    fontSize: 14,
  },
});