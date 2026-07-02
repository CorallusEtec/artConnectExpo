import { StyleSheet } from "react-native";
const ICON_SIZE = 120;
export const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    resizeMode: "contain",
  },
  body: {
    padding: 10,
    alignItems: "center",
  },
  misc: { paddingHorizontal: 20, gap: 10 },
  card: {
    borderRadius: 12,
    flexDirection: "row",
    width: "100%",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
