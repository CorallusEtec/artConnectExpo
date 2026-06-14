import { gStyles } from "@/style/gStyle";
import { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

type PaperInputSenhaProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
};

export function InputSenha({ ...props }: PaperInputSenhaProps) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  return (
    <TextInput
      mode="outlined"
      secureTextEntry={!senhaVisivel}
      left={<TextInput.Icon icon="lock-outline" color={gStyles.azul[500]} />}
      right={
        <TextInput.Icon
          icon={senhaVisivel ? "eye-off-outline" : "eye-outline"}
          onPress={() => setSenhaVisivel(!senhaVisivel)}
          color="#9ca3af"
        />
      }
      style={{ fontSize: 16, backgroundColor: "#ffffff" }}
      outlineStyle={{ borderRadius: 8 }}
      {...props}
    />
  );
}
