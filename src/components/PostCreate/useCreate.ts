import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import { PublicacaoService } from "@/services/PublicacaoService";

export function useCreate() {
  const [erro, setErro] = useState("");
  const [legenda, setLegenda] = useState("");
  const [midia, setMidia] = useState<any>(null);
//   const [documents, setDocuments] = useState<any[]>([]);

  async function escolherImagem() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMidia(result.assets[0]);
    }
  }

  async function escolherCamera() {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMidia(result.assets[0]);
    }
  }

//   um teste apenas, vai mudar
//   async function escolherDocumento() {
//     const result = await DocumentPicker.getDocumentAsync({
//       multiple: true,
//       type: "*/*",
//     });

//     if (!result.canceled) {
//       const assets = result.assets;

//       setDocuments((prev) => [...prev, ...assets]);
//     }
//   }

  async function handlePublicar() {
    const token = await AsyncStorage.getItem("@artconnect:token");

    if (!token) {
      router.navigate("/login");
      return;
    }

    const tokenParse: AuthLoginResponse = JSON.parse(token);

    const res = {
      legenda,
      file: midia,
      autorId: tokenParse.id,
    };

    const validacao = PublicacaoService.validarCriacao(res);

    if (!validacao.valido) {
      setErro(validacao.mensagem);
      return;
    }

    await PublicacaoService.save(res);
    router.navigate("/home");
  }

  return {
    erro,
    legenda,
    setLegenda,
    midia,
    // documents,

    escolherImagem,
    escolherCamera,
    // escolherDocumento,
    handlePublicar,
  };
}