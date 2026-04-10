import { ReactNode } from "react";
import { View } from "react-native";
import { style } from "./style";

type PostHeaderActionsProps = {
  children?: ReactNode;
};

export function PostHeaderActions({
  children = <></>,
  ...props
}: PostHeaderActionsProps) {
  return <View style={style.headerActionsContainer}>{children}</View>;
}
