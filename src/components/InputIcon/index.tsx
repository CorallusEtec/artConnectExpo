import { gStyles } from "@/style/gStyle";
import { ReactNode } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { style } from "./style";

type InputIconProps = TextInputProps & {
  children?: ReactNode;
};

export function InputIcon({ children = <></>, ...props }: InputIconProps) {
  return (
    <View style={style.container}>
      {children}
      <TextInput
        {...props}
        style={style.input}
        placeholderTextColor={gStyles.cinza[500]}
      />
    </View>
  );
}
