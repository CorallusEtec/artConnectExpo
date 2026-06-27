import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts";
import usuarioService from "@/services/UsuarioService";

export function useFotoPerfil(fotoInicial: string | null) {
  const [fotoUri, setFotoUri] = useState<string | null>(fotoInicial);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getValidateId } = useAuth();
  const queryClient = useQueryClient();

  async function solicitarPermissaoGaleria(): Promise<boolean> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setError("Precisamos de acesso à sua galeria para alterar a foto de perfil.");
      return false;
    }
    return true;
  }

  async function selecionarImagemGaleria() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });

    if (resultado.canceled) return null;
    return resultado.assets[0];
  }

  async function handleAlterarFoto() {
    const temPermissao = await solicitarPermissaoGaleria();
    if (!temPermissao) return;

    const imagemSelecionada = await selecionarImagemGaleria();
    if (!imagemSelecionada) return;

    try {
      setUploading(true);
      setError(null);

      const arquivo = {
        uri: imagemSelecionada.uri,
        name: imagemSelecionada.fileName || `foto-perfil-${Date.now()}.jpg`,
        type: imagemSelecionada.mimeType || "image/jpeg",
      };
      

      await usuarioService.updateFotoPerfil(arquivo);

      await queryClient.invalidateQueries({
        queryKey: [getValidateId(), "profileData"],
      });

      setFotoUri(imagemSelecionada.uri);
    } catch (err: any) {
      setError(err.message || "Não foi possível atualizar a foto de perfil");
    } finally {
      setUploading(false);
    }
  }

  return {
    fotoUri,
    uploading,
    error,
    handleAlterarFoto,
  };
}