import { View } from "react-native";
import { style } from "./style";
import { ReactNode } from "react";

export type CommentActionsProps = {
    children: ReactNode
}

export function CommentActions({ children=<></>, ...props}: CommentActionsProps) {
    {/* ACTIONS DO HEADER*/}
    return (
        <View style={style.headerActionsContainer}>
            {children}
        </View>
    )
}