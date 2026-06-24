import { StyleSheet } from "react-native";
export const style = StyleSheet.create({
  card: {
    backgroundColor: "#ebebeb",
    borderRadius: 16,
    marginBottom: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    marginRight: 16,
    backgroundColor: "#ccc",
  },
  infoContainer: {
    flex: 1,
    gap: 2,
  },
  nome: {
    fontWeight: "bold",
    color: "#333",
  },
  sub: {
    color: "#444",
  },
  tag: {
    color: "#0B31A3",
    fontWeight: "bold",
    marginTop: 4,
  },
  badge: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  artInfoContainer: {
    flexDirection: "row",
    gap: 6,
  },

  artChip: {
    backgroundColor: "#d0d0d0",
    justifyContent: "center",
    alignItems: "center",
  },

  artChipText: {
    color: "black",
    fontSize: 11,
  },
});
