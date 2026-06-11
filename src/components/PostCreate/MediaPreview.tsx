import { ResizeMode, Video } from "expo-av";
import { Image, Platform, Text, View, useWindowDimensions } from "react-native";
import { style } from './style';
import { TipoMidia } from "./types";

interface Props {
  midia: any;
  tipoMidia: TipoMidia | null;
}

function renderConteudo(midia: any, tipoMidia: TipoMidia | null, maxHeight: number) {
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
      /**  é pra mostrar direitinho na web, pq na web a forma de mostrar é diferente, 
      e se não fizer isso fica todo quebrado todo ruim, só pra esclarecer 
      */
      if (Platform.OS === "web") {
        return (
          <video
            src={midia.uri}
            controls
            style={{ width: "100%", maxHeight, objectFit: "contain", backgroundColor: "#000", borderRadius: 12 }}
          />
        );
      }
      return (
        <Video
          source={{ uri: midia.uri }}
          style={{ width: "100%", height: 200, backgroundColor: "#000" }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />
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

    if (!midia) return null;
    return (
      <View style={style.previewWrapper}>
        {renderConteudo(midia, tipoMidia, maxHeight)}
      </View>
    );
  }