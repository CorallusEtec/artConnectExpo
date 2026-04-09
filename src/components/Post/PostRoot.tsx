import { ReactNode } from "react";
import { View } from "react-native";
import { style } from "./style";

type PostRootProps = {
    children?: ReactNode;
}

export function PostRoot({children=<></>}: PostRootProps) {
    return (
        <View style={style.rootContainer}>
            {children}
        </View>
    )

}