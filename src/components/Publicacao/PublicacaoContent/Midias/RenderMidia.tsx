import { Platform, View, Image, useWindowDimensions } from "react-native";
import { Divider } from "react-native-paper";
import { VideoView, useVideoPlayer } from "expo-video";
import { AudioPlayer } from "./AudioPlayer";

type Props = {
  urlMidia: string;
  tipoMidia: string | null;
};

export function RenderMidia({ urlMidia, tipoMidia }: Props) {
  const { height } = useWindowDimensions();
  const maxHeight = height * 0.5;

  const player = useVideoPlayer(tipoMidia === "VIDEO" ? urlMidia : null, (p) => {
    p.loop = false;
  });

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
              style={{
                width: "100%",
                maxHeight: 400,
                objectFit: "contain",
                backgroundColor: "#000",
              }}
            />
            <Divider />
          </>
        );
      }
      return (
        <>
          <VideoView
            player={player}
            style={{ width: "100%", height: 250, backgroundColor: "#000" }}
            allowsFullscreen
            nativeControls
          />
          <Divider />
        </>
      );

    case "AUDIO":
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