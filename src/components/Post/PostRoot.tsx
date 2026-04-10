import { ReactNode } from "react";
import { View } from "react-native";

type PostRootProps = {
  children?: ReactNode;
};

export function PostRoot({ children = <></> }: PostRootProps) {
  return <View>{children}</View>;
}
