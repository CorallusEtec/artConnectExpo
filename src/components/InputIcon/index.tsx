import { StyleProp, ViewStyle } from "react-native";
import { TextInput, TextInputProps, useTheme } from "react-native-paper";

type PaperInputProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  icon?: string;
};

export function InputIcon({ icon, ...props }: PaperInputProps) {
  const theme = useTheme();

  return (
    <TextInput
      mode="outlined"
      left={
        icon ? (
          <TextInput.Icon icon={icon} color={theme.colors.primary} />
        ) : undefined
      }
      style={{ fontSize: 16, backgroundColor: "#ffffff" }}
      {...props}
    />
  );
}