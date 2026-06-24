import { TextInput, TextInputProps, useTheme } from "react-native-paper";
import { style } from "./style";

type PaperInputProps = TextInputProps & {
  icon?: string;
};

export function FormInput({
  mode = "outlined",
  icon,
  ...props
}: PaperInputProps) {
  const theme = useTheme();

  return (
    <TextInput
      mode={mode}
      left={
        icon ? (
          <TextInput.Icon icon={icon} color={theme.colors.primary} />
        ) : undefined
      }
      style={[style.input, props.style]}
      {...props}
    />
  );
}