import { ResizeMode, Video } from "expo-av";
import { Platform, View, Image, useWindowDimensions } from "react-native";
import { Card, Divider } from "react-native-paper";
import { style } from "../style";
import { AudioPlayer } from "./AudioPlayer";
import { maxSize } from "zod";

export function renderMidia(urlMidia: string, tipoMidia: string | null) {
    const { height } = useWindowDimensions();
    const maxHeight = height * 0.5;
  switch (tipoMidia) {
    case "IMAGEM":
      return (
        <>
          <Image
            source={{ uri: urlMidia }}
            style={{ width: "100%", height: maxHeight }}
            resizeMode="contain"
          />
          <Divider />
        </>
      );

    case "VIDEO":
      if (Platform.OS === "web") {
        return (
          <>
            <video
              src={urlMidia}
              controls
              style={{ width: "100%", maxHeight: 400, objectFit: "contain", backgroundColor: "#000" }}
            />
            <Divider />
          </>
        );
      }
      return (
        <>
          <Video
            source={{ uri: urlMidia }}
            style={{ width: "100%", height: 250, backgroundColor: "#000" }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
          <Divider />
        </>
      );

    case "AUDIO":
    if (Platform.OS === "web") {
      return (
        <>
          <View style={style.audioCard}>
            <audio src={urlMidia} controls style={{ width: "100%" }} />
          </View>
          <Divider />
        </>
      );
    }
    
    return (
      <>
        <AudioPlayer uri={urlMidia} />
        <Divider />
      </>
    );
    

    default:
      return null;
  }
}