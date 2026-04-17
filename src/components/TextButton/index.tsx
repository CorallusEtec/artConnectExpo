import { StyleProp, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { style } from "./style";

type TextButtonProps = TouchableOpacityProps & {
  title?: string;
  theme?: "primary" | "secondary";
  textStyle?: StyleProp<TextStyle>
};

export function TextButton({
  theme = "primary",
  title = "",
  ...props
}: TextButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      style={
        theme == "primary" ? [style.containerPrimary, props.style] : [style.containerSecondary, props.style]
      }
    >
      <Text
        style={theme == "primary" ? [style.textPrimary, props.textStyle] : [style.textSecondary, props.textStyle]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}