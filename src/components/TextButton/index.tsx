import { StyleProp, TextStyle } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

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
  return (
    <Button
      mode={variant === "primary" ? "contained" : "outlined"}
      buttonColor={
        variant === "primary" ? (buttonColor ?? "#2563eb") : undefined
      }
      textColor={variant === "secondary" ? "#2563eb" : "#fff"}
      rippleColor={variant === "secondary" ? "#2563eb20" : undefined}
      contentStyle={{ paddingVertical: 4 }}
      labelStyle={[{ fontWeight: "600", fontSize: 15 }, textStyle]}
      {...props}
    >
      {title}
    </Button>
  );
}
