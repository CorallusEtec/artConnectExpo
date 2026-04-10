import { Image, ImageProps, View } from "react-native";

type PostImageProps = ImageProps & {
  url: string;
};

export function PostImage({ url = "", ...props }: PostImageProps) {
  return (
    <View>
      <Image {...props} />
    </View>
  );
}
