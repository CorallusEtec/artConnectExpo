import { ComentarioResponse } from "@/models/response/ComentarioResponse";
import { ReactNode } from "react";
import { View } from "react-native";
import { ComentarioProvider } from "./CommentContext";

export type CommentRootProps = {
  children: ReactNode;
  comentario: ComentarioResponse;
};

export function CommentRoot({ children = <></>, ...props }: CommentRootProps) {
  return (
    <ComentarioProvider value={props.comentario}>
      <View>{children}</View>
    </ComentarioProvider>
  );
}
