import { Image, ImageProps } from "react-native";
import { style } from "./style";

type PostImageProps = ImageProps & {
    url?: string,
}

export function PostImage({url="", ...props}: PostImageProps) {
    return (
        <Image style={style.img} {...props} source={{uri: url}} />
    )
}