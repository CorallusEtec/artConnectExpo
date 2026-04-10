import { gStyles } from "@/style/gStyle";
import { Feather } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { Pressable, TextInput, TextInputProps, View } from "react-native";
import { style } from "./style";

type InputSenhaProps = TextInputProps & {
  children?: ReactNode;
};

export function InputSenha({ children = <></>, ...props }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  return (
    <View style={style.container}>
      {children}
      <TextInput
        secureTextEntry={!mostrarSenha}
        {...props}
        style={style.input}
        placeholderTextColor={gStyles.cinza[500]}
      />
      <Pressable onPress={() => setMostrarSenha(!mostrarSenha)}>
        <Feather
          name={mostrarSenha ? "eye" : "eye-off"}
          size={22}
          color={gStyles.azul[500]}
        />
      </Pressable>
    </View>
  );
}
