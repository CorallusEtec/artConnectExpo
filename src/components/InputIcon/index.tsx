import { gStyles } from "@/style/gStyle";
import { ReactNode } from "react";
import { StyleProp, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { style } from "./style";

type InputIconProps = TextInputProps & {
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>
};

export function InputIcon({ children = <></>, ...props }: InputIconProps) {
  return (
    <View style={[style.container, props.containerStyle]}>
      {children}
      <TextInput
        {...props}
        style={[style.input, props.style]}
        placeholderTextColor={gStyles.cinza[500]}
      />
    </View>
  );
}
