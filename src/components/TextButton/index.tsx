import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { style } from "./style";

type TextButtonProps = TouchableOpacityProps & {
  title?: string;
  theme?: "primary" | "secondary";
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
        theme == "primary" ? style.containerPrimary : style.containerSecondary
      }
    >
      <Text
        style={theme == "primary" ? style.textPrimary : style.textSecondary}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}