import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import { UsuarioResponse } from "@/models/response/UsuarioResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import config from "./config";

export function useUsuarioByIdQuery(id: number) {
  const query = useQuery({
    queryKey: ["profileData"],
    queryFn: () => UsuarioService.findById(id),
  });
  return {
    ...query,
    data: query.data,
  };
}

export class UsuarioService {
  async listar(params?: any) {
    const queryParams = new URLSearchParams();

    if (params?.nome) {
      queryParams.append("nome", params.nome);
    }

    if (params?.tipoConta) {
      queryParams.append("tipoConta", params.tipoConta);
    }

    if (params?.cidade) {
      queryParams.append("cidade", params.cidade);
    }

    if (params?.uf) {
      queryParams.append("uf", params.uf);
    }

    const response = await fetch(
      `${config.apiUrl}/usuario/findAll?${queryParams.toString()}`,
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar usuários");
    }

    return await response.json();
  }
  static async findById(id: number) {
    const reponse = await config.axiosClient.get<UsuarioResponse>(
      `${config.apiUrl}/usuario/${id}`,
    );

    return reponse;
  }

  async findById(id: number, token?: string): Promise<any> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${config.apiUrl}/usuario/${id}`, {
      headers,
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    return await response.json();
  }

  async updateFotoPerfil(file: {
    uri: string;
    name?: string;
    type?: string;
  }): Promise<string> {
    try {
      const tokenData = await AsyncStorage.getItem("@artconnect:token");
      if (!tokenData) {
        throw new Error("Usuário não autenticado");
      }

      const tokenParse: AuthLoginResponse = JSON.parse(tokenData);

      const blobResponse = await fetch(file.uri);
      const blob = await blobResponse.blob();

      const mimeType = file.type || blob.type || "image/jpeg";
      const extensao = mimeType.split("/")[1] ?? "jpg";
      const fileName = file.name || `foto-perfil-${Date.now()}.${extensao}`;

      const formData = new FormData();
      formData.append("file", blob, fileName);

      const response = await fetch(`${config.apiUrl}/usuario/foto-perfil`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${tokenParse.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.message || "Erro ao atualizar foto de perfil";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data.message || "Foto de perfil atualizada com sucesso!";
    } catch (error) {
      console.error("Erro no service de upload:", error);
      throw error;
    }
  }

  /**
   * Busca os dados atualizados do usuário incluindo a nova foto
   */
  async getCurrentUser(): Promise<any> {
    const tokenData = await AsyncStorage.getItem("@artconnect:token");
    if (!tokenData) {
      throw new Error("Usuário não autenticado");
    }

    const tokenParse: AuthLoginResponse = JSON.parse(tokenData);
    return await this.findById(tokenParse.id, tokenParse.token);
  }
}
export default new UsuarioService();
