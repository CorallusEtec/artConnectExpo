import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper/lib/typescript/types";

export const style = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.roundness,
    },

    text: {
      color: theme.colors.onPrimary,
    },
  });
