import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const style = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: theme.roundness,
      backgroundColor: theme.colors.surface,
      margin: 10,
    },
    titleContainer: {
      alignItems: "center",
    },
    title: {},
    subtitle: {
      textAlign: "center",
    },
    frame: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme.colors.backdrop,
    },
  });
