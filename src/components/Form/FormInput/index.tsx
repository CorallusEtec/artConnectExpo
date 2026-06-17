import { gStyles } from "@/style/gStyle";
import { TextInput, TextInputProps } from "react-native-paper";
import { style } from "./style";

type PaperInputProps = TextInputProps & {
  icon?: string;
};

export function FormInput({ icon, ...props }: PaperInputProps) {
  return (
    <TextInput
      mode="outlined"
      left={
        icon ? (
          <TextInput.Icon icon={icon} color={gStyles.azul[500]} />
        ) : undefined
      }
      style={style.input}
      {...props}
    />
  );
}
