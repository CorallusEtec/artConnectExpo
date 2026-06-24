import { StyleProp, TextStyle } from "react-native";
import { Button, ButtonProps, useTheme } from "react-native-paper";

type TextButtonProps = Omit<ButtonProps, "theme" | "children"> & {
  title?: string;
  variant?: "primary" | "secondary";
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
};

export function TextButton({
  variant = "primary",
  title = "",
  textStyle,
  buttonColor,
  ...props
}: TextButtonProps) {
  const theme = useTheme();

  return (
    <Button
      mode={variant === "primary" ? "contained" : "outlined"}
      buttonColor={
        variant === "primary" ? (buttonColor ?? theme.colors.primary) : undefined
      }
      textColor={variant === "secondary" ? theme.colors.primary : "#fff"}
      rippleColor={variant === "secondary" ? theme.colors.primaryContainer : undefined}
      contentStyle={{ paddingVertical: 4 }}
      labelStyle={[{ fontWeight: "600", fontSize: 15 }, textStyle]}
      {...props}
    >
      {title}
    </Button>
  );
}