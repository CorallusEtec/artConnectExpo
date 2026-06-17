import { StyleProp, TextStyle } from "react-native";
import { Button, ButtonProps } from "react-native-paper";
import { style } from "./style";

type TextButtonProps = Omit<ButtonProps, "children"> & {
  title?: string;
  textStyle?: StyleProp<TextStyle>;
};

export function FormButton({
  title = "",
  textStyle,
  buttonColor,
  ...props
}: TextButtonProps) {
  return (
    <Button
      contentStyle={style.content}
      labelStyle={[style.label, textStyle]}
      {...props}
    >
      {title}
    </Button>
  );
}
