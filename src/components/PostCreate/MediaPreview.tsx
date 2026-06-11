import { ResizeMode, Video } from "expo-av";
import { Image, Text, View } from "react-native";
import { TipoMidia } from "./types";

interface Props {
  midia: any;
  tipoMidia: TipoMidia | null;
}

function renderConteudo(midia: any, tipoMidia: TipoMidia | null) {
  switch (tipoMidia) {
    case TipoMidia.IMAGE:
      return (
        <Image
          source={{ uri: midia.uri }}
          style={{ width: "100%", height: 200, borderRadius: 10 }}
          resizeMode="cover"
        />
      );
    case TipoMidia.VIDEO:
      return (
        <Video
          source={{ uri: midia.uri }}
          style={{ width: "100%", height: 200, borderRadius: 10 }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />
      );
    case TipoMidia.AUDIO:
      return <Text>🎵 Áudio selecionado</Text>;
    default:
      return null;
  }
}

export default function MediaPreview({ midia, tipoMidia }: Props) {
  if (!midia) return null;
  return <View>{renderConteudo(midia, tipoMidia)}</View>;
}