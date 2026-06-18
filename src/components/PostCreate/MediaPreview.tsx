// import { ResizeMode, Video } from "expo-av";
import {useVideoPlayer, VideoView} from "expo-video";
import { Button, Image, Text, View, useWindowDimensions } from "react-native";
import { style } from './style';
import { TipoMidia } from "./types";
import { useEvent } from "expo";

interface Props {
  midia: any;
  tipoMidia: TipoMidia | null;
}

function renderConteudo(midia: any, tipoMidia: TipoMidia | null, maxHeight: number, player: any, isPlaying: boolean) {
  switch (tipoMidia) {
    // volta como imagem
    case TipoMidia.IMAGE: {
      const height = Math.min(midia.height ?? 300, maxHeight);
      return (
        <Image
          source={{ uri: midia.uri }}
          style={{ width: "100%", height, borderRadius: 12 }}
          resizeMode="contain"
        />
      );
    }

    // volta como video
    case TipoMidia.VIDEO: {
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
    case TipoMidia.AUDIO:
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

    const videoUri = midia?.uri ?? "";

    const player = useVideoPlayer(videoUri, player => {
      player.loop = true;
      player.play();
    })
    const {isPlaying} = useEvent(player, 'playingChange', { isPlaying: player.playing});

    if (!midia) return null;
    return (
      <View style={style.previewWrapper}>
        {renderConteudo(midia, tipoMidia, maxHeight, player, isPlaying)}
      </View>
    );
  }