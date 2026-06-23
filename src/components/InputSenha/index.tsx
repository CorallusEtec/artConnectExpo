import { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { TextInput, TextInputProps, useTheme } from "react-native-paper";

type PaperInputSenhaProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
};

export function InputSenha({ ...props }: PaperInputSenhaProps) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const theme = useTheme();

  return (
    <TextInput
      mode="outlined"
      secureTextEntry={!senhaVisivel}
      left={<TextInput.Icon icon="lock-outline" color={theme.colors.primary} />}
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