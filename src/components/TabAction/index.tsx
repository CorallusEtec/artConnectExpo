import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { style } from "./style";

type ActionProps = TouchableOpacityProps & {
  active?: boolean;
  iconSize?: number;
  iconName: keyof typeof FontAwesome.glyphMap;
};

export function TabAction({iconSize = 22, active, ...props }: ActionProps) {
  return (
    <TouchableOpacity {...props}>
      <FontAwesome
        name={props.iconName}
        size={iconSize}
        color={active ? style.active.color : style.normal.color}
      />
    </TouchableOpacity>
  );
}
