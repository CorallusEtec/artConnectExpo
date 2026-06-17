import { gStyles } from "@/style/gStyle";
import { style } from "./edit";
import { Text, TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & {
  label: string;
  multiline?: boolean;
};

export function FormField({ label, multiline, style: inputStyle, ...rest }: Props) {
  return (
    <>
      <Text style={style.label}>{label}</Text>
      <TextInput
        style={multiline ? [style.input, style.textarea] : style.input}
        placeholderTextColor={gStyles.cinza[500]}
        {...rest}
      />
    </>
  );
}