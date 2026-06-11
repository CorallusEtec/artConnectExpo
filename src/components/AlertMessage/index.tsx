import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { Snackbar, useTheme } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { style } from "./style";

export type AlertMessageProps = {
  text?: string;
  visible: boolean;
  onDismiss: () => void;
  children?: ReactNode;
  icon?: IconSource;
};

export function AlertMessage({
  text = "",
  children = <></>,
  ...props
}: AlertMessageProps) {
  const theme = useTheme();
  return (
    <Snackbar
      style={{ backgroundColor: theme.colors.error }}
      visible={props.visible}
      onDismiss={props.onDismiss}
    >
      <View style={style.alertContent}>
        <Text style={style.alertText}>{text}</Text>
        <MaterialCommunityIcons
          name="alert-circle"
          color={style.alertText.color}
          size={22}
        />
      </View>
    </Snackbar>
  );
}
