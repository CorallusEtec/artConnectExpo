import { ReactNode } from "react";
import { View, ViewProps } from "react-native";
import { style } from "./style";

type TabsProps = ViewProps & {
  children?: ReactNode;
};

export function Tabs({ children = <></>, ...props }: TabsProps) {
  return (
    <View {...props} style={[style.container, props.style]}>
      {children}
    </View>
  );
}
