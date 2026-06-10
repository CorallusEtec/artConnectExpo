import { View, Image } from "react-native";

export default function MediaPreview({ midia }: any) {
  if (!midia) return null;

  return (
    <View>
      <Image
        source={{ uri: midia.uri }}
        style={{ width: "100%", height: 200 }}
      />
    </View>
  );
}