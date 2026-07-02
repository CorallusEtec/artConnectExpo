// import { ResizeMode, Video } from "expo-av";
import { TipoMidia } from "@/models/enumeration/enumeration";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { Image, Text, useWindowDimensions, View } from "react-native";
import { style } from "./style";

interface Props {
  midia: any;
  tipoMidia: TipoMidia | undefined;
}

function renderConteudo(
  midia: any,
  tipoMidia: TipoMidia | undefined,
  maxHeight: number,
  player: any,
  isPlaying: boolean,
) {
  switch (tipoMidia) {
    // volta como imagem
    case "IMAGEM": {
      const height = Math.min(midia.height ?? 300, maxHeight);
      return (
        <Image
          source={{ uri: midia.url }}
          style={{ width: "100%", height, borderRadius: 12 }}
          resizeMode="contain"
        />
      );
    }

    // volta como video
    case "VIDEO": {
      return (
        <View style={style.contentContainer}>
          <VideoView
            style={style.video}
            player={player}
            fullscreenOptions={{ enable: true }}
            allowsPictureInPicture
          />
        </View>
      );
    }

    // volta como audio
    case "AUDIO":
      return (
        <View style={style.previewAudio}>
          <Text style={style.previewAudioName} numberOfLines={1}>
            {midia?.name ?? "Áudio selecionado"}
          </Text>
        </View>
      );

    default:
      return null;
  }
}

//limita a altura pra não esconder o botão de publicar
export default function MediaPreview({ midia, tipoMidia }: Props) {
  const { height } = useWindowDimensions();
  const maxHeight = height * 0.4;

  const videoUri = midia?.url ?? "";
  const player = useVideoPlayer(videoUri, (player) => {
    player.loop = true;
    player.play();
  });
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  if (!midia) return null;
  return (
    <View style={style.previewWrapper}>
      {renderConteudo(midia, tipoMidia, maxHeight, player, isPlaying)}
    </View>
  );
}
