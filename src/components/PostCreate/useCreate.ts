import { PublicacaoService } from "@/services/PublicacaoService";
import * as DocumentPicker from "expo-document-picker";
import {} from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { TipoMidia } from "./types";

export function useCreate() {
  const [erro, setErro] = useState("");
  const [legenda, setLegenda] = useState("");
  const [midia, setMidia] = useState<any>(null);
  const [tipoMidia, setTipoMidia] = useState<TipoMidia | null>(null);
  const [nomeAudio, setNomeAudio] = useState<string | null>(null);

  // aqui escolhe a imagem/video da galeria e define o tipo já
  async function escolherGaleria(onChangeForm: (val: any) => void) {
    const result = await ImagePicker.launchImageLibraryAsync({
      //mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ["images", "livePhotos", "videos"],
      allowsEditing: true,
      quality: 0.6,
    });

    if (!result.canceled) {
      onChangeForm({
        tipo:
          result.assets[0].type === "video" ? TipoMidia.VIDEO : TipoMidia.IMAGE,
        url: result.assets[0].uri,
        mimeType: result.assets[0].mimeType,
        name:
          result.assets[0].fileName ||
          `upload-${Date.now()}.${result.assets[0].uri.split(".").pop() || "bin"}`,
      });

      //Dead Code
      setMidia(result.assets[0]);
      setTipoMidia(
        result.assets[0].type === "video" ? TipoMidia.VIDEO : TipoMidia.IMAGE,
      );
    }
  }

  // aqui abre a camera
  async function escolherCamera(onChangeForm: (val: any) => void) {
    const result = await ImagePicker.launchCameraAsync({
      //mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ["images", "livePhotos", "videos"],
      allowsEditing: true,
      quality: 0.6,
    });

    if (!result.canceled) {
      onChangeForm({
        tipo:
          result.assets[0].type === "video" ? TipoMidia.VIDEO : TipoMidia.IMAGE,
        url: decodeURIComponent(result.assets[0].uri),
        mimeType: result.assets[0].mimeType,
        name:
          result.assets[0].fileName ||
          `upload-${Date.now()}.${result.assets[0].uri.split(".").pop() || "bin"}`,
      });
      // Dead Code
      setMidia(result.assets[0]);
      setTipoMidia(
        result.assets[0].type === "video" ? TipoMidia.VIDEO : TipoMidia.IMAGE,
      );
    }
  }

  async function handlePublicar() {
    const res = {
      legenda,
      file: midia,
      tipoMidia,
    };

    const validacao = PublicacaoService.validarCriacao(res);

    if (!validacao.valido) {
      setErro(validacao.mensagem);
      return;
    }
    try {
      const response = await PublicacaoService.save(res);
      router.navigate("/home");
    } catch (e: any) {
      setErro(e?.message ?? "Erro ao publicar");
    }
  }

  async function escolherAudio(onChangeForm: (val: any) => void) {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      const nomeArquivo = result.assets[0].name || `audio-${Date.now()}.mp3`;
      onChangeForm({
        tipo: TipoMidia.AUDIO,
        url: result.assets[0].uri,
        mimeType: result.assets[0].mimeType || "audio/mpeg",
        name: nomeArquivo,
      });

      //Dead Code
      setMidia(result.assets[0]);
      setNomeAudio(result.assets[0].name);
      setTipoMidia(TipoMidia.AUDIO);
    }
  }

  return {
    erro,
    legenda,
    setLegenda,
    midia,
    tipoMidia,
    escolherGaleria,
    escolherCamera,
    handlePublicar,
    nomeAudio,
    escolherAudio,
  };
}
