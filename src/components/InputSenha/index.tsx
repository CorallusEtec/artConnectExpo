import { gStyles } from "@/style/gStyle";
import { Feather } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { Pressable, StyleProp, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { style } from "./style";

type InputSenhaProps = TextInputProps & {
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export function InputSenha({ children = <></>, ...props }: InputSenhaProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  return (
    <View style={[style.container, props.containerStyle]}>
      {children}
      <TextInput
        secureTextEntry={!mostrarSenha}
        {...props}
        style={[style.input, props.style]}
        placeholderTextColor={gStyles.cinza[500]}
      />
      <Pressable onPress={() => setMostrarSenha(!mostrarSenha)}>
        <Feather
          name={mostrarSenha ? "eye" : "eye-off"}
          size={22}
          color={gStyles.azul[200]}
        />
      </Pressable>
    </View>
  );
}
