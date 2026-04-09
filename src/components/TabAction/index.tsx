import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { style } from "./style";

type ActionProps = TouchableOpacityProps & {
  active?: boolean;
  iconName: keyof typeof FontAwesome.glyphMap;
};

export function TabAction({ active, ...props }: ActionProps) {
  return (
    <TouchableOpacity {...props}>
      <FontAwesome
        name={props.iconName}
        size={22}
        color={active ? style.active.color : style.normal.color}
      />
    </TouchableOpacity>
  );
}
