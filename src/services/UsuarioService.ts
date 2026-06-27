import { useAuth } from "@/contexts";
import { SearchFiltroParams } from "@/models/request/pageable/SearchFiltroParams";
import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import { PagedResponse } from "@/models/response/PagedResponse";
import { UsuarioResponse } from "@/models/response/UsuarioResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import config from "./config";
import { getExtensaoPorMimeType } from "@/utils/Extensoes";

export function useUsuarioByIdQuery(usuarioId: number) {
  const query = useQuery({
    queryKey: [usuarioId, "profileData"],
    queryFn: () => UsuarioService.findById(usuarioId),
  });
  return {
    ...query,
    data: query.data,
  };
}

export function useUsuarioFiltroQuery(params?: SearchFiltroParams) {
  const query = useQuery({
    queryKey: ["usuarioFiltro", params],
    queryFn: () => UsuarioService.listarFiltro(params),
  });
  return {
    ...query,
    data: query.data,
  };
}

export function useUpdateFotoPerfilMutation() {
  const queryClient = useQueryClient();
  const { getValidateId } = useAuth();
  return useMutation({
    mutationFn: (file: { uri: string; name?: string; type?: string }) =>
      usuarioService.updateFotoPerfil(file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getValidateId(), "profileData"],
      });
    },
  });
}

export class UsuarioService {
  static async listarFiltro(params?: SearchFiltroParams) {
    const response = await config.axiosClient.get<
      PagedResponse<UsuarioResponse>
    >(`${config.apiUrl}/usuario/findAll`, {
      params: params,
    });
    return response;
  }

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
    const tokenData = await AsyncStorage.getItem("@artconnect:token");
      if (!tokenData) throw new Error("Usuário não autenticado");
  
      const tokenParse: AuthLoginResponse = JSON.parse(tokenData);
  
      const mimeType = file.type ?? "image/jpeg";
      const extension = getExtensaoPorMimeType(mimeType) ?? file.uri.split(".").pop() ?? "jpg";
      const fileName = file.name ?? `foto-perfil-${Date.now()}.${extension}`;
  
      const formData = new FormData();
      const isWeb = file.uri.startsWith("blob:") || file.uri.startsWith("http");
  
      if (isWeb) {
        const blob = await fetch(file.uri).then((r) => r.blob());
        formData.append("file", new File([blob], fileName, { type: mimeType }));
      } else {
        formData.append("file", { uri: file.uri, name: fileName, type: mimeType } as any);
      }
  
      const response = await fetch(`${config.apiUrl}/usuario/foto-perfil`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${tokenParse.token}` },
        body: formData,
      });
  
      if (!response.ok) throw new Error(`Erro ao atualizar foto: ${response.status}`);
      return "Foto de perfil atualizada com sucesso!";
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

  static async listarArtistasFiltro(params?: SearchFiltroParams) {
    const response = await config.axiosClient.get<
      PagedResponse<UsuarioResponse>
    >(`${config.apiUrl}/artista/findAll`, { params: params });
    return response;
  }
}

export function useArtistaFiltroSearchQuery(params?: SearchFiltroParams) {
  const query = useQuery({
    queryKey: ["artistaFiltroSearch", params],
    queryFn: () => UsuarioService.listarArtistasFiltro(params),
  });
  return { ...query, data: query.data };
}

const usuarioService = new UsuarioService();
export default usuarioService;