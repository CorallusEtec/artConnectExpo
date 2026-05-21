import { ReactNode } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { style } from "./style";

type PostActionProps = TouchableOpacityProps & {
  insight: number;
  children?: ReactNode;
};

export function Action({
  insight = 1,
  children = <></>,
  ...props
}: PostActionProps) {
  function labelInsight(valor: number): string {
    if(valor < 1000) {
      return `${valor}`;
    } else if(valor < 1000000) {
      return `${(valor / 1000).toFixed(1)} mil`;
    } else {
      return `${valor}`;
    }
  }


  return (
    <View style={style.postActionContainer}>
      <TouchableOpacity {...props}>{children}</TouchableOpacity>
      <Text style={style.actionInsight}>{labelInsight(insight)}</Text>
    </View>
  );
}
