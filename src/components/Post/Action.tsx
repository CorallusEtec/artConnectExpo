import { ReactNode } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { style } from "./style";

type PostActionProps = TouchableOpacityProps & {
  insight?: number;
  children?: ReactNode;
};

export function Action({
  insight = 1,
  children = <></>,
  ...props
}: PostActionProps) {
  return (
    <View style={style.postActionContainer}>
      <TouchableOpacity {...props}>{children}</TouchableOpacity>
      <Text>{insight}</Text>
    </View>
  );
}
