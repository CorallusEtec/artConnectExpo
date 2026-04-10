import { gStyles } from "@/style/gStyle";
import { FontAwesome } from "@expo/vector-icons";
import { ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import { style } from "./style";

type PostActionsProps = {
  children?: ReactNode;
  onSave?: () => void;
};

export function PostActions({ children = <></>, ...props }: PostActionsProps) {
  return (
    <View style={style.actionsRoot}>
      <View style={style.actionsGroup}>{children}</View>
      <TouchableOpacity onPress={props.onSave}>
        <FontAwesome name="bookmark-o" color={gStyles.cinza[600]} size={22} />
      </TouchableOpacity>
    </View>
  );
}
