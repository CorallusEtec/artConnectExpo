import { gStyles } from "@/style/gStyle";
import { StyleProp, ViewStyle } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

type PaperInputProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  icon?: string;
};

export function InputIcon({ icon, ...props }: PaperInputProps) {
  return (
    <TextInput
      mode="outlined"
      left={
        icon ? (
          <TextInput.Icon icon={icon} color={gStyles.azul[500]} />
        ) : undefined
      }
      style={{ fontSize: 16, backgroundColor: "#ffffff" }}
      {...props}
    />
  );
}
