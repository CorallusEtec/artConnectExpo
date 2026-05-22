import { ReactNode } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { style } from "./style";

type ReacaoProps = TouchableOpacityProps & {
  insight: number;
  children?: ReactNode;
};

export function Reacao({
  insight = 0,
  children = <></>,
  ...props
}: ReacaoProps) {
  function labelInsight(valor: number): string {
    if (valor < 1000) {
      return `${valor}`;
    } else if (valor < 1000000) {
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
