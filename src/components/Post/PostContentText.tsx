import { Text, View } from "react-native";
import { style } from "./style";

type PostContentTextProps = {
  data: string;
};
export function PostContentText({ ...props }: PostContentTextProps) {
  return (
    <View style={style.contentTextContainer}>
      <Text style={style.contentTextText}>{props.data}</Text>
    </View>
  );
}
