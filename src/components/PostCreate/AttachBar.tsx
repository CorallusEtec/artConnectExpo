import { View, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function AttachBar({ onImage, onCamera, onFile }: any) {
  return (
    <View style={{ flexDirection: "row", gap: 15 }}>
      <Pressable onPress={onImage}>
        <FontAwesome name="file-image-o" size={20} color="gray" />
      </Pressable>

      <Pressable onPress={onFile}>
        <FontAwesome name="file-audio-o" size={20} color="gray" />
      </Pressable>

      <Pressable onPress={onCamera}>
        <FontAwesome name="camera" size={20} color="gray" />
      </Pressable>
    </View>
  );
}