import { PublicacaoService } from "@/services/PublicacaoService";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { TipoMidia } from "./types";

export function useCreate() {
  const [erro, setErro] = useState("");
  const [legenda, setLegenda] = useState("");
  const [midia, setMidia] = useState<any>(null);
  const [tipoMidia, setTipoMidia] = useState<TipoMidia | null>(null);

  async function escolherImagem() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMidia(result.assets[0]);
      setTipoMidia(result.assets[0].type === "video" ? TipoMidia.VIDEO : TipoMidia.IMAGE);
    }
  }

  async function escolherCamera() {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMidia(result.assets[0]);
      setTipoMidia(result.assets[0].type === "video" ? TipoMidia.VIDEO : TipoMidia.IMAGE);
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
      await PublicacaoService.save(res);
      router.navigate("/home");
    } catch (e: any) {
      setErro(e?.message ?? "Erro ao publicar");
    }
  }

  return {
    erro,
    legenda,
    setLegenda,
    midia,
    tipoMidia,
    escolherImagem,
    escolherCamera,
    handlePublicar,
  };
}