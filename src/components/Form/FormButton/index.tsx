import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Button, ButtonProps } from "react-native-paper";
import { style } from "./style";

type TextButtonProps = Omit<ButtonProps, "children"> & {
  title?: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

export function FormButton({
  title = "",
  textStyle,
  style: buttonStyle,
  ...props
}: TextButtonProps) {
  return (
    <Button
      style={buttonStyle}
      contentStyle={style.content}
      labelStyle={[style.label, textStyle]}
      {...props}
    >
      {title}
    </Button>
  );
}