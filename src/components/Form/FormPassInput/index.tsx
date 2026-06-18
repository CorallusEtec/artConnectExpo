import { gStyles } from "@/style/gStyle";
import { useState } from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import { style } from "./style";

type PaperInputSenhaProps = TextInputProps & {};

export function FormPassInput({
  mode = "outlined",
  ...props
}: PaperInputSenhaProps) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  return (
    <TextInput
      mode={mode}
      secureTextEntry={!senhaVisivel}
      left={<TextInput.Icon icon="lock-outline" color={gStyles.azul[500]} />}
      right={
        <TextInput.Icon
          icon={senhaVisivel ? "eye-off-outline" : "eye-outline"}
          onPress={() => setSenhaVisivel(!senhaVisivel)}
          color="#9ca3af"
        />
      }
      style={style.input}
      {...props}
    />
  );
}
