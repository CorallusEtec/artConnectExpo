import { ReactNode, useContext } from "react";
import { View } from "react-native";
import { style } from "./style";
import { PostProvider } from "./PostContext/PostProvider";
import { PublicacaoResponse } from "@/models/response/PublicacaoResponse";
import { PostContext } from "./PostContext/PostContext";

type PostRootProps = {
  children?: ReactNode;
};

export function PostRoot({ children = <></>, ...props}: PostRootProps) {
  return (
    <View style={style.root}>
      {children}
    </View>
  )
  
}
