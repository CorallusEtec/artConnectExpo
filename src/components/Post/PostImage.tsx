import { Image, ImageProps, ImageSourcePropType } from "react-native";
import { style } from "./style";

type PostImageProps = ImageProps & {
  url?: ImageSourcePropType | string;
};

export function PostImage({
  url = "" as ImageSourcePropType,
  ...props
}: PostImageProps) {
  return (
    <Image
      style={style.img}
      {...props}
      source={typeof url == "string" ? { uri: url } : url}
    />
  );
}
