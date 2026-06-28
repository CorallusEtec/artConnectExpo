import { StyleSheet } from "react-native";
const ICON_SIZE = 120;
export const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    resizeMode: "contain",
  },
  body: {
    padding: 10,
  },
  misc: {
    alignItems: "center",
  },
});
